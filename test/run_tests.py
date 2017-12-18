#!/usr/bin/env python
#
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
import sys
import subprocess
import signal
import test_console

here = os.path.abspath(os.path.dirname(__file__))
beakerx_dir = os.path.abspath(os.path.join(here, ".."))
test_dir = here

# update environment
subprocess.call("yarn install", shell=True)
subprocess.call("yarn run setup-server", shell=True)
subprocess.call("yarn run wdio-config", shell=True)

# start selenium server
with open(os.devnull, "w") as fnull:
    webcontrol = subprocess.Popen(["yarn", "run", "start-server"], stdout=subprocess.PIPE, stderr=fnull, preexec_fn=os.setsid);
    # wait for selenium server to start up
    while 1:
        line = webcontrol.stdout.readline().decode('utf-8').strip()
        if not line:
            continue
        print(line)
        if 'Selenium started' in line:
            break

# start jupyter notebook
nb_command = 'jupyter notebook --no-browser --notebook-dir="%s" --NotebookApp.token=""' % beakerx_dir
beakerx = subprocess.Popen(nb_command, shell=True, executable="/bin/bash", preexec_fn=os.setsid, stderr=subprocess.STDOUT, stdout=subprocess.PIPE)
# wait for notebook server to start up
while 1:
    line = beakerx.stdout.readline().decode('utf-8').strip()
    if not line:
        continue
    print(line)
    if 'The Jupyter Notebook is running' in line:
        break

#start webdriverio
result=subprocess.call("yarn run test", shell=True)

# Send the signal to all the process groups
os.killpg(os.getpgid(beakerx.pid), signal.SIGKILL)
os.killpg(os.getpgid(webcontrol.pid), signal.SIGKILL)

if not result:
    result = test_console.test_lsmagic()

if result:
    sys.exit(20)
