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
        bkHelper.backupNotebook().then(function() {
          parent.$(parent.document).trigger('beaker.embedded.newNotebook', [window.beakerRegister.bunsenNotebookId]);
        });
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
        bkHelper.backupNotebook().then(function() {
          parent.$(parent.document).trigger('beaker.embedded.saveAs', [window.beakerRegister.bunsenNotebookId]);
        });
      }
    },
    {
      name: "Save with comments...",
      id: "save-with-comment-menuitem",
      sortorder: 150,
      tooltip: "Save notebook and add comment",
      action: function() {
        bkHelper.backupNotebook().then(function() {
          parent.$(parent.document).trigger('beaker.embedded.saveWithComments', [window.beakerRegister.bunsenNotebookId]);
        });
      }
    },
    {
      name: "Rename...",
      id: "rename-menuitem",
      sortorder: 160,
      tooltip: "Rename notebook",
      action: function() {
        bkHelper.backupNotebook().then(function() {
          parent.$(parent.document).trigger('beaker.embedded.rename', [window.beakerRegister.bunsenNotebookId]);
        });
      }
    },
    {
      name: "Export...",
      id: "export-menuitem",
      sortorder: 170,
      tooltip: "Export notebook",
      action: function() {
        bkHelper.backupNotebook().then(function() {
          parent.$(parent.document).trigger('beaker.embedded.export', [window.beakerRegister.bunsenNotebookId]);
        });
      }
    },
    {
      name: "Send...",
      id: "send-menuitem",
      sortorder: 180,
      tooltip: "Send notebook",
      action: function() {
        bkHelper.backupNotebook().then(function() {
          parent.$(parent.document).trigger('beaker.embedded.send', [window.beakerRegister.bunsenNotebookId]);
        });
      }
    },
    {
      name: "Publish...",
      id: "publish-menuitem",
      sortorder: 190,
      tooltip: "Publish notebook",
      action: function() {
        bkHelper.backupNotebook().then(function() {
          parent.$(parent.document).trigger('beaker.embedded.publish', [window.beakerRegister.bunsenNotebookId]);
        });
      },
      locked: function() {
        return window.beakerRegister.canPublish !== true;
      }
    },
    {
      name: "Publish As Blog...",
      id: "blog-menuitem",
      sortorder: 200,
      tooltip: "Publish notebook as blog post",
      action: function() {
        bkHelper.backupNotebook().then(function() {
          parent.$(parent.document).trigger('beaker.embedded.blog', [window.beakerRegister.bunsenNotebookId]);
        });
      },
      locked: function() {
        return window.beakerRegister.canBlog !== true;
      }
    },
    {
      name: "Close",
      id: "close-menuitem",
      sortorder: 200,
      action: function() {
        bkHelper.backupNotebook().then(function() {
          parent.$(parent.document).trigger('beaker.embedded.close', [window.beakerRegister.bunsenNotebookId]);
        });
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
