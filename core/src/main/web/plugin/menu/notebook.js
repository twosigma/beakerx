/*
 *  Copyright 2014 TWO SIGMA OPEN SOURCE, LLC
 *
 *  Licensed under the Apache License, Version 2.0 (the 'License');
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an 'AS IS' BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

define(function(require, exports, module) {
  'use strict';
  var menuItems = [
    {
      name: 'Language manager...',
      shortcut: ["Alt-L", "Ctrl-L"],
      sortorder: 100,
      action: function () {
        bkHelper.showLanguageManager();
      },
      tooltip: 'Show available languages and edit their settings',
      id: 'language-manager-menuitem'
    },
    {
      name: 'Lock',
      sortorder: 110,
      action: function () {
        bkHelper.toggleNotebookLocked();
      },
      tooltip: 'Lock notebook from further editing',
      isChecked: function () {
        return bkHelper.isNotebookLocked();
      },
      id: 'lock-menuitem'
    },
    {
      name: 'Add new code cell',
      shortcut: ["Ctrl-Shift-A", "&#x2318;-Shift-A"],
      sortorder: 115,
      action: function () {
        bkHelper.appendCodeCell();
      },
      tooltip: 'Add new code cell',
      id: 'append-code-cell-menuitem'
    },
    {
      name: 'Delete all output cells',
      sortorder: 120,
      action: function () {
        bkHelper.deleteAllOutputCells();
      },
      tooltip: 'Deletes all of the output cells.',
      id: 'delete-all-menuitem'
    },
    {
      name: 'Find and replace',
      shortcut: ["Alt-F", "Ctrl-F"],
      sortorder: 125,
      action: function () {
        bkHelper.getBkNotebookViewModel().showSearchReplace();        
      },
      tooltip: 'Find and Replace...',
      id: 'find-replace'
    },
    {
      name: 'Run all cells',
      shortcut: 'F5',
      sortorder: 130,
      action: function() {
        bkHelper.runAllCellsInNotebook();
      },
      tooltip: 'Run all cells',
      id: 'run-all-cells-menuitem'
    },
    {
      name: 'Reset languages',
      shortcut: ["Alt-R", "Ctrl-R"],
      sortorder: 132,
      action: function() {
        bkHelper.resetAllKernelsInNotebook();
      },
      tooltip: 'Reset each language and run all init cells',
      id: 'reset-backends-menuitem'
    },
    {
      name: 'Collapse all sections',
      sortorder: 135,
      action: bkHelper.collapseAllSections,
      id: 'collapse-all-menuitem'
    },
    {
      name: 'Open all sections',
      sortorder: 137,
      action: bkHelper.openAllSections,
      id: 'open-all-menuitem'
    },
    {
      name: 'Edit mode',
      sortorder: 140,
      id: 'edit-mode-menuitem'
    }
  ];
  var toAdd = [
    {
      parent: 'Notebook',
      id: 'notebook-menu',
      items: menuItems
    },
    {
      parent: 'Notebook',
      submenu: 'Edit mode',
      id: 'edit-mode-menuitem',
      items: [
        {
          name: 'Normal',
          sortorder: 100,
          id: 'normal-edit-mode-menuitem',
          isRadio: true,
          isChecked: function() {
            var notebookViewModel = bkHelper.getBkNotebookViewModel();
            return notebookViewModel.getEditMode() == 'default' ||
                      notebookViewModel.getEditMode() == null;
          },
          action: function() {
            var notebookViewModel = bkHelper.getBkNotebookViewModel();
            notebookViewModel.setEditMode('default');
            bkHelper.httpPost('../beaker/rest/util/setPreference', {
              preferencename: 'edit-mode',
              preferencevalue: 'default'
            });
          }
        },
        {
          name: 'Vim',
          sortorder: 120,
          id: 'vim-edit-mode-menuitem',
          isRadio: true,
          isChecked: function() {
            var notebookViewModel = bkHelper.getBkNotebookViewModel();
            return notebookViewModel.getEditMode() == 'vim';
          },
          action: function() {
            var notebookViewModel = bkHelper.getBkNotebookViewModel();
            notebookViewModel.setEditMode('vim');
            bkHelper.httpPost('../beaker/rest/util/setPreference', {
              preferencename: 'edit-mode',
              preferencevalue: 'vim'
            });
          }
        },
        {
          name: 'Emacs',
          sortorder: 110,
          id: 'emacs-edit-mode-menuitem',
          isRadio: true,
          isChecked: function() {
            var notebookViewModel = bkHelper.getBkNotebookViewModel();
            return notebookViewModel.getEditMode() == 'emacs';
          },
          action: function() {
            var notebookViewModel = bkHelper.getBkNotebookViewModel();
            notebookViewModel.setEditMode('emacs');
            bkHelper.httpPost('../beaker/rest/util/setPreference', {
              preferencename: 'edit-mode',
              preferencevalue: 'emacs'
            });
          }
        },
        {
          name: 'Sublime',
          sortorder: 120,
          id: 'sublime-edit-mode-menuitem',
          isRadio: true,
          isChecked: function() {
            var notebookViewModel = bkHelper.getBkNotebookViewModel();
            return notebookViewModel.getEditMode() == 'sublime';
          },
          action: function() {
            var notebookViewModel = bkHelper.getBkNotebookViewModel();
            notebookViewModel.setEditMode('sublime');
            bkHelper.httpPost('../beaker/rest/util/setPreference', {
              preferencename: 'edit-mode',
              preferencevalue: 'sublime'
            });
          }
        }
      ]
    }
  ];

  var menuItemPromise = bkHelper.newPromise(toAdd);

  exports.getMenuItems = function() {
    return menuItemPromise;
  };
});
