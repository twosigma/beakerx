# Embeddable Assets

This directory contains the files that one would need in order to
use Beaker's frontend like a library, embedding it in a different
application.  Changes from the "standalone" version of beaker include:

* Some behavioral changes more appropriate for embeddable version
* Combining assets into the fewest number of files that we can currently manage
* Namespacing all the CSS to avoid conflicting with styles from another application.

The files here are all generated from other files in this repository.
To generate new versions of all the embeddable assets, you just need to run:

    gradle publishAssets
