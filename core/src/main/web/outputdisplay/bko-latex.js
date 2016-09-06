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
 * bkoLatex
 * This is the output display component for displaying results of LaTex code.
 */
(function() {
  'use strict';
  beakerRegister.bkoDirective('Latex', ["bkUtils", function(bkUtils) {
    var PLUGIN_NAME = "Latex";
    return {
      link: function(scope, element, attrs) {
        scope.$watch('model.getCellModel()', function(newValue) {
          var start = new Date().getTime();
          var deferred = bkHelper.newDeferred();
          var beakerObj = bkHelper.getBeakerObject();

          try {
            katex.render(newValue, element[0], {throwOnError : false});
          } catch(err) {
            var modelOutput = {
              result: {
                status: 'ERROR',
                object:{
                  startTime: start,
                  outputdata: '',
                  payload: err.message
                }
              }
            };

            beakerObj.setupBeakerObject(modelOutput);
            window.beaker = beakerObj.beakerObj;

            bkHelper.receiveEvaluationUpdate(modelOutput,
              {status: "ERROR", payload: err.message},
              PLUGIN_NAME);
            beakerObj.notebookToBeakerObject();
            
            beakerObj.clearOutput();
            deferred.reject(err.message);
            // bkHelper.show1ButtonModal(err.message+'<br>See: <a target="_blank" href="http://khan.github.io/KaTeX/">KaTeX website</a> and its <a target="_blank" href="https://github.com/Khan/KaTeX/wiki/Function-Support-in-KaTeX">list of supported functions</a>.', "KaTex error");
          }
        });
      }
    };
  }]);
})();
