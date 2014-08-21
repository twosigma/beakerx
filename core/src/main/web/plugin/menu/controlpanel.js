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
 * This plugins menu items for the control panel
 */
define(function(require, exports, module) {
  'use strict';

  var fileMenuItems = [
    {
      name: "New",
      tooltip: "Open a new notebook with default languages(Evaluators)",
      action: function() {
        bkHelper.newSession();
      }
    },
    {
      name: "Open recent",
      items: function() {
        return bkHelper.getRecentMenuItems();
      }
    }
  ];

  var menuItemsDeferred = bkHelper.newDeferred();
  bkHelper.getHomeDirectory().then(function(homeDir) {
    var toAdd = [
      { parent: "File", items: fileMenuItems },
      {
        parent: "File",
        submenu: "Open",
        items: [
          {
            name: "Open... (.bkr)",
            tooltip: "Open a bkr notebook file",
            action: function() {
              bkHelper.showModalDialog(
                  function(originalUrl) {
                    bkHelper.openNotebook(originalUrl);
                  },
                  JST['opennotebook']({homedir: homeDir}),
                  bkHelper.getFileSystemFileChooserStrategy()
              );
            }
          }
        ]
      },
      {
        parent: "Help",
        items: [{
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
        }]
      }
    ];
    menuItemsDeferred.resolve(toAdd);
  });

  exports.getMenuItems = function() {
    return menuItemsDeferred.promise;
  };
});
