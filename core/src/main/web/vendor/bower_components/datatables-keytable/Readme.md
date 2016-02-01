# KeyTable

KeyTable provides Excel like cell navigation on any table. Events (focus, blur, action etc) can be assigned to individual cells, columns, rows or all cells.


# Installation

To use KeyTable the best way to obtain the software is to use the [DataTables downloader](//datatables.net/download). You can also include the individual files from the [DataTables CDN](//cdn.datatables.net). See the [documentation](http://datatables.net/extensions/keytable/) for full details.


# Basic usage

FixedHeader is initialised using the `keys` option in the DataTables constructor - a simple boolean `true` will enable the feature. Further options can be specified using this option as an object - see the documentation for details.

```js
$(document).ready( function () {
    $('#myTable').DataTable( {
    	keys: true
    } );
} );
```


# Documentation / support

* [Documentation](https://datatables.net/extensions/fixedheader/)
* [DataTables support forums](http://datatables.net/forums)


# GitHub

If you fancy getting involved with the development of KeyTable and help make it better, please refer to its [GitHub repo](https://github.com/DataTables/KeyTable).

