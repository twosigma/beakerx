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

[![Build Status](http://ec2-54-175-192-115.compute-1.amazonaws.com:8080/buildStatus/icon?job=BeakerX_master)](http://ec2-54-175-192-115.compute-1.amazonaws.com:8080/job/BeakerX_master)
[![Gitter chat](https://badges.gitter.im/twosigma/beakerx.png)](https://gitter.im/twosigma/beakerx)
[![Release](https://jitpack.io/v/twosigma/beakerx.svg)](https://jitpack.io/#twosigma/beakerx)
[![NPM version](https://badge.fury.io/js/beakerx.svg)](http://badge.fury.io/js/beakerx)
[![PyPI Version](https://badge.fury.io/py/beakerx.svg)](http://badge.fury.io/py/beakerx)
[![Anaconda-Server Badge](https://anaconda.org/conda-forge/beakerx/badges/version.svg)](https://anaconda.org/conda-forge/beakerx)
[![Binder](https://mybinder.org/badge.svg)](https://mybinder.org/v2/gh/twosigma/beakerx/1.2.0?filepath=StartHere.ipynb)

BeakerX is a collection of JVM kernels and interactive widgets for
plotting, tables, autotranslation, and other extensions to Jupyter
Notebook.

The [documentation](https://github.com/twosigma/beakerx/blob/master/StartHere.ipynb) consists of tutorial notebooks on GitHub.
You can try it in the cloud for free with [Binder](https://mybinder.org/v2/gh/twosigma/beakerx/1.2.0?filepath=StartHere.ipynb).
And here is the [cheatsheet](https://github.com/twosigma/beakerx/blob/master/doc/Cheatsheet.pdf).

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

### Build and Install (linux and mac)

```
conda env create -n beakerx -f configuration.yml
conda activate beakerx # For conda versions prior to 4.6, run: source activate beakerx
(cd beakerx; pip install -r requirements.txt --verbose)
beakerx install
beakerx_databrowser install
```

### Build and Install (win)
```
conda env create -n beakerx -f configuration.yml
activate beakerx
cd beakerx
pip install -r requirements.txt --verbose
cd ..
beakerx install
beakerx_databrowser install
```

### Build and Install for Jupyter Lab

```
conda env create -n labx -f configuration.yml
conda activate labx # For conda versions prior to 4.6, run: source activate labx
conda install -y -c conda-forge jupyterlab
(cd beakerx; pip install -r requirements.txt --verbose)
beakerx install
jupyter labextension install @jupyter-widgets/jupyterlab-manager
(cd js/lab; jupyter labextension install .)
```

### Running with Docker

```
docker run -p 8888:8888 beakerx/beakerx
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

### Run TypeScript Unit Tests

The Java and TypeScript unit tests are run with every build. See [test/README.md](test/README.md) for how to run the e2e tests.

### Run Python Unit Tests
```
(cd beakerx; python -m unittest)
```

## Groovy with Interactive Plotting:
<img width="900" alt="screen shot" src="https://user-images.githubusercontent.com/963093/28300136-585f9f7c-6b4b-11e7-8827-b5807d3fc9a8.png">

## Autotranslation from Python to JavaScript and D3

<img width="900" alt="screen shot" src="https://cloud.githubusercontent.com/assets/963093/21077947/261def64-bf2a-11e6-8518-4845caf75690.png">

## Interactive Tables

<img width="900" alt="screen shot" src="https://user-images.githubusercontent.com/963093/38704584-d1fc16d8-3e74-11e8-95d5-c916bd44d10b.png">

## Table Display from conda package
### notebook
```
conda create --name beakerx_td
source activate beakerx_td
conda install beakerx_tabledisplay
```

### lab
```
conda create --name labx_td
source activate labx_td
conda install -y -c conda-forge jupyterlab
conda install beakerx_tabledisplay
beakerx_tabledisplay install --lab
```

## Architecture and Code Overview

BeakerX is a collection of kernels and extensions for Jupyter.
The code is organized into subdirectories as follows:

* [beakerx](beakerx) The Python packages.  The main beakerx package has:

  * a customized KernelSpec to allow BeakerX to configure the JVMs
    that run the kernels,

  * a server extension for the javadoc, settings, version, and
    autotranslation endpoints,
  
  * the beakerx command line program, which has the bkr2ipynb
    converter, the py4j server, utilities, install, and uninstall
    functions.
  
  * the Python API for the runtime (tables, plots, easyform),
    including automatically installing a displayer for pandas tables,
    and autotranslation;
  
  * the nbextension webpack (compiled JavaScript, TypeScript, CSS,
    fonts, images); and

  * the compiled Java JARs of each of the kernels, and a directory of
    shared JARs.

  There is a separate python package (beakerx_magics) for the
  `%%groovy` magic so it can be loaded *without* loading the regular
  beakerx package (which would turn on display of pandas tables with
  our table widget).

  BeakerX [configures ipython](beakerx/beakerx/install.py#L140) to
  automatically load the magics in the beakerx_magics package,
  `%load_ext` is not required.

  The [groovy magic](beakerx/beakerx_magics/kernel_magic.py) uses the standard Jupyter API,
  jupyter_client.manager.KernelManager to start the kernel.
  It then proxies Comm into the inner kernel.
  
  This package also has the py4j support for the `%%python` magic.  In
  order for the JVM kernels to be able to start Jupyter kernels they
  need to be able to call into Python.  There is a `beakerx
  py4j_server` subcommand for this purpose (for internal use, not for
  the user).  It calls into the groovy magic with its Comm proxy,
  implemented in Python.

  BeakerX implements autotranslation with a server extension and
  metaprogramming glue in each language.  The glue makes the `beakerx`
  object into a proxy for RPC calls to the server extension, using
  JSON serialization.  For JavaScript, the proxy object uses Comm to
  reach the kernel, which forwards to the server extension.

  The autotranslation server has a separate thread of control from
  Jupyter, and it manages its own port, which it protects by accepting
  only local connections and requiring a secure password (which is
  passed to the kernels via an environment variable).  The extra
  thread is necessary to avoid deadlock in tornado.  This might be
  better done with a
  [queue](http://www.tornadoweb.org/en/stable/queues.html), as
  explained in
  [#5039](https://github.com/twosigma/beakerx/issues/5039).

  See [#7577](https://github.com/twosigma/beakerx/issues/7577) for the
  plan to improve this architecture with shared memory and Apache
  Arrow.

* [doc](doc) Documentation consisting of executable tutorial
  notebooks.  [StartHere.ipynb](StartHere.ipynb) at the top level
  links to these and is the intended way to navigate them.  There is a
  subdirectory for each language.

* [docker](docker) configuration files for creating the Docker image.
  There is a subdirectory [docker/base](docker/base) for an image with
  BeakerX's dependencies (the Ubuntu and conda packages).  The main
  image is built by compiling BeakerX and installing BeakerX in the
  base image.

* [js](js) There are two subdirectories of JavaScript and TypeScript,
  [js/lab](js/lab) and [js/notebook](js/notebook).  New code is being
  written in TypeScript.

  The lab subdirectory has the extension for Jupyter Lab (distributed
  by npm).  Notebook has two extensions, one for the widgets (which
  are included in Lab as well, and are also separately distributed
  with npm for embedded applications such as nbviewer), and one for
  the notebook application.  This adds a tab to the tree view with our
  options panel.

  And for regular notebook pages the extension handles: running
  initialization cells, publication, autotranslation, the getCodeCells
  and runByTag APIs, callbacks for table and plot actions, UI
  customizations such as changing the fonts, allowing wide code cells,
  and disabling autosave.

* [kernel](kernel) The Java implementation of the kernels is here.
  The main directory is [kernel/base](kernel/base) which has generic
  code for all the languages.  The base kernel has classes for
  Jupyter's Comm protocol (a layer over ZMQ), magics, the classpath
  (including loading from maven), and the kernel parts of the widget
  APIs.

  There is also a subdirectory for each language which has the
  evaluator for that language. Scala has wrappers for the widgets
  so they have native types.

* [test](test) The e2e tests, which are made with
  [webdriver](http://webdriver.io/) (selenium, chromedriver, jasmine).

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## Releasing

See [RELEASE.md](RELEASE.md).

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
