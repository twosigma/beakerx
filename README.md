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

[![Build Status](http://ec2-54-175-192-115.compute-1.amazonaws.com:8080/buildStatus/icon?job=BeakerX%20master)](http://ec2-54-175-192-115.compute-1.amazonaws.com:8080/job/BeakerX%20master)
[![Gitter chat](https://badges.gitter.im/twosigma/beakerx.png)](https://gitter.im/twosigma/beakerx)

BeakerX is a collection of JVM kernels with widgets, plotting, tables,
autotranslation, and other extensions to the Jupyter Notebook and
Jupyter Lab.  BeakerX is in alpha, with major features still under
development and refactorings and incompatible changes.  This is true
despite our previous stable releases up to version 1.7.1 because
BeakerX has a whole new architecture based on Jupyter, whereas the
previous releases were an independent application, Beaker Notebook.
You could think of BeakerX as Beaker Notebook 2.0, and this transition
is not yet complete.  Feedback and advice on how to best complete this
process is very welcome.

## Dependencies

* oracle Java8 JDK
* npm, bower, webpack
* conda

## Build and run


```
conda create -y -n beakerx python=3.5 jupyter pandas
source activate beakerx
./gradlew --no-daemon build
./gradlew --no-daemon kernelInstall
./gradlew --no-daemon :beakerx:install
pip install -e .
python -m beaker.install --enable --prefix="${CONDA_PREFIX}"
jupyter notebook
```

## Update after Java change
The kernels are installed to run out of the repo, so just a build should update the java code.
* `./gradlew build`

## Update after JS change

* `cd beakerx/js; webpack`

## Beaker Notebooks Converter
```
python -m bkr2ipynb *.bkr
```

## Groovy with Interactive Plotting and Table Saw:
<img width="942" alt="screen shot 2016-12-20 at 11 35 17 am" src="https://cloud.githubusercontent.com/assets/963093/21402566/1680b928-c787-11e6-8acf-dc4fdeba0651.png">

## Autotranslation from Python to JavaScript:
<img width="631" alt="screen shot 2016-12-10 at 10 43 22 pm" src="https://cloud.githubusercontent.com/assets/963093/21077947/261def64-bf2a-11e6-8518-4845caf75690.png">

## Contributing

We welcome developers to extend and improve BeakerX in ways that can
benefit everyone. In order for us to accept your code or pull request,
we need for you to fill out and email back to us a scan of a signed copy of the
[Contributor License Agreement](http://beakernotebook.com/cla.zip).

## Attribution

The kernel is originally derived from https://github.com/lappsgrid-incubator/jupyter-groovy-kernel, but has been rewritten in Java and refactored and expanded.
The Java support uses Adrian Witas' org.abstractmeta.toolbox.
