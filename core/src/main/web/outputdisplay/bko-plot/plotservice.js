(function () {
  'use strict';
  var retfunc = function (bkUtils) {
    var onClick = function(item, params, evaluatorId, type, scb){
      if (window.languageServiceBase && window.languageServiceBase[evaluatorId]) {
        bkUtils.httpPostJson(
          window.languageServiceBase[evaluatorId] + '/chart/' + type + '/click/' + item.chartId + "/" + item.uid,
          params
        ).then(
          scb,
          function () { console.error("send onclick event error"); });
      }
    };
    return {
      onXYClick: function(item, e, evaluatorId, scb) {
        var params = {};
        if(e.ele != null){
          params.index = e.ele.index;
        }
        onClick(item, params, evaluatorId, 'xy', scb);
      },
      onCategoryClick: function(item, e, evaluatorId, scb) {
        var params = {};
        if(e.ele != null){
          params.category = e.ele.category;
          params.series = e.ele.series;
        }
        onClick(item, params, evaluatorId, 'category', scb);
      }
    };
  };
  beaker.bkoFactory('plotService', ['bkUtils', retfunc]);
})();