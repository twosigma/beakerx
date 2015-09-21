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
      sortorder: 100,
      action: function() {
        bkHelper.openWindow(
                bkHelper.getBaseUrl() + '/open?uri=config/tutorial.bkr&readOnly=true',
            'notebook');
      },
      tooltip: "Open the tutorial notebook"
    },
    {
      name: "About Beaker",
      sortorder: 120,
      action: function() {
        bkHelper.showModalDialog(undefined, "app/template/about.html");
      },
      tooltip: "Basic information about this application"
    },
    {
      name: "Keyboard shortcuts",
      sortorder: 110,
      action: function() {
        bkHelper.openStaticWindow('keyboardshortcuts.html');
      },
      tooltip: "Show keyboard shortcuts"
    },
    {
      name: "Report a bug or feature request",
      sortorder: 130,
      action: function() {
        var url = 'https://github.com/twosigma/beaker-notebook/issues/new';
        if (bkHelper.isElectron) {
          bkHelper.Electron.Shell.openExternal(url + '?title=\[Native Beaker\]&labels=Electron');
        } else {
          window.open(url);
        }
      },
      tooltip: "Log an issue in GitHub"
    }
  ];
  var menuItemPromise = bkHelper.newPromise({
    parent: "Help",
    id: "help-menu",
    items: menuItems
  });
  exports.getMenuItems = function() {
    return menuItemPromise;
  };
});
