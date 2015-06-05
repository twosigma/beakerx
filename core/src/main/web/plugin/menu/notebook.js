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

define(function(require, exports, module) {
  'use strict';
  var menuItems = [
    {
      name: "Language manager...",
      sortorder: 100,
      action: function () {
        bkHelper.showLanguageManager();
      },
      tooltip: "Show available languages and edit their settings",
      id: "language-manager-menuitem"
    },
    {
      name: "Lock",
      sortorder: 110,
      action: function () {
        bkHelper.toggleNotebookLocked();
      },
      tooltip: "Lock notebook from further editing",
      isChecked: function () {
        return bkHelper.isNotebookLocked();
      },
      id: "lock-menuitem"
    },
    {
      name: 'Delete all output cells',
      sortorder: 120,
      action: function () {
        bkHelper.deleteAllOutputCells();
      },
      tooltip: 'Deletes all of the output cells.',
      id: "delete-all-menuitem"
    },
    {
      name: "Run all cells",
      sortorder: 130,
      action: function() {
        bkHelper.evaluateRoot("root");
      },
      tooltip: "Run all cells",
      id: "run-all-cells-menuitem"
    },
    {
      name: 'Collapse All Sections',
      sortorder: 135,
      action: bkHelper.collapseAllSections,
      id: "collapse-all-menuitem"
    },
    {
      name: "Edit mode",
      sortorder: 140,
      id: "edit-mode-menuitem"
    }
  ];
  var toAdd = [
    {
      parent: "Notebook",
      id: "notebook-menu",
      items: menuItems
    },
    {
      parent: "Notebook",
      submenu: "Edit mode",
      id: "edit-mode-menuitem",
      items: [
        {
          name: "Normal",
          sortorder: 100,
          id: "normal-edit-mode-menuitem",
          isChecked: function () {
            var notebookViewModel = bkHelper.getBkNotebookViewModel();
            console.log(notebookViewModel.getEditMode());
            return notebookViewModel.getEditMode() == "default"
                    || notebookViewModel.getEditMode() == null;
            // return bkHelper.getInputCellKeyMapMode() === "default";
          },
          action: function () {
            var notebookViewModel = bkHelper.getBkNotebookViewModel();
            notebookViewModel.setEditMode("default");
            bkHelper.httpPost("../beaker/rest/util/setPreference", {
              preferencename: "edit-mode",
              preferencevalue: "default"
            });
          }
        },
        {
          name: "Vim",
          sortorder: 120,
          id: "vim-edit-mode-menuitem",
          isChecked: function () {
            var notebookViewModel = bkHelper.getBkNotebookViewModel();
            console.log(notebookViewModel.getEditMode());
            return notebookViewModel.getEditMode() == "vim";
            // return bkHelper.getInputCellKeyMapMode() === "vim";
          },
          action: function () {
            var notebookViewModel = bkHelper.getBkNotebookViewModel();
            notebookViewModel.setEditMode("vim");
            bkHelper.httpPost("../beaker/rest/util/setPreference", {
              preferencename: "edit-mode",
              preferencevalue: "vim"
            });
          }
        },
        {
          name: "Emacs",
          sortorder: 110,
          id: "emacs-edit-mode-menuitem",
          isChecked: function () {
            var notebookViewModel = bkHelper.getBkNotebookViewModel();
            console.log(notebookViewModel.getEditMode());
            return notebookViewModel.getEditMode() == "emacs";
            // return bkHelper.getInputCellKeyMapMode() === "emacs";
          },
          action: function () {
            var notebookViewModel = bkHelper.getBkNotebookViewModel();
            notebookViewModel.setEditMode("emacs");
            bkHelper.httpPost("../beaker/rest/util/setPreference", {
              preferencename: "edit-mode",
              preferencevalue: "emacs"
            });
          }
        }
      ]
    }
  ];

  var menuItemPromise = bkHelper.newPromise(toAdd);

  exports.getMenuItems = function () {
    return menuItemPromise;
  };
});
