## Build our distribution of Beaker for Windows

To build, needs three directories: dist.zip, jre1.7.0_60, and python
  * dist is created by makeDist target
  * jre is from [Oracle](http://www.oracle.com/technetwork/java/javase/downloads/jre7-downloads-1880261.html), untarred.
  * python is checked in to the repo, it is the regular python interpreter with many unused files deleted.

Then execute these command:

	unzip python.zip
    7za a dist.zip jre1.7.0_60 beaker.command.bat python

