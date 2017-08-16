#!/usr/bin/env python
# coding: utf-8

#!/usr/bin/env python
# coding: utf-8

# Copyright 2017 TWO SIGMA OPEN SOURCE, LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#        http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
# 

import argparse
import os
import sys
import site
import shutil
from subprocess import check_call
import pipes
import json
import logging
from traitlets.config.manager import BaseJSONConfigManager
from jupyter_core.paths import jupyter_config_dir


log = logging.getLogger(__name__)
log.addHandler(logging.StreamHandler())
log.setLevel(logging.INFO)


# Arguments for command line
parser = argparse.ArgumentParser(
    description="Installs beakerx kernels and custom CSS")
parser.add_argument(
    "-e", "--enable",
    help="Install beakerx",
    action="store_true")
parser.add_argument(
    "-d", "--disable",
    help="Uninstall beakerx",
    action="store_true")
parser.add_argument(
    "-p", "--prefix",
    help="Prefix where to load beakerx kernelspec config",
    action="store")
parser.add_argument(
    "-v", "--verbose",
    help="Show more output",
    action="store_true"
)


here = os.path.abspath(os.path.dirname(sys.argv[0]))
static_dir = os.path.join(here, 'static')
site_packages = site.getsitepackages()[0]


if sys.platform == 'win32':
    from subprocess import list2cmdline
else:
    def list2cmdline(cmd_list):
        return ' '.join(map(pipes.quote, cmd_list))


def run(cmd, *args, **kwargs):
    """Echo a command before running it.  Defaults to repo as cwd"""
    
    log.info('> ' + list2cmdline(cmd))
    kwargs.setdefault('cwd', here)
    kwargs.setdefault('shell', sys.platform == 'win32')
    if not isinstance(cmd, list):
        cmd = cmd.split()
    return check_call(cmd, *args, **kwargs)


def pretty(it): 
    return json.dumps(it, indent=2)


def install_kernels(src=os.path.join(static_dir, 'kernel'), dest=os.path.join(static_dir, 'kernel')):
    """Install all kernels in a directory.
    
    Parameters
    ----------
    dest: str
        The source path containing kernel specs.
    dest: str (optional)
        The destination path to write modified kernel specs.
    """

    def install_kernel(kernelspec_path='', kernelspec_name=None):
        name = kernelspec_name if kernelspec_name else os.path.basename(kernelspec_path)
        classpath = (os.path.abspath(os.path.join(dest, 'base', 'lib', '*')) + (';' if sys.platform == 'win32' else ':') + os.path.abspath(os.path.join(dest, name, 'lib', '*'))).replace('\\', '/')
        src_spec_file = os.path.join(kernelspec_path, 'kernel.json')
        dest_spec_file = src_spec_file + '.tmp'
        lines = []
        with open(src_spec_file) as infile:
            for line in infile:
                line = line.replace('__PATH__', classpath)
                lines.append(line)
        with open(dest_spec_file, 'w') as outfile:
            for line in lines:
                outfile.write(line)
        os.remove(src_spec_file)
        os.rename(dest_spec_file, src_spec_file)
        run(['jupyter', 'kernelspec', 'install', '--sys-prefix', '--replace', '--name', name, kernelspec_path])

    for dir, subdirs, files in os.walk(src):
        if 'kernel.json' in files:
            install_kernel(dir)
        else:
            continue


def update_kernelspec_class(enable=False, disable=False, prefix=None):
    """Return a Command for updating kernelspec_class in jupyter_notebook_config.json.

    Parameters
    ----------
    enable: bool
        Enable the nb_conda_kernels on every notebook launch
    disable: bool
        Disable nb_conda_kernels on every notebook launch
    prefix: string (optional)
        Base path of Python environment
    """

    CKSM = "beakerx.kernel_spec.BeakerXKernelSpec"
    KSMC = "kernel_spec_class"
        
    log.info("{}abling BeakerX server config...".format("Dis" if disable else "En"))

    path = jupyter_config_dir()

    if prefix is not None:
        path = os.path.join(prefix, "etc", "jupyter")
        if not os.path.exists(path):
            log.debug("Making directory {}...".format(path))
            os.makedirs(path)

    cm = BaseJSONConfigManager(config_dir=path)
    cfg = cm.get("jupyter_notebook_config")

    log.debug("Existing config in {}...\n{}".format(path, pretty(cfg)))

    nb_app = cfg.setdefault("KernelSpecManager", {})

    if disable and nb_app.get(KSMC, None) == CKSM:
        nb_app.pop(KSMC)
    else:
        nb_app.update({KSMC: CKSM})

    log.debug("Writing config in {}...".format(path))

    cm.set("jupyter_notebook_config", cfg)

    cfg = cm.get("jupyter_notebook_config")

    log.debug("Verifying config in {}...\n{}".format(path, pretty(cfg)))

    if disable:
        assert KSMC not in cfg["KernelSpecManager"]
    else:
        assert cfg["KernelSpecManager"][KSMC] == CKSM

    log.info("{}abled BeakerX server config".format("Dis" if disable else "En"))


def copy_custom_css(src=os.path.join(static_dir, 'custom'), 
dest=os.path.join(site_packages, 'notebook', 'static', 'custom')):
    """Copy files from one directory to another.

    Parameters
    ----------
    src: Source directory
    dest: Destination directory
    """
    
    log.info("Copying {} to {}".format(src, dest))
    if os.path.exists(dest):
        shutil.rmtree(dest)
    shutil.copytree(src, dest)


def install(enable=False, disable=False, prefix=sys.prefix, verbose=False):
    """Install the nb_conda_kernels config piece.
    Parameters
    ----------
    enable: bool
        Enable the nb_conda_kernels on every notebook launch
    disable: bool
        Disable nb_conda_kernels on every notebook launch
    prefix: string (optional)
        Base path of Python environment
    """
    
    if verbose:
        log.setLevel(logging.DEBUG)
        
    if enable == disable:
        log.error("Please provide (one of) --enable or --disable")
        raise ValueError(enable, disable)
    
    install_kernels(
        src=os.path.join(static_dir, 'kernel'), 
        dest=os.path.join(static_dir, 'kernel')
    )
    
    update_kernelspec_class(enable=enable, disable=disable, prefix=sys.prefix)
    
    copy_custom_css(
        src=os.path.join(static_dir, 'custom'), 
        dest=os.path.join(site_packages, 'notebook', 'static', 'custom')
    )


if __name__ == '__main__':
    install(**parser.parse_args().__dict__)
