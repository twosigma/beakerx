#!/usr/bin/python
#
# Copyright 2014 TWO SIGMA OPEN SOURCE, LLC
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
import sys

def handle_java_home():
    if sys.platform == 'darwin':
        jvms = os.listdir('/Library/Java/JavaVirtualMachines/')
        if len(jvms) == 0:
            os.environ['JAVA_HOME'] = '/Library/Internet Plug-Ins/JavaAppletPlugin.plugin/Contents/Home'
        return
    return

self_path = sys.argv.pop(0)
os.chdir(os.path.dirname(self_path))
os.environ["DYLD_LIBRARY_PATH"] = './nginx/bin'
handle_java_home()
bin = './build/install/core/bin/core'
args = [bin] + sys.argv
os.execvp(bin, args)
