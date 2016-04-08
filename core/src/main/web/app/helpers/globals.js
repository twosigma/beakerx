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
 * Module bk.datatables
 */
(function() {
  'use strict';
  angular.module('bk.globals', []).factory('GLOBALS', function() {
    return {
      DEFAULT_EVALUATOR: 'JavaScript',
      REQUIREJS_TIMEOUT: 30,
      RECONNECT_TIMEOUT: 30 * 1000, // 30 seconds
      CELL_INSTANTIATION_DISTANCE: 500, // in pixels - if the cell is closer than from the viewport it gets instantiated
      EVENTS: {
      	RECONNECT_FAILED: 'reconnect-failed',
        LANGUAGE_MANAGER_SHOW_SPINNER: 'language-manager-show-spinner',
        LANGUAGE_MANAGER_HIDE_SPINNER: 'language-manager-hide-spinner',
        DISCARD_LANGUAGE_SETTINGS: 'discard-language-settings',
        HIGHLIGHT_EDITED_LANGUAGE_SETTINGS: 'highlight-edited-language-settings',
        SET_LANGUAGE_SETTINGS_EDITED: 'set-language-settings-edited',
        CELL_OUTPUT_EXPANDED: 'cell-output-expanded',
        CELL_OUTPUT_LM_SHOWED: 'cell-output-lm-showed',
        ADVANCED_MODE_TOGGLED: 'advanced-mode-toggled'
      },
      FILE_LOCATION: {
        FILESYS: "file",
        HTTP: "http",
        AJAX: "ajax"
      },
      EVALUATOR_SPEC: {
        PROPERTIES: {
          STRING: "settableString",
          BOOLEAN: "settableBoolean",
          ENUM: "settableEnum",
          SELECT: "settableSelect"
        },
        ACTION: "action"
      },
      THEMES: {
        DEFAULT: 'default',
        AMBIANCE: 'ambiance'
      }
    };
  });
})();
