/*
 *  Copyright 2014 TWO SIGMA OPEN SOURCE, LLC
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
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