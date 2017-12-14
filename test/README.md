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

Running the e2e tests from its GitHub source code requires Chrome browser version 62+.

## Setting Up a Test Environment

Create a [notebook configuration file](http://jupyter-notebook.readthedocs.io/en/latest/public_server.html#prerequisite-a-notebook-configuration-file):
```
$ jupyter notebook --generate-config
```

[Prepare a hashed password:](http://jupyter-notebook.readthedocs.io/en/latest/public_server.html#preparing-a-hashed-password)
Set up password as 'beakerx'.
``` 
$ jupyter notebook password
Enter password: beakerx 
Verify password: beakerx
[NotebookPasswordApp] Wrote hashed password to /Users/you/.jupyter/jupyter_notebook_config.json
```

## Run the tests

```
./run_tests.py
```
