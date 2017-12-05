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

<img width="900" alt="banner" src="https://user-images.githubusercontent.com/963093/30990429-3319ede6-a46f-11e7-9540-41da66ec5275.png">

# BeakerX: Beaker extensions for Jupyter

[![Build Status](http://ec2-54-175-192-115.compute-1.amazonaws.com:8080/buildStatus/icon?job=BeakerX_master)](http://ec2-54-175-192-115.compute-1.amazonaws.com:8080/job/BeakerX_master)
[![Gitter chat](https://badges.gitter.im/twosigma/beakerx.png)](https://gitter.im/twosigma/beakerx)
[![Release](https://jitpack.io/v/twosigma/beakerx.svg)](https://jitpack.io/#twosigma/beakerx)
[![NPM version](https://badge.fury.io/js/beakerx.svg)](http://badge.fury.io/js/beakerx)
[![PyPI Version](https://badge.fury.io/py/beakerx.svg)](http://badge.fury.io/py/beakerx)
[![Anaconda-Server Badge](https://anaconda.org/conda-forge/beakerx/badges/version.svg)](https://anaconda.org/conda-forge/beakerx)
[![Binder](https://mybinder.org/badge.svg)](https://mybinder.org/v2/gh/twosigma/beakerx/0.9.1?filepath=StartHere.ipynb)
[![Docker Hub](https://images.microbadger.com/badges/version/beakerx/beakerx.svg)](https://hub.docker.com/r/beakerx/beakerx/)

BeakerX is a collection of JVM kernels and interactive widgets for
plotting, tables, autotranslation, and other extensions to Jupyter
Notebook.  BeakerX is in beta and under active development.

The [documentation](https://github.com/twosigma/beakerx/blob/master/StartHere.ipynb) consists of tutorial notebooks on GitHub.
You can try it in the cloud for free with [Binder](http://mybinder.org/repo/twosigma/beakerx).

BeakerX is the successor to the [Beaker Notebook (source code
archive)](https://github.com/twosigma/beaker-notebook-archive).  It
comes from [Two Sigma Open
Source](http://opensource.twosigma.com/). Yes we are
[hiring](https://www.twosigma.com/careers).

This README is for developers.  Users should see the
[documentation](http://beakerx.com/documentation) on the homepage for
how to install and run BeakerX.



### Dependencies:

* [conda](https://www.anaconda.com/download/)
* [yarn](https://yarnpkg.com/lang/en/docs/install/)

### Build and Install

```
conda create -y -n beakerx 'python>=3' nodejs pandas openjdk maven
source activate beakerx
conda install -y -c conda-forge ipywidgets
(cd beakerx; pip install -e . --verbose)
beakerx-install
```

### Build and Install for Lab

```
conda create -y -n labx 'python>=3' nodejs pandas openjdk maven
source activate labx
conda install -y -c conda-forge jupyterlab
(cd beakerx; pip install -e . --verbose)
beakerx-install
jupyter labextension install @jupyter-widgets/jupyterlab-manager
(cd js/lab; jupyter labextension install .)
```

### Update after Java change

The kernels are installed to run out of the repo, so just a local
build should suffice:

```
(cd kernel; ./gradlew build)
```

### Update after JS change

The notebook extensions are installed to run out of the repo, so just
a local build should suffice:

```
(cd js/notebook; yarn install)
```

## Groovy with Interactive Plotting and Tables:
<img width="900" alt="screen shot" src="https://user-images.githubusercontent.com/963093/28300136-585f9f7c-6b4b-11e7-8827-b5807d3fc9a8.png">

### Autotranslation from Python to JavaScript

<img width="900" alt="screen shot" src="https://cloud.githubusercontent.com/assets/963093/21077947/261def64-bf2a-11e6-8518-4845caf75690.png">

## Running with Docker

```
docker run -p 8888:8888 beakerx/beakerx
```

## Contributing

We welcome developers to extend and improve BeakerX in ways that can
benefit everyone. In order for us to accept your code or pull request,
we need for you to fill out and email back to us a scan of a signed copy of the
[Contributor License Agreement](http://beakernotebook.com/cla.zip).

BeakerX uses [Google Java
style](https://google.github.io/styleguide/javaguide.html), and all
Java code needs unit tests.  For JavaScript we use [Google JS
style](https://google.github.io/styleguide/jsguide.html) with
[require](http://requirejs.org/) instead of goog.  All files should
end with newline and have a copyright and license banner.


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
