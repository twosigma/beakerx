beaker-nbextension
===============================

A Custom Jupyter Widget Library

Installation
------------

To install use pip:

    $ pip install beaker-nbextension
    $ jupyter nbextension enable --py --sys-prefix beaker-nbextension


For a development installation (requires npm),

    $ git clone https://github.com/Beaker/beaker-nbextension.git
    $ cd beaker-nbextension
    $ pip install -e .
    $ jupyter nbextension install --py --symlink --sys-prefix beaker-nbextension
    $ jupyter nbextension enable --py --sys-prefix beaker-nbextension
    $ cd js
    $ npm i
