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
  "use strict";
  var gaService = function() {
    var _enabled = false;
    return {
      enable: function() {
        if (!_enabled) {
          _enabled = true;
          if (ga) {
            var beakerVersion = window.beaker.version;
            ga('set',  {
              "dimension3": beakerVersion, //beakerVersion
              "metric3": 1 // beaker app start count
            });
            ga('send', 'pageview');
          }
        }
      },
      disable: function() {
        _enabled = false;
      },
      log: function(event, obj) {
        if (!_enabled) {
          return;
        }
        if (ga) {
          if (event === "open") {
            var notebookType = obj.format;
            ga("send", "event", "file", "open", notebookType, {
              "dimension1": notebookType, // notebookType
              "metric1": 1 // file open
            });
          } else if (event === "evaluate") {
            var pluginName = obj.plugin;
            ga("send", "event", "notebook", "evaluate", pluginName, {
              "dimension2": pluginName, // pluginName
              "metric2": 1 // evaluation count
            });
          } else if (event === "tick") {
            ga("send", "event", "tick", "tickAction", {
              "metric4": 1 // tick
            });
          } else if (event === "outputDisplay") {
            ga("send", "event", "outputDisplay", obj.resultType, obj.displayType);
          }
        }
      },
      isNeedPermission: function() {
        return true;
      }
    };
  };

  var init = {
    trackingService: gaService
  };

  window.bkInit = init;
})();
