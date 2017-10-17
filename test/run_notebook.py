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
import os

here = os.path.abspath(os.path.dirname(__file__))
beakerx_dir = os.path.abspath(os.path.join(here, ".."))

# start jupyter notebook
nb_command = 'source activate beakerx & jupyter notebook --no-browser --notebook-dir="%s"' % beakerx_dir
beakerx = subprocess.Popen(nb_command, shell=True, executable="/bin/bash", preexec_fn=os.setsid, stderr=subprocess.STDOUT, stdout=subprocess.PIPE)
# wait for notebook server to start up
while 1:
    line = beakerx.stdout.readline().decode('utf-8').strip()
    if not line:
        continue
    print(line)
    if 'The Jupyter Notebook is running' in line: 
        break
