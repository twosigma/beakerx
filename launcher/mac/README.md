## A native XCode app that runs the java server.

To build, needs two directories:  dist and jre1.7.0_60.jre,
however, confusingly, the contents of the jre directory should be the latest version of java 1.8.
  * dist is created by makeDist target, unzipped.
  * jre1.7.0_60.jre is from [Oracle](http://www.oracle.com/technetwork/java/javase/downloads/jre8-downloads-2133155.html), untarred.
  * cp /Library/Java/JavaVirtualMachines/jdk1.8.0_XX.jdk/Contents/Home/lib/tools.jar ./launcher/mac/jre1.7.0_60.jre/Contents/Home/lib

The XCode project has a custom build script that copies these directories into the Resource fork of the app bundle.

