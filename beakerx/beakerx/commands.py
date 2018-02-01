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
import argparse
import sys
import beakerx
from notebook import notebookapp as app
from .install import install, uninstall
from .bkr2ipynb import main

def install_subparser(subparser):
    install_parser = subparser.add_parser('install', help='installs BeakerX extensions')
    install_parser.set_defaults(func = install)
    install_parser.add_argument("--prefix",
                                help="location of the environment to install into",
                                default=sys.prefix)
    return subparser

def uninstall_subparser(subparser):
    uninstall_parser = subparser.add_parser('uninstall', help='uninstalls BeakerX extensions')
    uninstall_parser.set_defaults(func=lambda args : uninstall())
    return subparser

def bkr2ipynb_subparser(subparser):
    bkr2ipynb_parser = subparser.add_parser('bkr2ipynb', help='converts Beaker notebooks to ipynb format')
    bkr2ipynb_parser.set_defaults(func=main)
    bkr2ipynb_parser.add_argument('notebooks', nargs='+',
                                  help="Beaker notebooks to be converted. Enter *.bkr in case you want to convert all notebooks at once.")
    return subparser

def run_jupyter(jupyter_commands):
    app.launch_new_instance(jupyter_commands)

def init_parser():

    parser = argparse.ArgumentParser()
    parser.add_argument('--version', action='version', version=beakerx.__version__)
    parser.set_defaults(func=run_jupyter)

    subparsers = parser.add_subparsers()
    install_subparser(subparsers)
    uninstall_subparser(subparsers)
    bkr2ipynb_subparser(subparsers)
    return parser

def parse():
    parser = init_parser()
    args, jupyter_commands = parser.parse_known_args()
    if args.func == run_jupyter:
        args.func(jupyter_commands)
    elif not jupyter_commands:
        args.func(args)
    else:
        parser.parse_args(jupyter_commands)

