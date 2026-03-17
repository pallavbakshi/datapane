from __future__ import annotations

import dataclasses as dc
import typing as t
from enum import Enum
from pathlib import Path

from datainpane.common import ViewXML
from datainpane.view import Blocks

from .file_store import DummyFileEntry, FileEntry, FileStore


@dc.dataclass
class ViewState:
    # maybe a FileHandler interface??
    blocks: Blocks
    file_entry_klass: dc.InitVar[type[FileEntry]]
    store: FileStore = dc.field(init=False)
    view_xml: ViewXML = ""
    dir_path: dc.InitVar[Path | None] = None

    def __post_init__(self, file_entry_klass, dir_path):
        # TODO - should we use a lambda for file_entry_klass with dir_path captured?
        self.store = FileStore(fw_klass=file_entry_klass, assets_dir=dir_path)


P_IN = t.TypeVar("P_IN")
P_OUT = t.TypeVar("P_OUT")


class BaseProcessor(t.Generic[P_IN, P_OUT]):
    """Processor class that handles pipeline operations"""

    s: ViewState

    def __call__(self, x: P_IN) -> P_OUT:
        raise NotImplementedError("Implement in subclass")


# TODO - type this properly
class Pipeline(t.Generic[P_IN]):
    """
    A simple, programmable, eagerly-evaluated, pipeline specialised on ViewAST transformations
    similar to f :: State s => s ViewState x -> s ViewState y
    """

    # NOTE - toolz has an untyped function for this

    def __init__(self, s: ViewState, x: P_IN = None):
        self._state = s
        self._x = x

    def pipe(self, p: BaseProcessor[P_IN, P_OUT]) -> Pipeline[P_OUT]:
        p.s = self._state
        y = p.__call__(self._x)  # need to call as positional args
        self._state = p.s
        return Pipeline(self._state, y)

    @property
    def state(self) -> ViewState:
        return self._state

    @property
    def result(self) -> P_IN:
        return self._x


def mk_null_pipe(blocks: Blocks) -> Pipeline[None]:
    s = ViewState(blocks, file_entry_klass=DummyFileEntry)
    return Pipeline(s)


# Top-level API options / types
class Width(Enum):
    NARROW = "narrow"
    MEDIUM = "medium"
    FULL = "full"

    def to_css(self) -> str:
        if self == self.NARROW:
            return "max-w-3xl"
        elif self == self.MEDIUM:
            return "max-w-screen-xl"
        else:
            return "max-w-full"


class TextAlignment(Enum):
    JUSTIFY = "justify"
    LEFT = "left"
    RIGHT = "right"
    CENTER = "center"


class FontChoice(Enum):
    DEFAULT = "Inter, ui-sans-serif, system-ui"
    SANS = "ui-sans-serif, sans-serif, system-ui"
    SERIF = "ui-serif, serif, system-ui"
    MONOSPACE = "ui-monospace, monospace, system-ui"


# Currently unused
# class PageLayout(Enum):
#     TOP = "top"
#     SIDE = "side"


@dc.dataclass
class Formatting:
    """Configure styling and formatting.

    Use a preset theme via `Formatting.from_theme(Theme.DARK)` or customize
    individual properties directly::

        dip.save_report(view, path="report.html", formatting=Formatting(
            bg_color="#1E293B",
            accent_color="#FB923C",
            font=FontChoice.SANS,
            width=Width.FULL,
        ))

    You can also inject arbitrary CSS via `custom_css`::

        Formatting(custom_css="h1 { border-bottom: 2px solid #FB923C; }")

    Add header/footer branding::

        Formatting(header="<img src='logo.png' height='40'/> My Company")

    Enable dark mode toggle::

        Formatting(dark_mode_toggle=True)
    """

    bg_color: str = "#FFF"
    accent_color: str = "#4E46E5"
    font: FontChoice | str = FontChoice.DEFAULT
    text_alignment: TextAlignment = TextAlignment.LEFT
    width: Width = Width.MEDIUM
    light_prose: bool = False
    custom_css: str = ""
    header: str = ""
    footer: str = ""
    dark_mode_toggle: bool = False

    def to_css(self) -> str:
        if isinstance(self.font, FontChoice):
            font = self.font.value
        else:
            font = self.font

        css = f""":root {{
    --dp-accent-color: {self.accent_color};
    --dp-bg-color: {self.bg_color};
    --dp-text-align: {self.text_alignment.value};
    --dp-font-family: {font};
}}"""
        if self.custom_css:
            css += f"\n{self.custom_css}"
        return css

    @classmethod
    def from_theme(cls, theme: Theme, **overrides) -> Formatting:
        """Create a Formatting instance from a named theme.

        Any keyword arguments override the theme defaults::

            fmt = Formatting.from_theme(Theme.DARK, width=Width.FULL)
        """
        base = dict(_THEMES[theme])
        base.update(overrides)
        return cls(**base)


class Theme(Enum):
    """Built-in report themes."""

    DEFAULT = "default"
    DARK = "dark"
    MIDNIGHT = "midnight"
    OCEAN = "ocean"
    FOREST = "forest"
    CORAL = "coral"
    MONOCHROME = "monochrome"
    NAVY_APRICOT = "navy_apricot"


_THEMES: dict[Theme, dict[str, t.Any]] = {
    Theme.DEFAULT: dict(
        bg_color="#FFF",
        accent_color="#4E46E5",
        font=FontChoice.DEFAULT,
        light_prose=False,
    ),
    Theme.DARK: dict(
        bg_color="#1a1a2e",
        accent_color="#e94560",
        font=FontChoice.DEFAULT,
        light_prose=True,
    ),
    Theme.MIDNIGHT: dict(
        bg_color="#0f172a",
        accent_color="#38bdf8",
        font=FontChoice.SANS,
        light_prose=True,
    ),
    Theme.OCEAN: dict(
        bg_color="#f0f9ff",
        accent_color="#0284c7",
        font=FontChoice.DEFAULT,
        light_prose=False,
    ),
    Theme.FOREST: dict(
        bg_color="#f0fdf4",
        accent_color="#16a34a",
        font=FontChoice.DEFAULT,
        light_prose=False,
    ),
    Theme.CORAL: dict(
        bg_color="#fff7ed",
        accent_color="#ea580c",
        font=FontChoice.DEFAULT,
        light_prose=False,
    ),
    Theme.MONOCHROME: dict(
        bg_color="#fafafa",
        accent_color="#404040",
        font=FontChoice.SANS,
        light_prose=False,
    ),
    Theme.NAVY_APRICOT: dict(
        bg_color="#f8fafc",
        accent_color="#FB923C",
        font=FontChoice.DEFAULT,
        light_prose=False,
    ),
}
