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
 * Module bk.core
 * Holds the core of beaker utilities. It wraps of lower level utilities that come from other
 * modules.
 * The user facing directives also use the core as a communication/exchange layer.
 */
(function() {
  'use strict';
  angular.module('bk.core').factory('codeMirrorExtension', function() {
    var codeMirrorExtension = undefined;

    var codeMirrorFileName = {
        type : 'string',
        hint: function(token, cm) {
          var deferred = bkHelper.newDeferred();
          $.ajax({
            type: "GET",
            datatype: "json",
            url: "../beaker/rest/file-io/autocomplete",
            data: { path: token.string.substr(1)}
          }).done(function(x) {
            for (var i in x) {
              x[i] = token.string[0] + x[i];
            }
            deferred.resolve(x);
          }).error(function(x) {
            deferred.resolve([]);
          });
          return deferred.promise;
        }
    };

    if (typeof window.bkInit !== 'undefined') {
      codeMirrorExtension = window.bkInit.codeMirrorExtension;
    }

    if (typeof codeMirrorExtension === 'undefined') {
      codeMirrorExtension = { autocomplete : [ codeMirrorFileName ]};
    } else {
      codeMirrorExtension.autocomplete.push(codeMirrorFileName);
    }

    return codeMirrorExtension;
  });
})();