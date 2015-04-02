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
      sortorder: 100,
      id: "new-notebook-menuitem",
      action: function() {
        bkHelper.newSession(true);
      },
      tooltip: "Open a new empty notebook, add the languages of your choice"
    },
    {
      name: "New Beaker window",
      sortorder: 105,
      id: "new-beaker-window-menuitem",
      action: function() {
        window.open('/beaker', '_blank');
      },
      tooltip: "Open a new browser tab or window to work on more than one notebook at the same time"
    },
    {
      name: "Open",
      id: "open-menuitem",
      sortorder: 110
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
      id: "save-menuitem",
      sortorder: 130,
      action: function() {
        bkHelper.saveNotebook();
      }
    },
    {
      name: "Save As",
      id: "save-as-menuitem",
      sortorder: 140,
      autoReduce: true,
      items: []
    },
    {
      name: "Share to Web",
      sortorder: 150,
      id: "share-to-web-menuitem",
      action: function () {
        bkHelper.shareNotebook();
      },
      tooltip: "Share the notebook to a public web page using an anonymous github gist"
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
