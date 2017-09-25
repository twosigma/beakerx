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

'''Installs BeakerX into a Jupyter and Python environment.'''

import subprocess
import sys

def _install_nbextension():
    if sys.platform == 'win32':
        subprocess.check_call(["jupyter", "nbextension", "install", "beakerx", "--py", "--sys-prefix"])
    else:
        subprocess.check_call(["jupyter", "nbextension", "install", "beakerx", "--py", "--symlink", "--sys-prefix"])

    subprocess.check_call(["jupyter", "nbextension", "enable", "beakerx", "--py", "--sys-prefix"])

def install():
    try:
        _install_nbextension()
    except KeyboardInterrupt:
        return 130
    return 0

if __name__ == "__main__":
    install()
