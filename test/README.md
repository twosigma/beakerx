<!--
    Copyright 2017 TWO SIGMA OPEN SOURCE, LLC

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

## Dependencies

Running the e2e tests from its GitHub source code requires: 
* chrome browser version v75.
* [conda](https://www.anaconda.com/download/)
* [yarn](https://yarnpkg.com/lang/en/docs/install/)
* [jupyter console](https://github.com/jupyter/jupyter_console)

## Run the tests

To run tests for jupyter lab use argument `lab`:
```
./run_tests.py lab
```
To run tests for jupyter notebook use argument `nb`:
```
./run_tests.py nb
```

By default, a notebook server runs locally at 127.0.0.1:8888 and is accessible only from localhost. 

To prepare image file as expected result:
 - use function `createTableImage()` instead of `checkImageData()` on the same code line of test script
 - run the tests as usual