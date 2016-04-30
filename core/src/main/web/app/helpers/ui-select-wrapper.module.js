/*
 *  Copyright 2016 TWO SIGMA OPEN SOURCE, LLC
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

(function() {
  'use strict';

  angular.module('uiSelectWrapper', ['ui.select'])
    //This overrides the ui-select-sort directive from ui.select to do nothing
    //ui-select-sort gets automatically attached to the ui-select dropdown in pluginmanager evaluator settings and adds drag listeners which we do not want
    .config(function($provide) {
      $provide.decorator('uiSelectSortDirective', function($delegate) {
        var directive = $delegate[0];

        directive.compile = function() {
          return angular.noop;
        };

        return $delegate;
      });
    });
})();