(function () {
  'use strict';
  var retfunc = function (bkUtils, bkEvaluatorManager) {
    return {
      getUpdateService: function (evaluatorId) {
        if (window !== undefined && window.languageUpdateService !== undefined &&
          bkEvaluatorManager.getEvaluator(evaluatorId) !== undefined)
          return window.languageUpdateService[evaluatorId];
        return undefined;
      },
      onClick: function (item, e, evaluatorId) {
        if (window.languageServiceBase && window.languageServiceBase[evaluatorId]) {
          bkUtils.httpPostJson(
            window.languageServiceBase[evaluatorId] + '/chart/click/' + item.chartId + "/" + item.uid,
            {
              'x': item.x,
              'y': item.y
              //TODO index into the xs/ys arrays ?
            }
          ).then(
            function () { },
            function () { console.error("send onclick event error"); });
        }
      },
    };
  };
  beaker.bkoFactory('plotService', ['bkUtils', 'bkEvaluatorManager', retfunc]);
})();