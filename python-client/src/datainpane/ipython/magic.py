"""%%dip cell magic for Jupyter notebooks.

Usage::

    %load_ext datainpane

    %%dip
    import datainpane as dip
    import pandas as pd

    df = pd.DataFrame({"x": [1, 2, 3], "y": [4, 5, 6]})
    view = dip.Blocks(
        dip.Text("# My Report"),
        dip.DataTable(df),
    )

The last expression or any variable named ``view`` that is a ``Blocks``
instance will be rendered inline in the notebook.

Options::

    %%dip --save report.html
    %%dip --save report.pdf
    %%dip --theme dark
"""
from __future__ import annotations

from IPython.core.magic import Magics, cell_magic, magics_class, needs_local_scope
from IPython.display import HTML, display


@magics_class
class DipMagics(Magics):
    @cell_magic
    @needs_local_scope
    def dip(self, line: str, cell: str, local_ns=None):
        """Execute cell and render any Blocks result inline."""
        from datainpane.processors.api import save_pdf, save_report, stringify_report
        from datainpane.processors.types import Formatting, Theme
        from datainpane.view import Blocks

        # Parse options
        args = line.strip().split()
        save_path = None
        theme = None
        i = 0
        while i < len(args):
            if args[i] == "--save" and i + 1 < len(args):
                save_path = args[i + 1]
                i += 2
            elif args[i] == "--theme" and i + 1 < len(args):
                theme = args[i + 1]
                i += 2
            else:
                i += 1

        # Build formatting from theme
        formatting = None
        if theme:
            try:
                t = Theme(theme)
                formatting = Formatting.from_theme(t)
            except ValueError:
                valid = ", ".join(t.value for t in Theme)
                print(f"Unknown theme '{theme}'. Valid: {valid}")
                return

        # Execute the cell
        ns = {}
        if local_ns:
            ns.update(local_ns)
        exec(cell, self.shell.user_ns, ns)
        # Push new variables back to the notebook namespace
        self.shell.user_ns.update(ns)

        # Find the Blocks result: check 'view', then last assigned variable
        result = None
        if "view" in ns and isinstance(ns["view"], Blocks):
            result = ns["view"]
        else:
            # Look for any Blocks instance in the cell's namespace
            for val in reversed(list(ns.values())):
                if isinstance(val, Blocks):
                    result = val
                    break

        if result is None:
            return

        # Save if requested
        if save_path:
            if save_path.endswith(".pdf"):
                save_pdf(result, path=save_path, formatting=formatting)
            else:
                save_report(result, path=save_path, formatting=formatting)

        # Render inline
        html_str = stringify_report(result, formatting=formatting)
        display(HTML(html_str))


def load_ipython_extension(ipython):
    """Called by %load_ext datainpane"""
    ipython.register_magics(DipMagics)
