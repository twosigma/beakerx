#!/bin/bash
# Copyright 2017 TWO SIGMA OPEN SOURCE, LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#        http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

set -ex
source activate beakerx

(cd beakerx_kernel_base; ./gradlew clean install)
(cd beakerx_kernel_groovy/groovy-dist; pip install -r requirements.txt --verbose; beakerx_kernel_groovy install)
(cd beakerx_kernel_java/java-dist; pip install -r requirements.txt --verbose; beakerx_kernel_java install)
(cd beakerx_kernel_scala/scala-dist; pip install -r requirements.txt --verbose; beakerx_kernel_scala install)
(cd beakerx_kernel_kotlin/kotlin-dist; pip install -r requirements.txt --verbose; beakerx_kernel_kotlin install)
(cd beakerx_kernel_sql/sql-dist; pip install -r requirements.txt --verbose; beakerx_kernel_sql install)
(cd beakerx_kernel_clojure/clojure-dist; pip install -r requirements.txt --verbose; beakerx_kernel_clojure install)
(cd beakerx_kernel_autotranslation; pip install -r requirements.txt --verbose; beakerx_kernel_autotranslation install)
(cd beakerx_base; pip install -r requirements.txt --verbose)
(cd beakerx_tabledisplay/beakerx_tabledisplay; pip install -r requirements.txt --verbose; beakerx_tabledisplay install)
(cd beakerx_widgets/beakerx; pip install -r requirements.txt --verbose; beakerx install)

#jupyter labextension install @jupyter-widgets/jupyterlab-manager --no-build
#(cd js/lab; jupyter labextension install . --no-build)
#(cd js/lab-theme-dark; jupyter labextension install . --no-build)
#(cd js/lab-theme-light; jupyter labextension install . --no-build)
#jupyter lab build

rm -rf docker .DS_Store .git .gradle .idea jitpack.yml kernel RELEASE.md test .cache .yarn .local logs .ipynb_checkpoints
