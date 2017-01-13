define([
  'nbextensions/beaker/plot/plot',
  'nbextensions/beaker/plot/combinedPlot'
], function(
  plot,
  combinedPlot
) {

  var currentWrapperId = null;

  return {
    init: init
  };

  // -----

  function init(data, wrapId) {
    currentWrapperId = wrapId;

    var type = data.type || 'Text';
    switch (type) {
      case 'CombinedPlot':
        initCombinedPlot(data);
        break;
      default:
        initStandardPlot(data);
        break;
    }

  }

  function initStandardPlot(data) {
    var currentScope = plot.createScope(currentWrapperId),
      tmpl = currentScope.buildTemplate();

    $('div#'+currentWrapperId).append(tmpl);

    currentScope.setModelData(data);
    currentScope.init();
  }

  function initCombinedPlot(data) {
    var currentScope = combinedPlot.createScope(currentWrapperId);
    currentScope.buildTemplate();
    currentScope.setModelData(data);
    currentScope.init();
  }

});