from __future__ import annotations

import datetime
import os
import shutil
import time
import typing as t
from collections.abc import Iterable
from contextlib import contextmanager
from pathlib import Path
from tempfile import TemporaryDirectory

from .dp_types import NPath, log


@contextmanager
def log_command(command: str) -> t.Generator[None, None, None]:
    """Log an internal process"""
    log.info(f"Starting {command}")
    yield
    log.info(f"Finished {command}")


@contextmanager
def temp_workdir() -> t.Generator[str, None, None]:
    """Set working dir to a tempdir for duration of context"""
    with TemporaryDirectory() as tmp_dir:
        curdir = os.getcwd()
        os.chdir(tmp_dir)
        try:
            yield None
        finally:
            os.chdir(curdir)


@contextmanager
def pushd(directory: NPath, pre_create: bool = False, post_remove: bool = False) -> t.Generator[None, None, None]:
    """Switch dir and push it onto the (call-)stack"""
    directory = Path(directory)
    cwd = os.getcwd()
    log.debug(f"[cd] {cwd} -> {directory}")
    if not directory.exists() and pre_create:
        Path(directory).mkdir(parents=True)
    os.chdir(directory)
    try:
        yield
    finally:
        log.debug(f"[cd] {cwd} <- {directory}")
        os.chdir(cwd)
        if post_remove:
            shutil.rmtree(directory, ignore_errors=True)


def get_filesize(filename: Path) -> int:
    return filename.stat().st_size


def walk_path(path: Path) -> Iterable[Path]:
    for p in path.rglob("*"):
        if not p.is_dir():
            yield p


def unixtime() -> int:
    return int(time.time())


def timestamp(x: datetime.datetime | None = None) -> str:
    """Return ISO timestamp for a datetime"""
    x = x or datetime.datetime.now(datetime.UTC)
    return f'{x.isoformat(timespec="seconds")}{"" if x.tzinfo else "Z"}'
