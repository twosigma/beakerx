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
import subprocess
import time
import urllib2

# make sure everything is properly installed
os.system("npm install")
os.chdir("./node_modules/protractor/bin")
os.system("node webdriver-manager update");

with open(os.devnull, "w") as fnull:
    webcontrol = subprocess.Popen(["node", "webdriver-manager", "start"], stdout=fnull, stderr=fnull);

os.chdir("../../../../core")

beaker = subprocess.Popen(["beaker.command.bat", "-open-browser", "false"], stdout=subprocess.PIPE)

for line in iter(beaker.stdout.readline, ''):
    print(">>>" + line.strip())
    if line.startswith('Beaker listening on'):
        break

os.chdir("../test/node_modules/protractor/bin")
result = os.system("node protractor ../../../protractorConf.js");
result2 = 1
if not result:
    result2 = os.system("node protractor ../../../protractorWithoutRestartBrowserConf.js")
if not result2:
    result2 = os.system("node protractor ../../../protractorOneInstanceConf.js")

# Skipping memory tests because they hang on Jenkins
#os.system("node ../../../memory-tests.js")

beaker.terminate()

webcontrol.terminate();
response = urllib2.urlopen('http://localhost:4444/selenium-server/driver/?cmd=shutDownSeleniumServer')
html = response.read()

if result2:
    sys.exit(20)
