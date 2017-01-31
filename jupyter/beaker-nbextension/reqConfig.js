require.config({
  paths: {
    'datatables.net': '/nbextensions/beaker/bower_components/datatables.net/js/jquery.dataTables',
    'datatables': '/nbextensions/beaker/bower_components/datatables.net/js/jquery.dataTables'
  },
  shim: {
    'nbextensions/beaker/tableDisplay/datatablesHeadermenu': [
      'jquery',
      'datatables.net'
    ]
  }
});