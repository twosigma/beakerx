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
