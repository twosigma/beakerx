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

'''Installs the beakerx kernels.'''

import argparse
import os
import pkg_resources
import subprocess
import sys
import tempfile


def _all_kernels():
    kernels = pkg_resources.resource_listdir(
        'beakerx', os.path.join('static', 'kernel'))
    return [kernel for kernel in kernels if kernel != 'base']


def _classpath_for(kernel):
    return pkg_resources.resource_filename(
        'beakerx', os.path.join('static', 'kernel', kernel, 'lib', '*'))


def _install_kernels():
    base_classpath = _classpath_for('base')
    kernels_dir = os.path.join(sys.prefix, 'share', 'jupyter', 'kernels')

    for kernel in _all_kernels():
        kernel_classpath = _classpath_for(kernel)
        classpath = os.pathsep.join([base_classpath, kernel_classpath])
        # TODO: replace with string.Template, though this requires the
        # developer install to change too, so not doing right now.
        template = pkg_resources.resource_string(
            'beakerx', os.path.join('static', 'kernel', kernel, 'kernel.json'))
        contents = template.decode().replace('__PATH__', classpath)
        with tempfile.TemporaryDirectory() as tmpdir:
            with open(os.path.join(tmpdir, 'kernel.json'), 'w') as f:
                f.write(contents)
            install_cmd = [
                'jupyter', 'kernelspec', 'install',
                '--sys-prefix', '--replace',
                '--name', kernel, tmpdir
            ]
            subprocess.check_call(install_cmd)

    return 0


def make_parser():
    parser = argparse.ArgumentParser(description=__doc__)
    return parser


def install_kernels():
    try:
        parser = make_parser()
        args = parser.parse_args()
        return _install_kernels()
    except KeyboardInterrupt:
        return 130


if __name__ == "__main__":
    install_kernels()
