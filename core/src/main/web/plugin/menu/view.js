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
 * 'Notebook' menu plugin
 * This creates the 'Notebook' menu which contains menu items for user interaction with the content
 * of the loading notebook.
 */
define(function(require, exports, module) {
  'use strict';
  var menuItems = [
    {
      name: "Start Page",
      sortorder: 100,
      action: function() {
        bkHelper.gotoControlPanel();
      }
    },
    {
      name: 'Show Hierarchy',
      sortorder: 110,
      isChecked: function() {
        var notebookViewModel = bkHelper.getBkNotebookViewModel();
        return notebookViewModel.isHierarchyEnabled();
      },
      action: function() {
        var notebookViewModel = bkHelper.getBkNotebookViewModel();
        notebookViewModel.toggleHierarchyEnabled();
      }
    },
    {
      name: 'Advanced Mode',
      sortorder: 120,
      isChecked: function() {
        var notebookViewModel = bkHelper.getBkNotebookViewModel();
        return notebookViewModel.isAdvancedMode();
      },
      action: function() {
        var notebookViewModel = bkHelper.getBkNotebookViewModel();
        notebookViewModel.toggleAdvancedMode();
        bkHelper.httpPost("../beaker/rest/util/setUseAdvancedMode", {
          advancedmode: notebookViewModel.isAdvancedMode()
        });
      }
    },
    {
      name: "Show stdout/err",
      sortorder: 130,
      action: function() {
        bkHelper.getBkNotebookViewModel().toggleShowOutput();
      },
      tooltip: "Show or hide the stdout and stderr.",
      isChecked: function() {
        var notebookViewModel = bkHelper.getBkNotebookViewModel();
        if (notebookViewModel) {
          return notebookViewModel.isShowingOutput();
        }
      }
    }
  ];
  var menuItemPromise = bkHelper.newPromise({
    items: menuItems,
    id: "view-menu",
    parent: "View"
  });
  exports.getMenuItems = function() {
    return menuItemPromise;
  };
});
