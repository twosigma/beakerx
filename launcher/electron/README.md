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

Before building, you have to follow these instructions:
OSX:

1. Download electron-v0.29.2-darwin-x64.zip from Electron's repo (https://github.com/atom/electron/releases) and put it in this folder (You can use another version, just change its name at the top of build.gradle).

2. Download JRE, unzip it, rename it as simply 'jre', rezip it and put it in this folder as 'jre.zip'.

3. Put a copy of tools.jar in this folder. This is a Java compiler, implemented in Java. You can probably find one in `/Library/Java/JavaVirtualMachines/jdk1.8.0_45.jdk/Contents/Home/lib/tools.jar`, or in any JDK distribution.

Windows:

1. Download electron-v0.28.3-win32-x64.zip from Electron's repo (https://github.com/atom/electron/releases) and put it in this folder.

2. Download JRE, unzip it, rename it as simply 'jre', rezip it and put it in this folder as 'jre.zip'.

3. Copy python.zip from launcher/windows into this folder.

4. Put a copy of tools.jar in this folder. Get it from a similar place as OSX.

(Only if you want to create an installer)
5. Download Inno Setup 5, install it, and add its folder to your path (http://www.jrsoftware.org/isdl.php)

Linux:

1. Download electron-v0.29.2-linux-x64.zip from Electron's repo (https://github.com/atom/electron/releases) and put it in this folder.

2. Download JRE, unzip it, rename it as simply 'jre', rezip it and put it in this folder as 'jre.zip'.

3. Put a copy of tools.jar in this folder. Get it from a similar place as OSX.

To build and/or run:
If you want to simply run Beaker using your own installed version of electron, do:

```sh
gradle run
```

If you do not have Electron's prebuilt binaries installed, simply do

```sh
gradle installElectron
```

If you are on Windows you will have to add the prebuilt binaries to your path (they should
be in your global node_modules folder if you called `gradle installElectron`)

To produce an executable you can run (an app bundle on OSX, a folder with an executable on Windows and Linux), do:
```sh
gradle makeBundle -P version=0.29.2 -P arch=x64
```

To produce an installer for your platform (DMG on OSX, .exe on Windows), do:
```sh
gradle makeInstaller -P version=0.29.2 -P arch=x64
```

The 'version' parameter determines the version of electron that will be used to build your application. You can use any
version available at https://github.com/atom/electron/releases. The 'arch' parameter determines the architecture of the
Electron build. Acceptable 'arch' parameters are 'x64', 'ia32' and 'arm'.

Currently there are no Linux installers.

