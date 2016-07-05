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
    var onAction = function (action, tableId, params, evaluatorId) {
      if (window.languageServiceBase && window.languageServiceBase[evaluatorId]) {
        var defer = bkUtils.httpPostJson(
          window.languageServiceBase[evaluatorId] + '/tabledisplay/' +
          action + '/' +
          tableId,
          params
        );
        defer.then(
          undefined,
          function () { console.error('send ' + action + ' event error'); });
        return defer;
      } else {
        var defer = bkHelper.newDeferred();
        setTimeout(function () {
          console.error('send ' + action + ' event error, evaluator ' + evaluatorId + 'is not found');
          defer.reject();
        }, 0);
        return defer.promise;
      }
    };
    return {
      onDoubleClick: function (tableId, row, column, evaluatorId) {
        return onAction('ondoubleclick', tableId, [row, column], evaluatorId);
      },
      onContextMenu: function (tableId, menuKey, row, column, evaluatorId) {
        return onAction('oncontextmenu', tableId, [menuKey, row, column], evaluatorId);
      },
      setActionDetails: function (tableId, evaluatorId, params) {
        return onAction('actiondetails', tableId, params, evaluatorId);
      }
    };
  };
  beakerRegister.bkoFactory('tableService', ['bkUtils', retfunc]);
})();