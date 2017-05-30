#!/usr/bin/env python
# coding: utf-8

# Copyright (c) - Continuum Analytics

import argparse
import json
import logging
import os
from os.path import exists, join

from jupyter_core.paths import jupyter_config_dir
from traitlets.config.manager import BaseJSONConfigManager

log = logging.getLogger(__name__)
log.addHandler(logging.StreamHandler())
log.setLevel(logging.INFO)

# Arguments for command line
parser = argparse.ArgumentParser(
    description="Installs nbextension")
parser.add_argument(
    "-e", "--enable",
    help="Automatically load BeakerX server config on notebook launch",
    action="store_true")
parser.add_argument(
    "-d", "--disable",
    help="Remove BeakerX server config",
    action="store_true")
parser.add_argument(
    "-p", "--prefix",
    help="prefix where to load BeakerX server config",
    action="store")
parser.add_argument(
    "-v", "--verbose",
    help="Show more output",
    action="store_true"
)

CKSM = "beaker.kernel_spec.BeakerXKernelSpec"
KSMC = "kernel_spec_class"


def pretty(it): return json.dumps(it, indent=2)


def install(enable=False, disable=False, prefix=None, verbose=False):
    """Install the nb_conda_kernels config piece.

    Parameters
    ----------
    enable: bool
        Enable the BeakerX server config on every notebook launch
    disable: bool
        Disable BeakerX server config
    """
    if verbose:
        log.setLevel(logging.DEBUG)

    if enable == disable:
        log.error("Please provide (one of) --enable or --disable")
        raise ValueError(enable, disable)

    log.info("{}abling BeakerX server config...".format("En" if enable else "Dis"))

    path = jupyter_config_dir()

    if prefix is not None:
        path = join(prefix, "etc", "jupyter")
        if not exists(path):
            log.debug("Making directory {}...".format(path))
            os.makedirs(path)

    cm = BaseJSONConfigManager(config_dir=path)
    cfg = cm.get("jupyter_notebook_config")

    log.debug("Existing config in {}...\n{}".format(path, pretty(cfg)))

    nb_app = cfg.setdefault("KernelSpecManager", {})

    if enable:
        nb_app.update({KSMC: CKSM})
    elif disable and nb_app.get(KSMC, None) == CKSM:
        nb_app.pop(KSMC)

    log.debug("Writing config in {}...".format(path))

    cm.set("jupyter_notebook_config", cfg)

    cfg = cm.get("jupyter_notebook_config")

    log.debug("Verifying config in {}...\n{}".format(path, pretty(cfg)))

    if enable:
        assert cfg["KernelSpecManager"][KSMC] == CKSM
    else:
        assert KSMC not in cfg["KernelSpecManager"]

    install_groovymagic()
    log.info("{}abled BeakerX server config".format("En" if enable else "Dis"))

def install_groovymagic():
    log.debug("Installing Groovy Magic")
    settings = "c = get_config()\n"
    settings += "c.TerminalIPythonApp.display_banner = True\n"
    settings += "c.InteractiveShellApp.log_level = 20\n"
    settings += "c.InteractiveShellApp.extensions = [\n"
    settings += "       'groovy_magic'\n"
    settings += "]\n"

    ipython_path = os.popen('ipython locate').read()
    ipython_config_path = ipython_path.replace("\n", "") + '/profile_default/ipython_config.py'
    with open(ipython_config_path, 'w+') as outfile:
        outfile.write(settings)

if __name__ == '__main__':
    install(**parser.parse_args().__dict__)
