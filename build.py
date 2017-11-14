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

import subprocess
import argparse
from distutils import log
import os

kernels = ['java', 'groovy', 'scala', 'kotlin', 'clojure', 'sql']


def build_beakerx():
    log.info("installing Beakerx...")

    home_dir = os.getcwd()
    os.chdir(os.path.join(home_dir, 'beakerx'))

    install_cmd = ['pip', 'install', '-e', '.', '--verbose']
    subprocess.check_call(install_cmd)

    subprocess.check_call(['beakerx-install'])

    os.chdir(home_dir)


def build_kernel(kernel_name):
    log.info("installing Beakerx kernel: " + kernel_name + " ...")

    home_dir = os.getcwd()
    os.chdir(os.path.join(home_dir, 'beakerx-' + kernel_name))

    install_cmd = ['pip', 'install', '-e', '.', '--verbose']
    subprocess.check_call(install_cmd)
    if not (kernel_name == "base" or kernel_name == "python"):
        subprocess.check_call(['beakerx-install', "--kernel=" + kernel_name])

    os.chdir(home_dir)


def build_all():
    build_beakerx()
    build_kernel('base')
    for kernel in kernels:
        build_kernel(kernel)


def make_parser():
    parser = argparse.ArgumentParser(description=__doc__)

    parser.add_argument("--all",
                        help="Build and install all Beakerx kernels",
                        action='store_true')

    parser.add_argument("--base",
                        help="Install only Beakerx",
                        action='store_true')
    parser.add_argument("--kernel",
                        help="Install Beakerx kernel. Available kernels: " + ", ".join(kernels),
                        default='')
    return parser


def build():
    try:
        parser = make_parser()
        args = parser.parse_args()
        if args.all:
            build_all()
        if args.base:
            build_beakerx()
        else:
            if args.kernel:
                if not args.kernel == 'python':
                    build_kernel('base')
                build_kernel(args.kernel)
    except KeyboardInterrupt:
        return 130
    return 0


if __name__ == "__main__":
    build()
