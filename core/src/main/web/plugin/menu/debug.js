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
 * 'Debug' menu plugin
 * This plugs in the 'Debug' menu for beaker and make the debugging info display mechanism in beaker
 * core available
 * through UI.
 */
(function() {
  'use strict';
  var menuItems = [
    {name: "Debug",
      action: function() {
        bkHelper.getBkNotebookViewModel().toggleDebugging();
      },
      tooltip: "Display debug info",
      isChecked: function() {
        return bkHelper.getBkNotebookViewModel().isDebugging();
      }
    },
    {name: "Force Refresh",
      action: function() {
        bkHelper.refreshRootScope();
      },
      tooltip: "Recompute view from model" }
  ];
  var toAdd = {items: menuItems, parent: "Debug"};
  pluginObj.onReady(toAdd);
})();
