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


(function() {
  'use strict';

  window.beaker = {
    toBeAddedToOutputDisplayFactory: {},
    bkoDirective: function(type, impl) {
      if (window.beaker.outputDisplayFactory) {
        window.beaker.outputDisplayFactory.add(type, impl);
      } else {
        this.toBeAddedToOutputDisplayFactory[type] = impl;
      }
    },
    toBeAddedToOutputDisplayService: {},
    bkoFactory: function(name, impl) {
      if (window.beaker.outputDisplayService) {
        window.beaker.outputDisplayService.addService(name, impl);
      } else {
        this.toBeAddedToOutputDisplayService[name] = impl;
      }
    },
    toBeAddedToOutputDisplayType: {},
    registerOutputDisplay: function(type, displays) {
      if (window.beaker.outputDisplayFactory) {
        window.beaker.outputDisplayFactory.addOutputDisplayType(type, displays);
      } else {
        this.toBeAddedToOutputDisplayType[type] = displays;
      }
    },
    postHelperHooks: [],
    isEmbedded: true,
    disablePluginLoadFromUrl: true
  };

})();
