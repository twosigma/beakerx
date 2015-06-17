<!--
    Copyright 2015 TWO SIGMA OPEN SOURCE, LLC

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

In order to build:

1. Download electron-v0.28.1-darwin-x64.zip from Electron's repo (https://github.com/atom/electron/releases), put it in this folder.

2. Download JRE, zip it, and put it in this folder as 'jre.zip'.

3. Get a tools.jar from a JDK folder. You can probably find one in `/Library/Java/JavaVirtualMachines/jdk1.7.0_55.jdk/Contents/Home/lib/tools.jar`

4. Run `gradle makeElectron`. This will produce a Beaker.app bundle you
can run or install.

If you want to simply run Beaker using your own installed version of electron, do:

```sh
gradle makeDist
electron app
```
