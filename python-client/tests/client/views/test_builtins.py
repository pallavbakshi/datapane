"""Tests for the API that can run locally (due to design or mocked out)"""
from glom import glom

import datainpane as dip
from datainpane.builtins import gen_df

from .test_views import assert_view, element_to_str, md_block


################################################################################
# Templates
def test_demo():
    view = dip.builtins.demo()

    assert_view(view)


def test_add_code():
    b = dip.builtins.add_code(md_block, "print(1)")
    assert isinstance(b, dip.Select)
    assert glom(b, ("blocks", ["_tag"])) == ["Text", "Code"]
    assert "print(1)" in element_to_str(b)


def test_build_md_view():
    text = """
# Hello

{{}}

{{table}}
"""

    view = dip.builtins.build_md_view(text, gen_df(4), table=gen_df(8))
    assert_view(view, 2, 4)
