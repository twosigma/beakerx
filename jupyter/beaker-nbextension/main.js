// Beaker Autotranslation Notebook Extension
define([
  'services/config',
  'services/kernels/comm',
  'base/js/utils',
  'base/js/namespace',
  'base/js/events',
  'nbextensions/beaker/beakerManager'
], function(
  configmod,
  comm,
  utils,
  Jupyter,
  events,
  beakerManager
) {
  "use strict";

  window.initPlotd = function(data, wrapperId) {
    console.log('init plotd');
    beakerManager.init(data, wrapperId);
  };

  var base_url = utils.get_body_data('baseUrl');
  var config = new configmod.ConfigSection('notebook', {base_url: base_url});
  var comm;

  config.loaded.then(function() {
    console.log('beaker extension loaded');
    var kernel = Jupyter.notebook.kernel;
    window.beaker = {};
    kernel.comm_manager.register_target('beaker.autotranslation',
                                        function(comm, msg) {
                                          comm.on_msg(function(msg) {
                                            console.log('comm.on_msg');
                                            console.log(msg);
                                            window.beaker[msg.content.data.name] = JSON.parse(msg.content.data.value);
                                          });
                                        });
  });

  var load_ipython_extension = function() {
    load_css('tableDisplay/libs/DataTables-1.10.13/css/jquery.dataTables.css');
    load_css('tableDisplay/libs/ColReorder-1.3.2/css/colReorder.dataTables.css');
    load_css('tableDisplay/libs/FixedColumns-3.2.2/css/fixedColumns.dataTables.css');
    load_css('tableDisplay/libs/KeyTable-2.2.0/css/keyTable.dataTables.css');
    load_css('plot/libs/jquery.contextMenu.min.css');
    load_css('plot/bko-combinedplot.css');
    load_css('plot/bko-plot.css');
    load_css('tableDisplay/css/datatables.css');
    start();
  };

  function load_css(name) {
    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = require.toUrl("nbextensions/beaker/"+name);
    document.getElementsByTagName("head")[0].appendChild(link);
  }

  function start() {
    config.load();
  }

  return {
    load_ipython_extension : load_ipython_extension
  };
});
