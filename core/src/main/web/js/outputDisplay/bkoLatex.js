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
 * M_bkoLatex
 * This is the output display component for displaying results of LaTex code.
 */
(function() {
  'use strict';
  beaker.bkoDirective('Latex', ["generalUtils", function(generalUtils) {

    var deferred = Q.defer();

    // config MathJax
    var scriptConfigMathJax = document.createElement('script');
    scriptConfigMathJax.type = 'text/x-mathjax-config';
    scriptConfigMathJax.innerHTML =
        "MathJax.Hub.Config({tex2jax: {" +
            "displayMath: [['MATH_JAX_BEGIN', 'MATH_JAX_END']]," +
            "inlineMath: [['MATH_JAX_INLINE_BEGIN', 'MATH_JAX_INLINE_END']]" +
            "}});";
    document.head.appendChild(scriptConfigMathJax);

    // load MathJax
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = "./vendor/mathjax/MathJax.js?config=TeX-AMS-MML_HTMLorMML";
    script.onload = function() {
      console.log("resolving loadMathJax");
      deferred.resolve();
    };
    script.onerror = function() {
      deferred.reject("Failed to config MathJax");
    };
    document.head.appendChild(script);

    var mathJaxIsReady = deferred.promise;

    var updateMathJax = function(elementId) {
      mathJaxIsReady.then(function() {
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, elementId]);
      });
    };

    return {
      template: "<div id='{{id}}'></div>",
      controller: function($scope) {
        $scope.id = "latex_" + generalUtils.generateID(6);
      },
      link: function(scope, element, attrs) {
        scope.$watch('model.getCellModel()', function(newValue) {
          var div = element.find("#" + scope.id)
              .html("MATH_JAX_INLINE_BEGIN" + newValue + "MATH_JAX_INLINE_END");
          updateMathJax(scope.id);
        });
      }
    };
  }]);
})();
