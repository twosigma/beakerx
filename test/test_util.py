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

import os
import re
import signal
from subprocess import check_output, CalledProcessError

def kill_processes(name):
    try:
        pidlist = map(int, check_output(['pgrep', '-f', name]).split())
    except CalledProcessError:
        pidlist = []
    for pid in pidlist:
        os.kill(pid, signal.SIGKILL)

def set_cur_app(file_name, cur_app):
    tmpConfig = open(file_name, 'w')
    tmpConfig.write("exports.config = { cur_app : '%s' }; " %cur_app)
    tmpConfig.close()

def hasCondaPackage(package_name):
    try:
        output = check_output(['conda', 'list']).decode('utf-8')
        result = re.search(package_name, output)
    except CalledProcessError:
        result = None
    return result is not None
