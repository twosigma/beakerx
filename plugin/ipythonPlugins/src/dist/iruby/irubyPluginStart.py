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
from IPython import start_ipython
from subprocess import check_output

ipyversion = check_output(["ipython", "ipython", "--version"])
if ipyversion[0] == "4":
  sys.exit(start_ipython(["notebook", "--config=" + os.environ["beaker_ipython_notebook_config"]]))
else:
  sys.exit(start_ipython(["notebook", "--ipython-dir=" + os.environ["beaker_tmp_dir"], "--profile", "beaker_backend_IRuby"]))
