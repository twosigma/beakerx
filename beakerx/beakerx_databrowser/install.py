# Copyright 2018 TWO SIGMA OPEN SOURCE, LLC
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

'''Installs beakerx_databrowser into a Jupyter and Python environment.'''

import argparse
import json
import os
import pkg_resources
import shutil
import subprocess
import sys
import pathlib
import tempfile

from string import Template
from jupyter_client.kernelspecapp import KernelSpecManager
from jupyter_core import paths
from traitlets.config.manager import BaseJSONConfigManager
from distutils import log

def _uninstall_nbextension():
    subprocess.check_call(["jupyter", "nbextension", "disable", "beakerx_databrowser", "--py", "--sys-prefix"])
    subprocess.check_call(["jupyter", "nbextension", "uninstall", "beakerx_databrowser", "--py", "--sys-prefix"])
    subprocess.check_call(["jupyter", "serverextension", "disable", "beakerx_databrowser", "--py", "--sys-prefix"])

def _install_nbextension():
    if sys.platform == 'win32':
        subprocess.check_call(["jupyter", "nbextension", "install", "beakerx_databrowser", "--py", "--sys-prefix"])
    else:
        subprocess.check_call(["jupyter", "nbextension", "install", "beakerx_databrowser", "--py", "--symlink", "--sys-prefix"])

    subprocess.check_call(["jupyter", "nbextension", "enable", "beakerx_databrowser", "--py", "--sys-prefix"])
    subprocess.check_call(["jupyter", "serverextension", "enable", "beakerx_databrowser", "--py", "--sys-prefix"])

def make_parser():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--prefix",
                        help="location of the environment to install into",
                        default=sys.prefix)
    parser.add_argument("--disable",
                        help="Remove Beakerx extension",
                        action='store_true')
    return parser

def install(args):
    _install_nbextension()

def uninstall(args):
    _uninstall_nbextension()

if __name__ == "__main__":
    install()
