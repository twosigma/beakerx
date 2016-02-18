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
 *  Module bk.lastUsedMenu
 */
(function() {
  'use strict';
  var module = angular.module('bk.lastUsedMenu', []);

  module.provider("bkLastUsedMenu", function() {
    var _defaults = {
      "open-menuitem": "open-menuitem" //default is bkr files
    };
    var lastUsed = function() {
      this._lastUsed = _.extend({}, _defaults);
    };

    _.extend(lastUsed.prototype, {
      setItem: function(supermenu, id) {
        this._lastUsed[supermenu] = id;
      },
      getItem: function(supermenu) {
        return this._lastUsed[supermenu];
      },
      reset: function() {
        this._lastUsed = _.extend({}, _defaults);
      }
    });

    return {
      $get: function() {
        return new lastUsed();
      }
    };
  });
})();

