## A native XCode app that runs the java server.

To build, needs two directories:  dist and jre1.7.0_60.jre.
  * dist is created by makeDist target, unzipped.
  * jre1.7.0_60.jre is from [Oracle](http://www.oracle.com/technetwork/java/javase/downloads/jre7-downloads-1880261.html), untarred.

The XCode project has a custom build script that copies these directories into the Resource fork of the app bundle.
