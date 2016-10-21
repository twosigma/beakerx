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
        parent.$(parent.document).trigger('beaker.embedded.newNotebook', []);
      },
      tooltip: "Open a new empty notebook, add the languages of your choice"
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
      tooltip: "Save notebook with new name",
      action: function() {
        parent.$(parent.document).trigger('beaker.embedded.saveAs', []);
      }
    },
    {
      name: "Save with comments...",
      id: "save-with-comment-menuitem",
      sortorder: 150,
      tooltip: "Save notebook and add comment",
      action: function() {
        parent.$(parent.document).trigger('beaker.embedded.saveWithComments', []);
      }
    },
    {
      name: "Rename...",
      id: "rename-menuitem",
      sortorder: 160,
      tooltip: "Rename notebook",
      action: function() {
        // TODO save it first
        parent.$(parent.document).trigger('beaker.embedded.rename', []);
      }
    },
    {
      name: "Export...",
      id: "export-menuitem",
      sortorder: 170,
      tooltip: "Export notebook",
      action: function() {
        // TODO save it first
        parent.$(parent.document).trigger('beaker.embedded.export', []);
      }
    },
    {
      name: "Send...",
      id: "send-menuitem",
      sortorder: 180,
      tooltip: "Send notebook",
      action: function() {
        // TODO save it first
        parent.$(parent.document).trigger('beaker.embedded.send', []);
      }
    },
    {
      name: "View History...",
      id: "history-menuitem",
      sortorder: 190,
      tooltip: "View History",
      action: function() {
        parent.$(parent.document).trigger('beaker.embedded.history', []);
      }
    },
/*
{
      name: "Publish...",
      sortorder: 145,
      id: "publish-menuitem",
      action: function () {
        bkHelper.showPublishForm();
      },
      tooltip: "Publish the notebook to Beaker Publications"
    },
    */
    {
      name: "Close",
      id: "close-menuitem",
      sortorder: 200,
      action: function() {
        parent.$(parent.document).trigger('beaker.embedded.close', []);
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
