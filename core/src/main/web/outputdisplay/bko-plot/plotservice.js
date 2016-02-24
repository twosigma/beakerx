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
      },
      setActionDetails: function (plotId, itemId, evaluatorId, params) {
        if (window.languageServiceBase && window.languageServiceBase[evaluatorId]) {
          return bkUtils.httpPostJson(
            window.languageServiceBase[evaluatorId] + '/chart/actiondetails/' +
            plotId + '/' +
            itemId,
            params
          );
        } else {
          var defer = bkHelper.newDeferred();
          setTimeout(function(){
            defer.reject();
          }, 0);
          return defer.promise;
        }
      }
    };
  };
  beakerRegister.bkoFactory('plotService', ['bkUtils', retfunc]);
})();