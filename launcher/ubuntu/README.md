## Build our distribution of Beaker for Ubuntu

This is almost a no-op.  Because Ubuntu has such a good package
manager, we can install all dependencies with a script.  It just needs
to be added to the zip file.

After making dist.zip, just run this command:

    zip dist.zip install-*dependencies.sh
