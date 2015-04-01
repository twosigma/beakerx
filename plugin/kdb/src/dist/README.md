kdb plugin for Beaker
=====================

What is kdb and why use it?
---------------------------

kdb is Kx System's column-store database. It handles in-memory and on-disk archives seamlessly,
and scales to very large datasets. It comes with two languages - `k`, the original ASCII APL-ish
language underlying kdb, and `q`, the slightly more friendly language that extends k and adds
SQL-like queries.

If you have a lot of data, kdb is hard to beat when it comes to number crunching. The compactness
of q makes it a great choice for experimenting with large datasets and boiling them down to
manageable sizes for further, more sophisticated, analysis.

If you want to use Beaker to study millions of data points but are finding it hard to get R or
Python to scale, you may find kdb a handy addition to your data analysis arsenal.


Getting kdb
-----------

kdb is a commercial product, but there's a fully-functional free 32 bit version available for
Linux, Mac and Windows. You can download it from [kx.com](http://kx.com/software-download.php).


Setting up kdb for Beaker
-------------------------

Once you've unpacked everything, set the `QHOME` environment variable to the installation
directory (i.e. the directory containing `l32/q` on Linux, `m32/q` on Mac, or `q.exe` on Windows).
The plugin will use this to locate the q binary. It will look for a 64 bit version for your
platform first, then fall back to the 32 bit version.


Getting started with q
----------------------

If you're new to kdb/q, here are a number of resources that will help you get started with
the language.

* [Q for Mortals](http://code.kx.com/wiki/JB:QforMortals2/contents) -
  Jeff Borror's excellent introduction to q.
* [Reference](http://code.kx.com/wiki/Reference) -
  almost everything you'll need to know about kdb in one place.
* [Thalesians](http://www.thalesians.com/finance/index.php/Knowledge_Base/Databases/Kdb) -
  another introduction to q, with lots of examples.
* [Kx's developer site](http://code.kx.com) -
  more tutorials, cookbooks, contribs.

If you're new to this style of programming, here are some notes that might be useful :

* q has no operator precedence. All expressions evaluate strictly *right-to-left*. This means `1 + 2 3`
  is `3 4`, because the `2 3` forms a list before the `+` operator is encountered.
* Lists are first class values too; many functions will apply a scalar itemwise to a list (as above), or
  combine elements in equally-sized lists pairwise.
* Operators typically have different modes depending on whether their arguments are
  lists or single values. They're usually sensibly chosen (e.g. `5?10` is five random integers in [0,10),
  and `5?6 7 8` is five elements drawn at random from the list `6 7 8`).
* Operators are just binary functions that can be written infix style.
* In `select` expressions, column names represent the entire column as a list. If you want to apply a
  function to each element in the column, you'll need to use `each`.
