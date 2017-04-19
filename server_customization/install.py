#!/usr/bin/env python
# coding: utf-8

# Copyright (c) - Continuum Analytics

import argparse
import os
from os.path import exists, join
import json
import logging

from traitlets.config.manager import BaseJSONConfigManager

from jupyter_core.paths import jupyter_config_dir


log = logging.getLogger(__name__)
log.addHandler(logging.StreamHandler())
log.setLevel(logging.INFO)

# Arguments for command line
parser = argparse.ArgumentParser(
    description="Installs nbextension")
parser.add_argument(
    "-e", "--enable",
    help="Automatically load nb_conda_kernels on notebook launch",
    action="store_true")
parser.add_argument(
    "-d", "--disable",
    help="Remove nb_conda_kernels from config on notebook launch",
    action="store_true")
parser.add_argument(
    "-p", "--prefix",
    help="prefix where to load nb_conda_kernels config",
    action="store")
parser.add_argument(
    "-v", "--verbose",
    help="Show more output",
    action="store_true"
)

CKSM = "nb_conda_kernels.CondaKernelSpecManager"
KSMC = "kernel_spec_manager_class"


def pretty(it): return json.dumps(it, indent=2)


def install(enable=False, disable=False, prefix=None, verbose=False):
    """Install the nb_conda_kernels config piece.

    Parameters
    ----------
    enable: bool
        Enable the nb_conda_kernels on every notebook launch
    disable: bool
        Disable nb_conda_kernels on every notebook launch
    """
    if verbose:
        log.setLevel(logging.DEBUG)

    if enable == disable:
        log.error("Please provide (one of) --enable or --disable")
        raise ValueError(enable, disable)

    log.info("{}abling nb_conda_kernels...".format("En" if enable else "Dis"))

    path = jupyter_config_dir()

    if prefix is not None:
        path = join(prefix, "etc", "jupyter")
        if not exists(path):
            log.debug("Making directory {}...".format(path))
            os.makedirs(path)

    cm = BaseJSONConfigManager(config_dir=path)
    cfg = cm.get("jupyter_notebook_config")

    log.debug("Existing config in {}...\n{}".format(path, pretty(cfg)))

    nb_app = cfg.setdefault("NotebookApp", {})

    if enable:
        nb_app.update({KSMC: CKSM})
    elif disable and nb_app.get(KSMC, None) == CKSM:
        nb_app.pop(KSMC)

    log.debug("Writing config in {}...".format(path))

    cm.set("jupyter_notebook_config", cfg)

    cfg = cm.get("jupyter_notebook_config")

    log.debug("Verifying config in {}...\n{}".format(path, pretty(cfg)))

    if enable:
        assert cfg["NotebookApp"][KSMC] == CKSM
    else:
        assert KSMC not in cfg["NotebookApp"]

    log.info("{}abled nb_conda_kernels".format("En" if enable else "Dis"))


if __name__ == '__main__':
    install(**parser.parse_args().__dict__)
