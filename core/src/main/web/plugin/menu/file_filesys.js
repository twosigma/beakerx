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
  var menuItemsDeferred = bkHelper.newDeferred();
  bkHelper.getHomeDirectory().then(function(homeDir) {
    var toAdd = [
      {
        parent: "File",
        submenu: "Open",
        items: [
          {
            name: "Open... (.bkr)",
            reducedName: "Open...",
            tooltip: "Open a bkr notebook file",
            action: function() {
              bkHelper.showModalDialog(
                  bkHelper.openNotebook,
                  JST['template/opennotebook']({homedir: homeDir}),
                  bkHelper.getFileSystemFileChooserStrategy()
              );
            }
          }
        ]
      },
      {
        parent: "File",
        submenu: "Save As",
        items: [
          {
            name: "Save as... (file)",
            reducedName: "Save as...",
            tooltip: "Save a file from file system",
            action: function() {
              bkHelper.showDefaultSavingFileChooser().then(function(ret) {
                if (ret.uri) {
                  return bkHelper.saveNotebookAs(ret.uri, ret.uriType);
                }
              });
            }
          }
        ]
      }
    ];
    menuItemsDeferred.resolve(toAdd);
  });

  exports.getMenuItems = function() {
    return menuItemsDeferred.promise;
  };
});
