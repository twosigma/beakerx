(function () {
  'use strict';
  var retfunc = function (bkUtils) {
    var onClick = function(item, params, evaluatorId, type){
      if (window.languageServiceBase && window.languageServiceBase[evaluatorId]) {
        bkUtils.httpPostJson(
          window.languageServiceBase[evaluatorId] + '/chart/click/' +  type + '/' + item.chartId + '/' +  item.uid,
          params
        ).then(
          function () {},
          function () { console.error('send onclick event error'); });
      }
    };
    return {
      onXYClick: function(item, e, evaluatorId) {
        var params = {};
        if(e.ele != null){
          params.index = e.ele.index;
        }
        onClick(item, params, evaluatorId, 'xy');
      },
      onCategoryClick: function(item, e, evaluatorId) {
        var params = {};
        if(e.ele != null){
          params.category = e.ele.category;
          params.series = e.ele.series;
        }
        onClick(item, params, evaluatorId, 'category');
      },
      onCombinedClick: function(item, e, evaluatorId, plotId, subplotIndex) {
        var params = {};
        if(e.ele != null){
          params.index = e.ele.index;
        }
        if (window.languageServiceBase && window.languageServiceBase[evaluatorId]) {
          bkUtils.httpPostJson(
            window.languageServiceBase[evaluatorId] +
            '/chart/click/combined/' + plotId + '/' + subplotIndex + '/' +  item.uid,
            params
          ).then(
            function () {},
            function () { console.error('send onclick event error'); });
        }
      }
    };
  };
  beaker.bkoFactory('plotService', ['bkUtils', retfunc]);
})();