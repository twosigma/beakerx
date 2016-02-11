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
 * File menu plugin
 * This adds file system specific menu items to the File menu.
 */
define(function(require, exports, module) {
  'use strict';
  var menuItems = [
    {
      parent: "File",
      id: "file-menu",
      submenu: "Open",
      items: [
        {
          name: "Open... (.bkr)",
          id: "open-menuitem",
          reducedName: "Open...",
          tooltip: "Open a bkr notebook file",
          sortorder: 100,
          action: function() {
            bkHelper.openWithDialog('bkr');
          }
        }
      ]
    },
    {
      parent: "File",
      id: "file-menu",
      submenu: "Save As",
      shortcut: bkHelper.isWindows ? "Ctrl-S" : "&#x2318;-S",
      items: [
        {
          name: "Save as... (file)",
          id: "save-as-menuitem",
          reducedName: "Save as...",
          tooltip: "Save a file from file system",
          sortorder: 100,
          action: function() {
            if (bkHelper.isElectron){
              bkHelper.showElectronSaveDialog().then(function(path) {
                // Save cancelled
                if (path == undefined)
                  return;
                return bkHelper.saveNotebookAs(path, 'file');
              })
            } else {
              bkHelper.showDefaultSavingFileChooser().then(function(ret) {
                if (ret.uri) {
                  return bkHelper.saveNotebookAs(ret.uri, ret.uriType);
                }
              });
            }
            bkHelper.showSaveDialog
          }
        }
      ]
    }
  ];

  var menuItemsPromise = bkHelper.newPromise(menuItems);

  exports.getMenuItems = function() {
    return menuItemsPromise;
  };
});
