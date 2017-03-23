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

# BeakerX: Beaker extensions for Jupyter

## Dependencies

* oracle Java8 JDK, gradle
* npm, bower, webpack
* conda

```
conda create -y -n beakerx python=3.5 jupyter pandas
source activate beakerx
(cd kernel/groovy; gradle --no-daemon kernelInstall)
(cd kernel/scala; gradle --no-daemon kernelInstall)
(cd kernel/java; gradle --no-daemon kernelInstall)
gradle --no-daemon environmentVariables # set PYTHONPATH as directed
jupyter notebook
```

## Update after java change
Ther kernels are installed to run out of the repo, so just a build should update the java code.
* `gradle build`

## update after JS change

* `cd beaker-nbextension/js; webpack`

If webpack gives an error like

> ERROR in jquery-ui (bower component) Module not found: Error: Cannot resolve 'file' or 'directory' ./ui/jquery-ui.js

Then run `rm -rf bower_components && bower install`.


## Groovy with Interactive Plotting and Table Saw:
<img width="942" alt="screen shot 2016-12-20 at 11 35 17 am" src="https://cloud.githubusercontent.com/assets/963093/21402566/1680b928-c787-11e6-8acf-dc4fdeba0651.png">

## Autotranslation from Python to JavaScript:
<img width="631" alt="screen shot 2016-12-10 at 10 43 22 pm" src="https://cloud.githubusercontent.com/assets/963093/21077947/261def64-bf2a-11e6-8518-4845caf75690.png">

## Attribution

The kernel is originally derived from https://github.com/lappsgrid-incubator/jupyter-groovy-kernel, but has been rewritten in Java and refactored.
The Java support uses Adrian Witas org.abstractmeta.toolbox.
