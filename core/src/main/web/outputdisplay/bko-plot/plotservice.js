(function () {
  'use strict';
  var retfunc = function (bkUtils) {
    return {
      onClick: function (item, e, evaluatorId, scb) {
        if (window.languageServiceBase && window.languageServiceBase[evaluatorId]) {
          var params = {
            'x': item.x,
            'y': item.y
          };
          if(e.ele != null){
            params.index = e.ele.index;
          }
          bkUtils.httpPostJson(
            window.languageServiceBase[evaluatorId] + '/chart/click/' + item.chartId + "/" + item.uid,
            params
          ).then(
            scb,
            function () { console.error("send onclick event error"); });
        }
      },
    };
  };
  beaker.bkoFactory('plotService', ['bkUtils', retfunc]);
})();