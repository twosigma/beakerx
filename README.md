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
development, including incompatible changes without notice.

BeakerX is the successor to the [Beaker
Notebook (source code archive)](https://github.com/twosigma/beaker-notebook-archive).

## Dependencies

* [yarn](https://yarnpkg.com/lang/en/docs/install/)
* [conda](https://conda.io/docs/install/quick.html) (any Python 3 environment should be fine, but our documentation assumes conda).

## Build and run


```
conda create -y -n beakerx python=3.5 jupyter pandas
source activate beakerx
conda install -y -c conda-forge openjdk
(cd kernel; ./gradlew --no-daemon build kernelInstall)
(cd ../beakerx/; yarn install)
pip install -e .
python -m beakerx.install --enable --prefix="${CONDA_PREFIX}"
jupyter notebook
```

## Build including C++ kernel
Make sure you have clang installed, then:
```
./gradlew --no-daemon build -DincludeCpp=true
./gradlew --no-daemon kernelInstall -DincludeCpp=true
```

## Update after Java change
The kernels are installed to run out of the repo, so just a build should update the java code.
* `./gradlew build`

## Update after JS change

* `cd beakerx/js; yarn webpack`

## Beaker Notebooks Converter
```
python -m beakerx.bkr2ipynb *.bkr
```

## Groovy with Interactive Plotting and Table Saw:
<img width="942" alt="screen shot 2016-12-20 at 11 35 17 am" src="https://cloud.githubusercontent.com/assets/963093/21402566/1680b928-c787-11e6-8acf-dc4fdeba0651.png">

## Autotranslation from Python to JavaScript:
<img width="631" alt="screen shot 2016-12-10 at 10 43 22 pm" src="https://cloud.githubusercontent.com/assets/963093/21077947/261def64-bf2a-11e6-8518-4845caf75690.png">

## Running with docker
In root project call

`gradle clean`

Go to /docker/base

`docker build . -t beakerx-base`

Move to /docker

`docker build . -t beakerx`

Now if you would like to start BeakerX execute

`docker run -p 8888:8888 beakerx `

## Contributing

We welcome developers to extend and improve BeakerX in ways that can
benefit everyone. In order for us to accept your code or pull request,
we need for you to fill out and email back to us a scan of a signed copy of the
[Contributor License Agreement](http://beakernotebook.com/cla.zip).

BeakerX uses [Google Java
style](https://google.github.io/styleguide/javaguide.html), and all
Java code needs unit tests.  For JavaScript we use [Google JS
style](https://google.github.io/styleguide/jsguide.html) with
[require](http://requirejs.org/) instead of goog.

## Attribution

Beaker contains and depends on many projects including:

The kernel is originally derived from
[lappsgrid](https://github.com/lappsgrid-incubator/jupyter-groovy-kernel),
but has been rewritten in Java and refactored and expanded.

The Java support uses Adrian Witas' org.abstractmeta.toolbox.

<a href="http://www.antlr.org/license.html">ANTLR</a> Copyright (c) 2012 Terence Parr and Sam Harwell

<a href="https://github.com/mbostock/d3/blob/master/LICENSE">d3</a> Copyright (c) 2010-2015, Michael Bostock

<a href="https://github.com/ipython/ipython/blob/master/COPYING.rst">IPython</a> Copyright (c) 2008-2014, IPython Development Team
Copyright (c) 2001-2007, Fernando Perez
Copyright (c) 2001, Janko Hauser
Copyright (c) 2001, Nathaniel Gray

<a href="https://github.com/JuliaLang/julia/blob/master/LICENSE.md">Julia</a> Copyright (c) 2009-2015: Jeff Bezanson, Stefan Karpinski, Viral B. Shah, and other contributors

<a href="http://www.scala-lang.org/license.html">Scala</a> Copyright (c) 2002-2015 EPFL
      Copyright (c) 2011-2015 Typesafe, Inc.

<a href=" http://www.h2database.com/html/license.html"> H2 database
engine</a>
This software contains unmodified binary redistributions for H2
database engine (http://www.h2database.com/), which is dual licensed
and available under the MPL 2.0 (Mozilla Public License) or under the
EPL 1.0 (Eclipse Public License).  An original copy of the license
agreement can be found at: http://www.h2database.com/html/license.html
