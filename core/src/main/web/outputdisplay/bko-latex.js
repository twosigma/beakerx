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
  beaker.bkoDirective('Latex', ["bkUtils", function(bkUtils) {

    return {
      template: "<div id='{{id}}'></div>",
      controller: function($scope) {
        $scope.id = "latex_" + bkUtils.generateId(6);
      },
      link: function(scope, element, attrs) {
        scope.$watch('model.getCellModel()', function(newValue) {
          var div = element.find("#" + scope.id)
              .html("MATH_JAX_INLINE_BEGIN" + newValue + "MATH_JAX_INLINE_END");
          MathJax.Hub.Queue(["Typeset", MathJax.Hub, scope.id]);
        });
      }
    };
  }]);
})();
