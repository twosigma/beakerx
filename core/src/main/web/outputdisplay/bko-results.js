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
  beakerRegister.bkoDirective("Results", ["$interval", "$compile", "bkOutputDisplayFactory", "bkAnsiColorHelper", "$sce",
    function($interval, $compile, bkOutputDisplayFactory, bkAnsiColorHelper, $sce) {
    return {
      template: JST['mainapp/components/notebook/output-results'],
      link: function(scope, element, attrs) {
        scope.hasPayload = function() {
          return scope.model.getCellModel().payload !== undefined;
        };
        scope.isPayloadHidden = function () {
          return !!scope.getPayload() && scope.getPayload().type == 'HiddenOutputCell';
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
        scope.isShowOutput = function() {
          return scope.model.isShowOutput();
        };
        scope.colorizeIfNeeded = function (text) {
          return $sce.trustAsHtml(bkAnsiColorHelper.hasAnsiColors(text) 
            ? bkAnsiColorHelper.convertToHtml(text) 
            : _.escape(text));
        };

        scope.isShowMenu = function() { return false; };
        scope.showoutput = scope.model.isShowOutput();

        scope.payload = {
          result: undefined,
          isShowOutput: function () {
            return scope.showoutput;
          }
        };
        
        scope.$watch('getPayload()', function() {
          if (scope.hasPayload()) {
            scope.payload.result = scope.getPayload();
          }
        });

        scope.$watch('isShowOutput()', function(oldval, newval) {
          scope.showoutput = newval;
        });

        scope.$watch('getOutputData()', function() {
          if (scope.hasOutputData()) {
            scope.outputdata =  scope.getOutputData()
          }
        });
      }
    };
  }]);
  beakerRegister.registerOutputDisplay("Results", ["Results", "Text"]);
})();
