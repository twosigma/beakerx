// Beaker Autotranslation Notebook Extension
define([
  'services/config',
  'services/kernels/comm',
  'base/js/utils',
  'base/js/namespace',
  'base/js/events',
  'nbextensions/beaker/plot/plotManager'
], function(
  configmod,
  comm,
  utils,
  Jupyter,
  events,
  plotManager
) {
  "use strict";

  window.initPlotd = function(data, wrapperId) {
    plotManager.init(data, wrapperId);
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
    load_css('libs/jquery.contextMenu.min.css');
    load_css('bko-combinedplot.css');
    load_css('bko-plot.css');
    start();
  };

  function load_css(name) {
    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = require.toUrl("nbextensions/beaker/plot/"+name);
    document.getElementsByTagName("head")[0].appendChild(link);
  }

  function start() {
    config.load();
  }

  return {
    load_ipython_extension : load_ipython_extension
  };
});
