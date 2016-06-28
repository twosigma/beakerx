<!--
    Copyright 2014 TWO SIGMA OPEN SOURCE, LLC

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

           http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
-->

Beaker Testing
==========
Enclosed are a set of tests powered by protractor.

### Installing

* just execute './runner'

### Running the tests

* just execute './runner'

### Implementing new tests
* Create a new test file in tests/ folder
* Add the new file path to protractorConf.js

### Manual run of the tests (for new test development)

* start beaker in one shell
* run './node_modules/protractor/bin/webdriver-manager start' in a second shell
* run './node_modules/protractor/bin/protractor protractorConf.js ' in a third shell


### Manual run of the tests on a Docker container

 To run tests: sudo docker run -t -i ubuntu/beaker bash
 and execute in a console:

*  sudo apt-get install xvfb
*  Xvfb :99 &
*  export DISPLAY=:99
*  sudo apt-get install firefox
*  curl -Lo chrome.zip https://download-chromium.appspot.com/dl/Linux_x64 && unzip chrome.zip
*  curl -Lo chromedriver.zip http://chromedriver.storage.googleapis.com/2.16/chromedriver_linux64.zip && unzip chromedriver.zip
*  export PATH=$PATH:/home/beaker/src:/home/beaker/src/chrome-linux
*  gradle check


### Check the tests

*  after executing tests ./test/screenshots/ directory contains screenshots of tests

### Test of downloaded file
* ./test/tmp this is a directory for downloaded files
* ./test/helper.js this is a script to setup firefox profile  