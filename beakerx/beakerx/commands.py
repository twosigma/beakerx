import argparse
import sys
import subprocess
import beakerx
from .install import install, uninstall
from .bkr2ipynb import main

def install_subparser(subparser):
    install_parser = subparser.add_parser('install', help='installs beakerx extension')
    install_parser.set_defaults(func = install)
    install_parser.add_argument("--prefix",
                                help="location of the environment to install into",
                                default=sys.prefix)
    return subparser

def uninstall_subparser(subparser):
    uninstall_parser = subparser.add_parser('uninstall', help='uninstalls beakerx extension')
    uninstall_parser.set_defaults(func=lambda x : uninstall())
    return subparser

def bkr2ipynb_subparser(subparser):
    bkr2ipynb_parser = subparser.add_parser('bkr2ipynb', help='converts beaker notebooks to ipynb format')
    bkr2ipynb_parser.set_defaults(func=main)
    bkr2ipynb_parser.add_argument('notebooks', nargs='+',
                                  help="beaker notebooks to be converted. Enter *.bkr in case you want to convert all notebooks at once.")
    return subparser

def init_parser():
    version = 'beakerx %s' % (beakerx.__version__)

    parser = argparse.ArgumentParser()
    parser.add_argument('--version', action='version', version=version)
    parser.set_defaults(func=lambda x : subprocess.check_call(["jupyter", "notebook"]))

    subparsers = parser.add_subparsers()
    install_subparser(subparsers)
    uninstall_subparser(subparsers)
    bkr2ipynb_subparser(subparsers)
    return parser

def parse():
    parser = init_parser()
    args = parser.parse_args()
    args.func(args)