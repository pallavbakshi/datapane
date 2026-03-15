"""Obsolete df processing code"""
import datetime
import textwrap
from io import StringIO
from typing import List, TextIO

import pandas as pd
import pytest
from pandas.errors import ParserError

from datainpane.client import log
from datainpane.common.df_processor import process_df


def convert_csv_pd(string: str, process: bool = False) -> pd.DataFrame:
    """Helper function to convert a well-formatted csv into a DataFrame"""
    buf: TextIO = StringIO(textwrap.dedent(string).strip())

    try:
        df = pd.read_csv(buf, engine="c", sep=",")
    except ParserError as e:
        log.warning(f"Error parsing CSV file ({e}), trying python fallback")
        df = pd.read_csv(buf, engine="python", sep=None)

    if process:
        df = process_df(df)
    return df


def parse_timedelta(data: pd.DataFrame):
    """Tries to convert strings to timedelta, ignores existing panda timedelta"""
    potential_timedeltas = data.select_dtypes(["object", "str"])

    def try_to_timedelta(ser: pd.Series) -> pd.Series:
        try:
            return pd.to_timedelta(ser)
        except (ValueError, TypeError):
            return ser

    data[potential_timedeltas.columns] = potential_timedeltas.apply(try_to_timedelta)


def parse_dates(data: pd.DataFrame, force_utc: bool = False):
    """Tries to convert strings to dates, ignores existing panda datetimes"""
    potential_dates = data.select_dtypes(["object", "str", "category"])

    def try_to_datetime(ser: pd.Series) -> pd.Series:
        try:
            return pd.to_datetime(ser, utc=force_utc)
        except (ValueError, TypeError):
            return ser

    data[potential_dates.columns] = potential_dates.apply(try_to_datetime)


def _check_dates_parsed(df: pd.DataFrame, date_columns: List[str]):
    assert set(list(df.select_dtypes(["datetime", "datetimetz"]).columns)) == set(date_columns)


def _check_timedelta_parsed(df: pd.DataFrame, timedelta_columns: List[str]):
    assert set(list(df.select_dtypes("timedelta").columns)) == set(timedelta_columns)


def test_parse_dates_regular():
    data = convert_csv_pd(
        """
        data_col1,data_col2,float_col,string_col
        2017-01-10,2017-01-21T23:10:24,0.23,bla1
        2017-01-11,2017-01-23T23:01:24,0.23,bla1
        """
    )
    parse_dates(data)
    _check_dates_parsed(data, ["data_col1", "data_col2"])


def test_parse_dates_empty():
    _check_dates_parsed(pd.DataFrame(), [])


def test_parse_dates_wrong_date():
    data = convert_csv_pd(
        """
        data_col1,data_col2,float_col,string_col
        2017-01-10,2017-01-21T23:10:24,0.23,bla1
        2017-01-1s,2017-01-23T23:01:24,0.23,bla1
        """
    )
    parse_dates(data)
    _check_dates_parsed(data, ["data_col2"])


def test_parse_dates_nulls():
    # NOTE - pandas 3.0 parses ISO8601 with Z as UTC timezone-aware
    data = convert_csv_pd(
        """
        timestamp,value
        2019-02-19T03:00:02Z,1
        ,2
        2019-01-10T12:10:10Z,3
        """
    )
    parse_dates(data, force_utc=True)
    _check_dates_parsed(data, ["timestamp"])


def test_parse_timedelta_regular():
    data = convert_csv_pd(
        """
        timedelta_col,float_col,string_col
        "1 day, 4:08:25.159814",0.23,bla1
        "1 day, 18:34:16.196687",0.23,bla1
        """
    )
    parse_timedelta(data)
    _check_timedelta_parsed(data, ["timedelta_col"])


def test_parse_timedelta_with_assertion_error():
    data = convert_csv_pd(
        """
        timedelta_col1,timedelta_col2,float_col,string_col
        4:08:25.159814,"1 day, 4:08:25.159814",0.23,bla1
        18:34:16.196687,"1 day, 18:34:16.196687",0.23,bla1
        """
    )
    parse_timedelta(data)
    # In pandas 3.0, timedelta_col2 is parsed as timedelta
    # timedelta_col1 (short format without "day") is also parsed as timedelta
    _check_timedelta_parsed(data, ["timedelta_col1", "timedelta_col2"])


def test_parse_timedelta_explicit_convert():
    """Test that explicitly converted timedelta columns survive process_df.
    Note: process_df converts timedelta to string for arrow compatibility,
    so after processing, timedelta columns become string type."""
    def convert_csv_pd_(string: str) -> pd.DataFrame:
        import textwrap
        from io import StringIO

        buf = StringIO(textwrap.dedent(string).strip())
        df = pd.read_csv(buf, engine="c", sep=",")
        df["timedelta_col1"] = pd.to_timedelta(df["timedelta_col1"])
        return df

    # Before process_df, timedelta_col1 should be timedelta
    data = convert_csv_pd_(
        """
        timedelta_col1,timedelta_col2,float_col,string_col
        4:08:25.159814,"1 day, 4:08:25.159814",0.23,bla1
        18:34:16.196687,"1 day, 18:34:16.196687",0.23,bla1
        """
    )
    _check_timedelta_parsed(data, ["timedelta_col1"])
    # parse_timedelta should also convert timedelta_col2
    parse_timedelta(data)
    _check_timedelta_parsed(data, ["timedelta_col1", "timedelta_col2"])
