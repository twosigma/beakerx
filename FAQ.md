<!--
    Copyright 2018 TWO SIGMA OPEN SOURCE, LLC

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

# FAQs


#### JVM fails with not enough memory?

You may try setting JVM properties. Java allows you to configure the maximum heap size and various other settings with command line parameters when the JVM is started. BeakerX allows you to add parameters to the JVM with a control panel added to Jupyter's tree view. Detials can be found here:  [JavaArgs.ipynb](doc/groovy/JavaArgs.ipynb).

Related issues: [#7666](https://github.com/twosigma/beakerx/issues/7666).