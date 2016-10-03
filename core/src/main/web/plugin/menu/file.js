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
 * 'File' menu plugin
 * This plugs in the 'File' menu that is the container of menu items like New, Open, Save,
 * Close for notebooks
 */
define(function(require, exports, module) {
  'use strict';
  var fileMenuItems = [
    {
      name: "New Notebook",
      shortcut: ["Alt-N", "Ctrl-N"],
      sortorder: 100,
      id: "new-notebook-menuitem",
      action: function() {
        bkHelper.newSession(true);
      },
      tooltip: "Open a new empty notebook, add the languages of your choice"
    },
    {
      name: "New Default Notebook",
      shortcut: ["Alt-Shift-N", "Ctrl-Shift-N"],
      sortorder: 101,
      id: "new-notebook-menuitem",
      action: function() {
        bkHelper.newSession(false);
      },
      tooltip: "Open a new default notebook"
    },
    {
      name: "New Beaker window",
      sortorder: 105,
      id: "new-beaker-window-menuitem",
      action: function() {
        bkHelper.openWindow('/beaker', 'control-panel');
      },
      tooltip: "Open a new browser tab or window to work on more than one notebook at the same time"
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
      sortorder: 125,
      action: bkHelper.importNotebookDialog
    },
    {
      name: "Save",
      shortcut: ["Ctrl-S", "Cmd-S"],
      id: "save-menuitem",
      sortorder: 130,
      action: function() {
        bkHelper.saveNotebook();
      }
    },
    {
      name: "Save as...",
      shortcut: ["Ctrl-Shift-S", "Cmd-Shift-S"],
      id: "save-as-menuitem",
      sortorder: 140,
      tooltip: "Save a file to file system",
      action: function() {
        if (bkHelper.isElectron){
          bkHelper.showElectronSaveDialog().then(function(path) {
            // Save cancelled
            if (path == undefined)
              return;
            return bkHelper.saveNotebookAs(path, 'file');
          })
        } else {
          bkHelper.showFileSaveDialog({
            extension: "bkr"
          }).then(function (ret) {
            if (ret.uri) {
              return bkHelper.saveNotebookAs(ret.uri, ret.uriType);
            }
          });
        }
      }
    },
    {
      name: "Publish...",
      sortorder: 145,
      id: "publish-menuitem",
      action: function () {
        bkHelper.showPublishForm();
      },
      tooltip: "Publish the notebook to Beaker Publications"
    },
    {
      name: "Close",
      id: "close-menuitem",
      sortorder: 160,
      action: function() {
        bkHelper.closeNotebook();
      }
    }
  ];

  var menuItemPromise = bkHelper.newPromise({
    parent: "File",
    id: "file-menu",
    items: fileMenuItems
  });

  exports.getMenuItems = function() {
    return menuItemPromise;
  };
});
