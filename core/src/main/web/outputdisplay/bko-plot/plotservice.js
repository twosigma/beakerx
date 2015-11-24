(function() {
  'use strict';
  var retfunc = function(bkUtils) {
    return {
      onClick: function(item, e) {
        var evaluatorId = "Groovy"; //TODO can be not only groovy?
        if (window.languageServiceBase && window.languageServiceBase[evaluatorId]) {
          bkUtils.httpPostJson(
            window.languageServiceBase[evaluatorId] + '/chart/click/' + item.chartId + "/" + item.uid,
            {
              'x': item.x,
              'y': item.y
              //TODO index into the xs/ys arrays ?
            }

          );
          //TODO
          //.done(function (ret) {
          //}).error(function (jqXHR, textStatus) {
          //});
        }
      },
    };
  };
  beaker.bkoFactory('plotService', ['bkUtils', retfunc]);
})();