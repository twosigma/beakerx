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
/**
 * bkoResults
 */
(function() {
  'use strict';
  beaker.bkoDirective("Results", ["$interval", "$compile", "bkOutputDisplayFactory", function(
      $interval, $compile, bkOutputDisplayFactory) {
    return {
      template: JST['mainapp/components/notebook/output-results'],
      link: function(scope, element, attrs) {
        scope.hasPayload = function() {
          return scope.model.getCellModel().payload !== undefined;
        };
        scope.getPayload = function() {
          return scope.model.getCellModel().payload;
        };
        scope.getOutputData = function() {
          return scope.model.getCellModel().outputdata;
        };
        scope.hasOutputData = function() {
          return scope.model.getCellModel().outputdata !== undefined && scope.model.getCellModel().outputdata.length>0;
        };
        scope.getOutputResult = function() {
          return scope.model.getCellModel().payload;
        };

        scope.isShowMenu = function() { return false; };
        
        scope.$watch('getPayload()', function() {
          if (scope.hasPayload()) {
            scope.payload = {
                result : scope.getPayload()
            };
          }
        });

        scope.$watch('getOutputData()', function() {
          if (scope.hasOutputData()) {
            scope.outputdata =  scope.getOutputData()
          }
        });
      }
    };
  }]);
  beaker.registerOutputDisplay("Results", ["Results", "Text"]);
})();
