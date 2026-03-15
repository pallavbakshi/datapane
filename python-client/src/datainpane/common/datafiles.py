"""Dataset Format handling"""
from __future__ import annotations

import abc
import typing as t

import pandas as pd
import pyarrow as pa
from pyarrow import RecordBatchFileWriter

from .df_processor import obj_to_str, process_df, str_to_arrow_str
from .dp_types import ARROW_EXT, ARROW_MIMETYPE, MIME


def write_table(table: pa.Table, sink: str | t.IO[bytes]):
    """Write an arrow table to a file"""
    writer = RecordBatchFileWriter(sink, table.schema)
    writer.write(table)
    writer.close()


PathOrFile = str | t.IO


class DFFormatter(abc.ABC):
    # TODO - tie to mimetypes lib
    content_type: MIME
    ext: str
    enum: str

    @staticmethod
    @abc.abstractmethod
    def load_file(fn: PathOrFile) -> pd.DataFrame:
        pass

    @staticmethod
    @abc.abstractmethod
    def save_file(fn: PathOrFile, df: pd.DataFrame):
        pass


class ArrowFormat(DFFormatter):
    content_type = ARROW_MIMETYPE
    ext = ARROW_EXT
    enum = "ARROW"

    @staticmethod
    def load_file(fn: PathOrFile) -> pd.DataFrame:
        df = pa.ipc.open_file(fn).read_pandas()
        # NOTE - need to convert categories from object to string https://github.com/apache/arrow/issues/33070
        obj_to_str(df)
        str_to_arrow_str(df)
        return df

    @staticmethod
    def save_file(fn: PathOrFile, df: pd.DataFrame):
        df = process_df(df)
        # NOTE - can pass expected schema and columns for output df here
        table: pa.Table = pa.Table.from_pandas(df, preserve_index=False)
        write_table(table, fn)
