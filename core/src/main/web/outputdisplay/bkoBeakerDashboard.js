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
  beaker.bkoDirective("BeakerDashboard", [ "$timeout", "bkEvaluatorManager", function ($timeout, bkEvaluatorManager) {
    return {
      template:
        '<script type="text/ng-template" id="rowrender.html">' +
        '  <div ng-repeat="c in r.cols" class="col-md-{{c.width}}" ng-class="c.theclass" style="{{c.thestyle}}">'+
        '    <div ng-repeat="p in c.payload">' +
        '      <div class="row" ng-class="p.theclass" style="{{p.thestyle}}" ng-if="p.rows !== undefined" ng-model="p" ng-include="\'rowrender.html\'"></div>'+
        '      <div><bk-code-cell-output ng-if="p.rows === undefined" model="p"></bk-code-cell-output></div>'+
        '    <div>' +
        '  </div>'+
        '</script>' +
        '<div>' +
        '  <button ng-click="fullscreen()">Go FullScreen</button>'+
        '  <div id="{{theid}}" class="html5-fullscreen-api" ng-class="theclass" style="{{data.thestyle}}">'+
        '    <div class="row" ng-class="r.theclass" style="{{r.thestyle}}" ng-repeat="r in data.rows" ng-include="\'rowrender.html\'">'+
        '    </div>'+
        '  </div>'+
        '</div>',

      scope : {
        model: '=model'
      },

      controller: function ($scope) {
        $scope.content = [];

        $scope.theid = Math.random().toString(36).substring(7);

        $scope.wrapCol = function(r) {
          var ret = { };
          ret.payload = [];
          ret.theclass = r.theclass;
          ret.thestyle = r.thestyle;
          ret.width    = r.width;

          var i;
          for (i=0; i<r.payload.length; i++) {
            if (r.payload[i].rows !== undefined)
              ret.payload.push($scope.wrapRow(r.payload[i]));
            else {
              var o = {
                result: r.payload[i],
                cellmodel: {
                  output: {
                    hidden: false
                  }
                }
              };
              ret.payload.push(o);
            }
          }
          return ret;
        };

        $scope.wrapRow = function(r) {
          var ret = { };
          ret.cols = [];
          ret.theclass = r.theclass;
          ret.thestyle = r.thestyle;
          var i;
          for (i=0; i<r.cols.length; i++)
            ret.cols.push($scope.wrapCol(r.cols[i]));
          return ret;
        };

        $scope.getUpdateService = function() {
          if (window !== undefined && window.languageUpdateService !== undefined && bkEvaluatorManager.getEvaluator($scope.model.getEvaluatorId())!==undefined)
            return window.languageUpdateService[$scope.model.getEvaluatorId()];
          return undefined;
        };

        $scope.ingestUpdate = function(data) {
          $scope.data = { };
          $scope.data.rows = [];

          if (data.rows !== undefined) {
            var i;
            for (i=0; i<data.rows.length; i++)
              $scope.data.rows.push($scope.wrapRow(data.rows[i]));
          }

          $scope.cellmodel = $scope.model.getCellModel();
          if ($scope.cellmodel.output === undefined) {
            $scope.cellmodel.output = {
              hidden: false
            };
          }
          $scope.data.theclass  = data.theclass;
          $scope.data.thestyle  = data.thestyle;
          $scope.update_id = data.update_id;

          var srv = $scope.getUpdateService();
          if ($scope.subscribedId && $scope.subscribedId !== $scope.update_id) {
            if (srv !== undefined)
              srv.unsubscribe($scope.subscribedId);
            $scope.subscribedId = null;
          }
          if (!$scope.subscribedId && $scope.update_id && srv !== undefined) {
            var onUpdate = function(update) {
              $scope.ingestUpdate(update);
              $scope.$digest();
            };
            srv.subscribe($scope.update_id, onUpdate);
            $scope.subscribedId = $scope.update_id;
          }
        };

        $scope.$on('$destroy', function () {
          if ($scope.subscribedId) {
            var srv = $scope.getUpdateService();
            if (srv !== undefined) {
              srv.unsubscribe($scope.subscribedId);
            }
          }
        });

        $scope.fullscreen = function() {
          var elem = document.getElementById($scope.theid);
          if (elem.requestFullscreen) {
            elem.requestFullscreen();
          } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
          } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
          } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
          }
        };

        $scope.isShowMenu = function() {
          return false;
        };

      },
      link: function (scope, element, attrs) {
        scope.getState = function() {
          return scope.model.getCellModel();
        };

        scope.$watch('getState()', function(result) {
          if (result == void 0) {
            return ;
          }
          scope.ingestUpdate(result);
        });

      }
    };
  }]);
  beaker.registerOutputDisplay("BeakerDashboard", ["BeakerDashboard", "Text"]);
})();
