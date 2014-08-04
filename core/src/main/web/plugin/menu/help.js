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
 * 'Help' menu plugin
 * This creates the 'Help' menu.
 */
define(function(require, exports, module) {
  'use strict';
  var menuItems = [
    {
      name: "Tutorial",
      action: function() {
        bkHelper.openNotebook("config/tutorial.bkr", undefined, true);
      },
      tooltip: "Open the tutorial notebook"
    },
    {
      name: "About Beaker",
      action: function() {
        bkHelper.showModalDialog(undefined, "app/template/about.html");
      },
      tooltip: "Basic information about this application"
    },
    {
      name: "Keyboard shortcuts",
      action: function() {
        window.open("./keyboardShortcuts.html");
      },
      tooltip: "Show keyboard shortcuts"
    },
    {
      name: "Report a bug or feature request",
      action: function() {
        window.open("https://github.com/twosigma/beaker-notebook/issues/new");
      },
      tooltip: "Log an issue in GitHub"
    },
    {
      name: "Privacy policy",
      action: function() {
        window.open("http://beakernotebook.com/privacy");
      },
      tooltip: "Privacy policy on beakernotebook.com"
    }
  ];
  var menuItemPromise = bkHelper.newPromise({
    parent: "Help",
    items: menuItems
  });
  exports.getMenuItems = function() {
    return menuItemPromise;
  };
});
