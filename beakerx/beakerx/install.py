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

import argparse
import beakerx
import os
import shutil
import subprocess
import sys

def install_kernels(package_dir):
    kernels_dir = os.path.join(package_dir, "static", "kernel")
    expanded_kernels_dir = os.path.join(package_dir, "static", "expanded_kernel")
    def install_kernel(kernel_dir):
        kernel_name = os.path.basename(kernel_dir)
        sep = ';' if sys.platform == 'win32' else ':'
        classpath = (os.path.abspath(os.path.join(kernels_dir, 'base', 'lib', '*')) + sep +
                     os.path.abspath(os.path.join(kernel_dir, 'lib', '*')))
        classpath = classpath.replace('\\', '/')
        spec_file_name = os.path.join(kernel_dir, 'kernel.json')
        with open(spec_file_name, 'r') as spec_file:
            spec_content = spec_file.read()
        spec_content = spec_content.replace('__PATH__', classpath)
        expanded_dir = os.path.join(expanded_kernels_dir, kernel_name)
        shutil.rmtree(expanded_dir, ignore_errors=True)
        os.makedirs(expanded_dir)
        expanded_spec_file_name = os.path.join(expanded_dir, 'kernel.json')
        with open(expanded_spec_file_name, "w") as expanded_spec_file:
            expanded_spec_file.write(spec_content)
        install_cmd = ['jupyter', 'kernelspec', 'install', '--sys-prefix',
                       '--replace', '--name', kernel_name, expanded_dir]
        subprocess.run(install_cmd, check=True)
    for dir, subdirs, files in os.walk(kernels_dir):
        if 'kernel.json' in files:
            install_kernel(dir)
        else:
            continue
        


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--prefix",
                        help="location of the environment to install into")
    args = parser.parse_args()
    install_kernels(os.path.dirname(beakerx.__file__))

if __name__ == "__main__":
    main()
