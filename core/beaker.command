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

self_path = sys.argv.pop(0)
os.chdir(os.path.dirname(self_path))
bin = './build/install/core/bin/core'

# Wrap this in a login shell because on Mac when we are run from our
# GUI launcher, no login shell has yet been created and so the user's
# .bash_profile hasn't been read, and that's where anaconda sets up
# the PATH.  Also, who knows what other settings they may have in
# there and want.

if sys.platform == 'darwin':
    cmd = bin
    quote = '\''
    for arg in sys.argv:
        cmd = cmd + ' ' + quote + arg + quote
    os.execvp('bash', ['bash', '-cl', cmd])

args = [bin] + sys.argv
os.execvp(bin, args)
