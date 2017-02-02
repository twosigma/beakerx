define([
  'nbextensions/beaker/plot/plot',
  'nbextensions/beaker/plot/combinedPlot',
  'nbextensions/beaker/tableDisplay/tableDisplay'
], function(
  plot,
  combinedPlot,
  tableDisplay
) {

  var currentWrapperId = null;

  return {
    init: init
  };

  // -----

  function init(data, wrapId) {
    currentWrapperId = wrapId;

    console.log('manager init', data);

    var type = data.type || 'Text';
    switch (type) {
      case 'TableDisplay':
        initTableDisplay(data);
        break;
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

  function initTableDisplay(data) {
    var currentScope = tableDisplay.createScope(currentWrapperId);
    currentScope.buildTemplate();
    currentScope.setModelData(data);
    currentScope.run();
  }
});