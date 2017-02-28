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

# Build and install groovy kernel (gradle)
* `cd C:\beaker-kernel\Groovy`
* `gradle kernelInstall`

# Update groovy kernel (gradle)
* `cd C:\beaker-kernel\Groovy`
* `gradle build`
* Nothing more to to. "kernel.json" point to maven target jar file. May be even You do not need restart jupyter.


# Build and install groovy kernel (manual on Windows)
* Get the `mvn` command from `https://maven.apache.org/download.cgi`
* `C:\WorkspaceBeakerKernel\Groovy`
* `gradle build`
* `mkdir C:\WorkspaceBeakerKernel\Groovier\target\Groovier`
* `C:\WorkspaceBeakerKernel\Groovier>copy kernel.json C:\WorkspaceBeakerKernel\Groovier\target\Groovier`
* Edit "C:\WorkspaceBeakerKernel\Groovier\target\Groovier\kernel.json" like :
  "argv": [ "java", "-jar", "__PATH__", "{connection_file}" ] => 
  "argv": [ "java", "-jar", "C:/WorkspaceBeakerKernel/Groovier/target/Groovier-1.0.0.jar", "{connection_file}" ]
  
  If You want diferent displaying name in the jupyter notebook, then:
  "display_name": "Groovy" =>
  "display_name": "Groovy JAVA"
* Run this command, parameter "XXX" -- is the unique ID name for jupyter kernel, You can add new kernel or owerride old one. 
  `jupyter kernelspec install --user --replace --name XXX C:\WorkspaceBeakerKernel\Groovier\target\Groovier`
  This commands actually creates folder in "C:\Users\konst\AppData\Roaming\jupyter\kernels\XXX" and puts "kernel.json" in it.
  For MAC this folder like "/Users/ignite/Library/Jupyter/kernels/XXX".
  XXX -- can be any string like "groovy_kernel_on_java".
  .

<img width="942" alt="screen shot 2016-12-20 at 11 35 17 am" src="https://cloud.githubusercontent.com/assets/963093/21402566/1680b928-c787-11e6-8acf-dc4fdeba0651.png">

# Autotranslation (gradle)

* `cd C:\beaker-kernel`
* `gradle environmentVariables`
* Then set environment variable PYTHONPATH, see message after `gradle environmentVariables`
 
# Reinstall (gradle)

* Nothing to do. Due to link beaker source files with jupyter nbextensions.

# Autotranslation (manual)

* `cd .. ; git clone https://github.com/ipython-contrib/jupyter_contrib_nbextensions.git`
* `cd jupyter_contrib_nbextensions/src/jupyter_contrib_nbextensions/nbextensions`
* `ln -s ../../../../beaker-kernel/beaker-nbextension beaker`
* `cd ../../..; pip install . ; jupyter contrib nbextension install --user`
* `cd ../beaker-kernel`
* `export PYTHONPATH=.`
* `jupyter notebook`, click on the nbextensions tab, click the checkbox next to "Beaker".
* open autotranslate.ipynb

# Reinstall

To install a changed version of the nbextension:

`rm -rf ~/Library/Jupyter/nbextensions/beaker/* ; cp -r beaker-nbextension/* ~/Library/Jupyter/nbextensions/beaker`
and restart jupyter.  There has to be a better way to do that...

# Autotranslation (manual on Windows)

* `C:\WorkspaceBeakerKernel`
* `git clone https://github.com/ipython-contrib/jupyter_contrib_nbextensions.git`
* `cd C:\WorkspaceBeakerKernel\jupyter_contrib_nbextensions`
* `pip install .`
* `jupyter contrib nbextension install --user`
* `mklink /J C:\Users\konst\AppData\Roaming\jupyter\nbextensions\beaker C:\WorkspaceBeakerKernel\beaker-nbextension`
* `set PYTHONPATH=C:\WorkspaceBeakerKernel;C:\WorkspaceBeakerKernel\beaker ??? - some python scripts for translation`
* `cd C:\WorkspaceBeakerKernel`
* `jupyter notebook`
* click on the nbextensions tab, click the checkbox next to "Beaker".
* open autotranslate.ipynb

# Reinstall (Windows)

No need to do nothing. Due to link beaker source files with jupyter nbextensions (restart do not needed):
* `mklink /J C:\Users\konst\AppData\Roaming\jupyter\nbextensions\beaker C:\WorkspaceBeakerKernel\beaker-nbextension`

<img width="631" alt="screen shot 2016-12-10 at 10 43 22 pm" src="https://cloud.githubusercontent.com/assets/963093/21077947/261def64-bf2a-11e6-8518-4845caf75690.png">

# Beaker-nbextension development installation
    $ cd beaker-nbextension
    $ pip install -e .
    $ jupyter nbextension install --py --symlink --sys-prefix beaker-nbextension
    $ jupyter nbextension enable --py --sys-prefix beaker-nbextension
    $ cd js
    $ npm i

