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

### Dependencies:

* [conda](https://www.anaconda.com/download/)
* [yarn](https://yarnpkg.com/lang/en/docs/install/)

### Related repositories

* [kernel base](https://github.com/twosigma/beakerx_kernel_base)
* [clojure kernel](https://github.com/twosigma/beakerx_kernel_clojure)
* [groovy kernel](https://github.com/twosigma/beakerx_kernel_groovy)
* [java kernel](https://github.com/twosigma/beakerx_kernel_java)
* [kotlin kernel](https://github.com/twosigma/beakerx_kernel_kotlin)
* [scala kernel](https://github.com/twosigma/beakerx_kernel_scala)
* [sql kernel](https://github.com/twosigma/beakerx_kernel_sql)
* [autotranslation](https://github.com/twosigma/beakerx_kernel_autotranslation)
* [frontend base](https://github.com/twosigma/beakerx_base)
* [tabledisplay widget](https://github.com/twosigma/beakerx_tabledisplay)
* [widgets](https://github.com/twosigma/beakerx_widgets)

### Build and Install for Notebook (linux and mac)

```
cd ./beakerx-dist
conda env create -n beakerx -f configuration.yml
conda activate beakerx
conda install -y beakerx_all
cd  ..
```

### Running with Docker

```
docker run -p 8888:8888 beakerx/beakerx
```

<!--
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
-->

## Architecture and Code Overview

TODO update this

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
