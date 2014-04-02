/*
 *  Copyright 2014 TWO SIGMA INVESTMENTS, LLC
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
 * 'Notebook' menu plugin
 * This creates the 'Notebook' menu which contains menu items for user interaction with the content
 * of the loading notebook.
 */
(function() {
  'use strict';
  var menuItems = [
    {
      name: "Publish to web",
      action: function () {
        bkHelper.shareNotebook();
      },
      tooltip: "Share the notebook to a public web page"
    },
    {
      name: "Lock", action: function() {
      bkHelper.toggleNotebookLocked();
    },
      tooltip: "Lock notebook from further editing",
      isChecked: function() {
        return bkHelper.isNotebookLocked()
      }
    },
    {
      name: "Show stdout/err", action: function() {
      bkHelper.getBkNotebookViewModel().toggleShowOutput();
    },
      tooltip: "Show or hide the stdout and stderr.",
      isChecked: function() {
        var notebookViewModel = bkHelper.getBkNotebookViewModel();
        if (notebookViewModel) {
          return notebookViewModel.isShowingOutput();
        }
      }
    },
    // BEAKER-324 - delete all output button.
    {
      name: 'Delete all output cells',
      action: function() {
        bkHelper.deleteAllOutputCells();
      },
      tooltip: 'Deletes all of the output cells.'
    },
    {
      name: "Edit mode",
      items: [
        {
          name: "Normal",
          isChecked: function() {
            return bkHelper.getInputCellKeyMapMode() === "default";
          },
          action: function() {
            bkHelper.setInputCellKeyMapMode("default");
          }
        },
        {
          name: "Vim (limited support)",
          isChecked: function() {
            return bkHelper.getInputCellKeyMapMode() === "vim";
          },
          action: function() {
            bkHelper.setInputCellKeyMapMode("vim");
          }
        },
        {
          name: "Emacs",
          isChecked: function() {
            return bkHelper.getInputCellKeyMapMode() === "emacs";
          },
          action: function() {
            bkHelper.setInputCellKeyMapMode("emacs");
          }
        }
      ]
    },
    {
      name: "Plugin manager...",
      action: function() {
        bkHelper.getBkNotebookViewModel().showEvaluators();
      },
      tooltip: "Show evaluators settings"
    },
    {
      name: "Evaluate",
      items: [
        {
          name: "All",
          action: function() {
            bkHelper.evaluate("root");
          }
        },
        {
          name: "Initialization Cells",
          action: function() {
            bkHelper.evaluate("initialization");
          }
        }
      ],
      tooltip: "Evaluate cells"
    },
  ];
  var toAdd = {items: menuItems, parent: "Notebook"};
  pluginObj.onReady(toAdd);
})();
