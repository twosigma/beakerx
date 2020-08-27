#!/usr/bin/env python
# coding: utf-8

# Copyright 2020 TWO SIGMA OPEN SOURCE, LLC
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

"""
This file originates from the 'jupyter-packaging' package, and
contains a set of useful utilities for installing node modules
within a Python package.
"""
import os
import pipes
import sys
from setuptools.command.bdist_egg import bdist_egg

try:
    from wheel.bdist_wheel import bdist_wheel
except ImportError:
    bdist_wheel = None

if sys.platform == 'win32':
    pass
else:
    def list2cmdline(cmd_list):
        return ' '.join(map(pipes.quote, cmd_list))

# ---------------------------------------------------------------------------
# Top Level Variables
# ---------------------------------------------------------------------------


here = os.path.abspath(os.path.dirname(sys.argv[0]))
root = os.path.abspath(os.path.join(here, os.pardir))
kernel_path = os.path.join(root, './')


# ---------------------------------------------------------------------------
# Public Functions
# ---------------------------------------------------------------------------
def get_version(path):
    version = {}
    with open(os.path.join(here, path)) as f:
        exec(f.read(), {}, version)
    return version['__version__']


class bdist_egg_disabled(bdist_egg):
    """Disabled version of bdist_egg
    Prevents setup.py install performing setuptools' default easy_install,
    which it should never ever do.
    """

    def run(self):
        sys.exit("Aborting implicit building of eggs. Use `pip install .` " +
                 " to install from source.")
