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

<img width="900" alt="banner" src="https://user-images.githubusercontent.com/963093/34594978-31d70312-f1a2-11e7-861c-705a9e932c3c.png">

# BeakerX: Beaker extensions for Jupyter

<!--
[![Build Status](http://ec2-54-175-192-115.compute-1.amazonaws.com:8080/buildStatus/icon?job=BeakerX_master)](http://ec2-54-175-192-115.compute-1.amazonaws.com:8080/job/BeakerX_master)
[![Gitter chat](https://badges.gitter.im/twosigma/beakerx.png)](https://gitter.im/twosigma/beakerx)
[![Release](https://jitpack.io/v/twosigma/beakerx.svg)](https://jitpack.io/#twosigma/beakerx)
[![NPM version](https://badge.fury.io/js/beakerx.svg)](http://badge.fury.io/js/beakerx)
[![PyPI Version](https://badge.fury.io/py/beakerx.svg)](http://badge.fury.io/py/beakerx)
[![Anaconda-Server Badge](https://anaconda.org/conda-forge/beakerx/badges/version.svg)](https://anaconda.org/conda-forge/beakerx)
[![Binder](https://mybinder.org/badge.svg)](https://mybinder.org/v2/gh/twosigma/beakerx/1.2.0?filepath=StartHere.ipynb)
-->

BeakerX is a collection of JVM kernels and interactive widgets for
plotting, tables, autotranslation, and other extensions to Jupyter
Notebook and Jupyter Lab version 1.2.x and 2.x.

Version 2.x of BeakerX improves on the original solution architecture by providing
independent modules that end-users can install to better tune the platform.

The [documentation](https://github.com/twosigma/beakerx/blob/master/StartHere.ipynb)
consists of tutorial notebooks on GitHub
and a [cheatsheet](https://github.com/twosigma/beakerx/blob/master/doc/Cheatsheet.pdf).


BeakerX is the successor to the [Beaker Notebook (source code
archive)](https://github.com/twosigma/beaker-notebook-archive).  It
comes from [Two Sigma Open Source](http://opensource.twosigma.com/). Yes we are
[hiring](https://www.twosigma.com/careers).

## How to use

To install BeakerX and all kernels use:
```
conda install -c beakerx beakerx_all
```

To install only part of the solution choose which kernels to install:
```
conda install -c beakerx beakerx_kernel_groovy
conda install -c beakerx beakerx_kernel_java
conda install -c beakerx beakerx_kernel_scala
conda install -c beakerx beakerx_kernel_sql
conda install -c beakerx beakerx_kernel_clojure
conda install -c beakerx beakerx_kernel_kotlin
```
And then install optional packages:
```
conda install -c beakerx beakerx_kernel_autotranslation
conda install -c beakerx beakerx_tabledisplay
conda install -c beakerx beakerx_widgets
```

To install BeakerX extensions inside Jupyter Lab 1.2 use
```
// ensure you have yarn, nodejs and npm installed
conda install -c conda-forge jupyterlab=1.2
conda install -c beakerx beakerx_all
```

To install BeakerX extensions inside Jupyter Lab 2.x use
```
// ensure you have yarn, nodejs and npm installed
conda install -c conda-forge jupyterlab=2
conda install -c beakerx beakerx_all
```

## Features

### JVM kernels with Interactive Plotting:
<img width="700" alt="screen shot" src="https://user-images.githubusercontent.com/963093/28300136-585f9f7c-6b4b-11e7-8827-b5807d3fc9a8.png">
This feature requires all optional packages.

### Autotranslation from Python to JavaScript and D3
<img width="700" alt="screen shot" src="https://cloud.githubusercontent.com/assets/963093/21077947/261def64-bf2a-11e6-8518-4845caf75690.png">
This feature requires beakerx_kernel_autotranslation package.

### Interactive Tables
<img width="700" alt="screen shot" src="https://user-images.githubusercontent.com/963093/38704584-d1fc16d8-3e74-11e8-95d5-c916bd44d10b.png">
This feature requires beakerx_tabledisplay package.

## FAQs

See [FAQ.md](FAQ.md).

## Attribution

BeakerX contains and depends on many projects including:

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

The table of contents and init cells extensions come from:
<a href="https://github.com/ipython-contrib/jupyter_contrib_nbextensions/blob/master/COPYING.rst">IPython-contrib</a> Copyright (c) 2013-2015, IPython-contrib Developers

<a href="http://www.scala-lang.org/license.html">Scala</a> Copyright (c) 2002-2015 EPFL
      Copyright (c) 2011-2015 Typesafe, Inc.

[Guava](https://github.com/google/guava)  Copyright (C) 2012 The Guava Authors

[Apache Spark](https://github.com/apache/spark) Copyright (C) 2014 and onwards The Apache Software Foundation.

<a href=" http://www.h2database.com/html/license.html"> H2 database
engine</a>
This software contains unmodified binary redistributions for H2
database engine (http://www.h2database.com/), which is dual licensed
and available under the MPL 2.0 (Mozilla Public License) or under the
EPL 1.0 (Eclipse Public License).  An original copy of the license
agreement can be found at: http://www.h2database.com/html/license.html
