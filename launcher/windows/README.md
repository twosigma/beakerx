## Build our distribution of Beaker for Windows

To build, needs three directories: dist.zip, jre1.8.0_45, and python
  * dist is created by makeDist target
  * jre is from [Oracle](http://www.oracle.com/technetwork/java/javase/downloads/jre8-downloads-2133155.html), untarred.
  * python is checked in to the repo, it is the regular python interpreter with many unused files deleted.

Then execute these command:

    unzip python.zip
    7za a dist.zip jre1.8.0_45 beaker.command.bat python
