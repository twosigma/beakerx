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
        bkHelper.getBkNotebookViewModel().showEvaluators();
      },
      tooltip: "Show available languages and edit their settings"
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
      }
    },
    {
      name: 'Delete all output cells',
      sortorder: 120,
      action: function () {
        bkHelper.deleteAllOutputCells();
      },
      tooltip: 'Deletes all of the output cells.'
    },
    {
      name: "Run all cells",
      sortorder: 130,
      action: function() {
        bkHelper.evaluate("root");
      },
      tooltip: "Run all cells"
    },
    {
      name: "Edit mode",
      sortorder: 140
    }
  ];
  var toAdd = [
    {
      parent: "Notebook",
      items: menuItems
    },
    {
      parent: "Notebook",
      submenu: "Edit mode",
      items: [
        {
          name: "Normal",
          sortorder: 100,
          isChecked: function () {
            return bkHelper.getInputCellKeyMapMode() === "default";
          },
          action: function () {
            bkHelper.setInputCellKeyMapMode("default");
          }
        },
        {
          name: "Vim (limited support)",
          sortorder: 120,
          isChecked: function () {
            return bkHelper.getInputCellKeyMapMode() === "vim";
          },
          action: function () {
            bkHelper.setInputCellKeyMapMode("vim");
          }
        },
        {
          name: "Emacs",
          sortorder: 110,
          isChecked: function () {
            return bkHelper.getInputCellKeyMapMode() === "emacs";
          },
          action: function () {
            bkHelper.setInputCellKeyMapMode("emacs");
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
