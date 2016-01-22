(function () {
  'use strict';
  var retfunc = function (bkUtils) {
    var onAction = function(action, plotId, itemId, evaluatorId, params){
      if (window.languageServiceBase && window.languageServiceBase[evaluatorId]) {
        bkUtils.httpPostJson(
          window.languageServiceBase[evaluatorId] + '/chart/' +
          action + '/' +
          plotId + '/' +
          itemId,
          params
        ).then(
          function () {},
          function () { console.error('send ' + action + ' event error'); });
      }
    };
    return {
      onClick: function (plotId, itemId, evaluatorId, params) {
        onAction('onclick', plotId, itemId, evaluatorId, params)
      },
      onKey: function (plotId, itemId, evaluatorId, params) {
        onAction('onkey', plotId, itemId, evaluatorId, params)
      }
    };
  };
  beaker.bkoFactory('plotService', ['bkUtils', retfunc]);
})();