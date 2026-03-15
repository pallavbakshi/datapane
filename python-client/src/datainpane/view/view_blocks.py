from __future__ import annotations

import typing as t
import warnings
from collections.abc import Mapping
from copy import copy
from typing import Self

from lxml import etree
from lxml.etree import _Element as ElementT

from datainpane.blocks import Group
from datainpane.blocks.base import BlockOrPrimitive
from datainpane.blocks.layout import ContainerBlock

if t.TYPE_CHECKING:
    from datainpane.processors.types import Formatting


class Blocks(ContainerBlock):
    """Container that holds a collection of blocks"""

    # This is essentially an easy-to-use wrapper around a list of blocks
    # that is composable.
    # TODO - move to datainpane.blocks ?

    _tag = "Blocks"

    def __init__(self, *arg_blocks: BlockOrPrimitive, blocks: list[BlockOrPrimitive] = None, **kwargs):
        # if passed a single View into a View object, pull out the contained blocks and use instead
        if len(arg_blocks) == 1 and isinstance(arg_blocks[0], Blocks):
            arg_blocks = tuple(arg_blocks[0].blocks)

        super().__init__(*arg_blocks, blocks=blocks, **kwargs)

    def __or__(self, other: Blocks) -> Blocks:
        x = Group(blocks=self.blocks) if len(self.blocks) > 1 else self.blocks[0]
        y = Group(blocks=other.blocks) if len(other.blocks) > 1 else other.blocks[0]
        z = Group(x, y, columns=2)
        return Blocks(z)

    @classmethod
    def from_notebook(
        cls, opt_out: bool = True, show_code: bool = False, show_markdown: bool = True, template: str = "auto"
    ) -> Self:
        from datainpane.ipython import templates as ip_t
        from datainpane.ipython.utils import cells_to_blocks

        blocks = cells_to_blocks(opt_out=opt_out, show_code=show_code, show_markdown=show_markdown)
        app_template_cls = ip_t._registry.get(template) or ip_t.guess_template(blocks)
        app_template = app_template_cls(blocks)
        app_template.transform()
        app_template.validate()
        return cls(blocks=app_template.blocks)

    def get_dom(self) -> ElementT:
        """Return the Document structure for the View"""
        # internal debugging method
        from datainpane.processors.file_store import DummyFileEntry, FileStore

        from .xml_visitor import XMLBuilder

        builder = XMLBuilder(FileStore(DummyFileEntry))
        self.accept(builder)
        return builder.get_root()

    def get_dom_str(self) -> str:
        dom = self.get_dom()
        return etree.tounicode(dom, pretty_print=True)

    def pprint(self) -> None:
        from .visitors import PrettyPrinter

        self.accept(PrettyPrinter())

    @classmethod
    def wrap_blocks(cls, x: Self | list[BlockOrPrimitive] | BlockOrPrimitive) -> Self:
        blocks: Self
        if isinstance(x, Blocks):
            blocks = copy(x)
        elif isinstance(x, list):
            blocks = cls(*x)
        else:
            blocks = cls(x)
        return blocks


class View(Blocks):
    pass


BlocksT = Blocks | list[BlockOrPrimitive] | Mapping[str, BlockOrPrimitive] | BlockOrPrimitive


class App(Blocks):
    """
    App documents collate plots, text, tables, and files into an interactive document that
    can be analysed and shared by users in their browser
    """

    # Backwards compatible interfaces/wrappers

    def __init__(self, *arg_blocks: BlockOrPrimitive, blocks: list[BlockOrPrimitive] = None, **kwargs):
        if "layout" in kwargs:
            raise ValueError(
                "App(layout=...) is no longer supported, please use `dp.Group(columns=...)` for horizontal layouts"
            )
        warnings.warn(
            "Instead of dp.App(), please see our newer API dp.Blocks(). "
            + "Instead of App.save_report() etc., you can use dp.save_report(blocks)",
            DeprecationWarning,
        )
        super().__init__(*arg_blocks, blocks=blocks, **kwargs)

    def save(
        self,
        path: str,
        open: bool = False,
        standalone: bool = False,
        name: str | None = None,
        author: str | None = None,
        formatting: Formatting | None = None,
        cdn_base: str | None = None,
    ) -> None:
        from ..processors import save_report

        if standalone:
            raise ValueError("save(standalone=True) is no longer supported, sorry!")
        if author is not None:
            raise ValueError('save(author="...") is no longer supported, sorry!')
        if cdn_base is not None:
            raise ValueError('save(cdn_base="...") is no longer supported, sorry!')
        save_report(blocks=self, path=path, open=open, name=name, formatting=formatting)

    def stringify(
        self,
        standalone: bool = False,
        name: str | None = None,
        author: str | None = None,
        formatting: Formatting | None = None,
        cdn_base: str | None = None,
        template_name: str = "template.html",
    ) -> str:
        from ..processors import stringify_report

        if standalone:
            raise ValueError("save(standalone=True) is no longer supported, sorry!")
        if author is not None:
            raise ValueError('save(author="...") is no longer supported, sorry!')
        if cdn_base is not None:
            raise ValueError('save(cdn_base="...") is no longer supported, sorry!')
        if template_name != "template.html":
            raise ValueError('save(template_name="...") is no longer supported, sorry!')

        return stringify_report(blocks=self, name=name, formatting=formatting)


class Report(App):
    pass
