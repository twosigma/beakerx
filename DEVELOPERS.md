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

### Related repositories for JVM kernel development

* [beakerx_kernel base](https://github.com/twosigma/beakerx_kernel_base)
* [beakerx_clojure kernel](https://github.com/twosigma/beakerx_kernel_clojure)
* [beakerx_groovy kernel](https://github.com/twosigma/beakerx_kernel_groovy)
* [beakerx_java kernel](https://github.com/twosigma/beakerx_kernel_java)
* [beakerx_kotlin kernel](https://github.com/twosigma/beakerx_kernel_kotlin)
* [beakerx_kernel_scala](https://github.com/twosigma/beakerx_kernel_scala)
* [beakerx_kernel_sql](https://github.com/twosigma/beakerx_kernel_sql)

### Related repositories for autotranslation development

* [beakerx_kernel_autotranslation](https://github.com/twosigma/beakerx_kernel_autotranslation)

### Related repositories for front-end components

* [beakerx_base base](https://github.com/twosigma/beakerx_base)
* [beakerx_tabledisplay](https://github.com/twosigma/beakerx_tabledisplay)
* [beakerx_widgets](https://github.com/twosigma/beakerx_widgets)

### Related repositories for general development

* [beakerx_tests](https://github.com/twosigma/beakerx_tests)

### Setup your development environment (linux and mac)

```
mkdir beakerx-devel
cd beakerx-devel
git clone https://github.com/twosigma/beakerx
git clone https://github.com/twosigma/beakerx_kernel_base
git clone https://github.com/twosigma/beakerx_kernel_kotlin
git clone https://github.com/twosigma/beakerx_kernel_clojure
git clone https://github.com/twosigma/beakerx_kernel_scala
git clone https://github.com/twosigma/beakerx_kernel_groovy
git clone https://github.com/twosigma/beakerx_kernel_sql
git clone https://github.com/twosigma/beakerx_kernel_autotranslation
git clone https://github.com/twosigma/beakerx_kernel_java
git clone https://github.com/twosigma/beakerx_tests
git clone https://github.com/twosigma/beakerx_base
git clone https://github.com/twosigma/beakerx_widgets
git clone https://github.com/twosigma/beakerx_tabledisplay
cd beakerx_tests/dev_scripts/
conda env create -n beakerx-devel -f configuration-lab.yml
conda activate beakerx-devel
./install_kernels_lab.sh
./install_lab_local_extensions.sh
cd ..
cd ..
```

See [beakerx_tests](https://github.com/twosigma/beakerx_tests) for more details.