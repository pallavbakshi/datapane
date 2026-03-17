"""DataFrame diff — compare two DataFrames and render highlighted changes."""
from __future__ import annotations

import pandas as pd
import numpy as np

from .base import BlockId


def Diff(
    df_old: pd.DataFrame,
    df_new: pd.DataFrame,
    caption: str | None = None,
    name: BlockId = None,
    label: str = None,
    old_label: str = "Old",
    new_label: str = "New",
) -> Table:
    """Compare two DataFrames and render a styled diff table.

    Highlights:
    - Green background for new/added values
    - Red background for removed values
    - Yellow background for changed values

    Works best when both DataFrames share the same columns. If columns
    differ, added/removed columns are shown. Rows are aligned by index.

    Args:
        df_old: The original DataFrame
        df_new: The updated DataFrame
        caption: A caption to display below the diff (optional)
        name: A unique name for the block (optional)
        label: A label used when displaying the block (optional)
        old_label: Label for old values (default: "Old")
        new_label: Label for new values (default: "New")

    Returns:
        A ``Table`` block with styled diff highlighting

    Example::

        df_old = pd.DataFrame({"name": ["Alice", "Bob"], "score": [85, 92]})
        df_new = pd.DataFrame({"name": ["Alice", "Bob", "Carol"], "score": [90, 92, 78]})
        view = dip.Blocks(dip.Diff(df_old, df_new))
    """
    diff_df, styles = _compute_diff(df_old, df_new, old_label, new_label)

    # Build HTML directly with inline styles (shadow DOM overrides Styler classes)
    html = _render_diff_html(diff_df, styles)

    from .text import HTML as HTMLBlock
    return HTMLBlock(html, name=name, label=label)


def _compute_diff(
    df_old: pd.DataFrame,
    df_new: pd.DataFrame,
    old_label: str,
    new_label: str,
) -> tuple[pd.DataFrame, pd.DataFrame]:
    """Compute a diff DataFrame and a corresponding styles DataFrame.

    Returns (diff_df, styles_df) where styles_df has CSS strings for each cell.
    """
    # Colors — use !important to override shadow DOM table styles
    C_ADD = "background-color: #bbf7d0 !important; color: #14532d !important"      # green-200
    C_REMOVE = "background-color: #fecaca !important; color: #7f1d1d !important"   # red-200
    C_CHANGE = "background-color: #fde68a !important; color: #78350f !important"   # yellow-200
    C_NONE = ""

    # Align on shared index and columns
    all_idx = df_old.index.union(df_new.index)
    all_cols = df_old.columns.union(df_new.columns)

    old_aligned = df_old.reindex(index=all_idx, columns=all_cols)
    new_aligned = df_new.reindex(index=all_idx, columns=all_cols)

    # Build the output DataFrame with a "Status" column
    rows = []
    style_rows = []

    for idx in all_idx:
        in_old = idx in df_old.index
        in_new = idx in df_new.index

        if in_old and not in_new:
            # Row removed
            row = {"_status": "removed"}
            style_row = {"_status": C_REMOVE}
            for col in all_cols:
                val = old_aligned.at[idx, col]
                row[col] = _fmt_val(val)
                style_row[col] = C_REMOVE
        elif in_new and not in_old:
            # Row added
            row = {"_status": "added"}
            style_row = {"_status": C_ADD}
            for col in all_cols:
                val = new_aligned.at[idx, col]
                row[col] = _fmt_val(val)
                style_row[col] = C_ADD
        else:
            # Row exists in both — check cell-by-cell
            has_change = False
            row = {"_status": ""}
            style_row = {"_status": C_NONE}
            for col in all_cols:
                old_val = old_aligned.at[idx, col]
                new_val = new_aligned.at[idx, col]

                col_in_old = col in df_old.columns
                col_in_new = col in df_new.columns

                if not col_in_old:
                    # New column
                    row[col] = _fmt_val(new_val)
                    style_row[col] = C_ADD
                    has_change = True
                elif not col_in_new:
                    # Removed column
                    row[col] = _fmt_val(old_val)
                    style_row[col] = C_REMOVE
                    has_change = True
                elif _vals_equal(old_val, new_val):
                    row[col] = _fmt_val(new_val)
                    style_row[col] = C_NONE
                else:
                    row[col] = f"{_fmt_val(old_val)} → {_fmt_val(new_val)}"
                    style_row[col] = C_CHANGE
                    has_change = True

            if has_change:
                row["_status"] = "changed"
                style_row["_status"] = C_CHANGE

        rows.append(row)
        style_rows.append(style_row)

    # Build DataFrames
    columns = ["_status"] + list(all_cols)
    diff_df = pd.DataFrame(rows, columns=columns)
    diff_df = diff_df.rename(columns={"_status": "Status"})

    styles_df = pd.DataFrame(style_rows, columns=columns)
    styles_df = styles_df.rename(columns={"_status": "Status"})

    return diff_df, styles_df


def _render_diff_html(diff_df: pd.DataFrame, styles_df: pd.DataFrame) -> str:
    """Render the diff as an HTML table with inline styles."""
    import html as html_mod

    lines = [
        '<table style="border-collapse:collapse;width:100%;font-size:14px;font-family:inherit">',
        "<thead><tr>",
    ]
    for col in diff_df.columns:
        lines.append(
            f'<th style="background:#f1f5f9;font-weight:600;padding:10px 14px;'
            f'border-bottom:2px solid #e2e8f0;text-align:left">'
            f'{html_mod.escape(str(col))}</th>'
        )
    lines.append("</tr></thead><tbody>")

    for i in range(len(diff_df)):
        lines.append("<tr>")
        for col in diff_df.columns:
            val = diff_df.iloc[i][col]
            style = styles_df.iloc[i][col]
            base_style = "padding:8px 14px;border-bottom:1px solid #e2e8f0"
            if style:
                cell_style = f"{base_style};{style}"
            else:
                cell_style = base_style
            lines.append(f'<td style="{cell_style}">{html_mod.escape(str(val))}</td>')
        lines.append("</tr>")

    lines.append("</tbody></table>")
    return "\n".join(lines)


def _fmt_val(val) -> str:
    """Format a value for display."""
    if pd.isna(val):
        return ""
    return str(val)


def _vals_equal(a, b) -> bool:
    """Compare two values, handling NaN."""
    if pd.isna(a) and pd.isna(b):
        return True
    if pd.isna(a) or pd.isna(b):
        return False
    return a == b
