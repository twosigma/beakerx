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

# Build and install groovy kernel
This installs the kernel for groovy into the current conda environment.
* `gradle kernelInstall`

# Update groovy kernel
* `gradle build`


<img width="942" alt="screen shot 2016-12-20 at 11 35 17 am" src="https://cloud.githubusercontent.com/assets/963093/21402566/1680b928-c787-11e6-8acf-dc4fdeba0651.png">

# install notebook extension

* `gradle environmentVariables`
* Then set environment variable PYTHONPATH, see message after `gradle environmentVariables`

# update notebook extension

* Nothing to do because the extension links to beaker source files
