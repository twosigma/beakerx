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
      name: "New Notebook",
      shortcut: ["Ctrl-N", "Cmd-N"],
      tooltip: "Open a new empty notebook, add the languages of your choice",
      sortorder: 100,
      action: function() {
        bkHelper.newSession(true);
      }
    },
    {
      name: "New Default Notebook",
      shortcut: ["Ctrl-Shift-N", "Cmd-Shift-N"],
      sortorder: 101,
      id: "new-notebook-menuitem",
      action: function() {
        bkHelper.newSession(false);
      },
      tooltip: "Open a new default notebook"
    },
    {
      name: "Open... (.bkr)",
      id: "open-menuitem",
      tooltip: "Open a bkr notebook file",
      sortorder: 110,
      action: function() {
        bkHelper.openWithDialog('bkr');
      }
    },
    {
      name: "Open recent",
      sortorder: 120,
      id: "open-recent-menuitem",
      items: function() {
        return bkHelper.getRecentMenuItems();
      }
    },
    {
      name: "Upload (.bkr)",
      id: "import-menuitem",
      sortorder: 130,
      action: bkHelper.importNotebookDialog
    }
  ];

  var menuItemsDeferred = bkHelper.newDeferred();
  bkHelper.getHomeDirectory().then(function(homeDir) {
    var toAdd = [
      {
        parent: "File",
        id: "file-menu",
        items: fileMenuItems
      }
    ];
    menuItemsDeferred.resolve(toAdd);
  });

  exports.getMenuItems = function() {
    return menuItemsDeferred.promise;
  };
});
