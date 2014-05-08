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
 * 'File' menu plugin
 * This plugs in the 'File' menu that is the container of menu items like New, Open, Save,
 * Close for notebooks
 */
define(function(require, exports, module) {
  'use strict';
  var bunsenMenuItems = [
    {
      name: "Save",
      action: function() {
        bkBunsenHelper.saveNotebook();
      }
    },
    {
      name: "Save As",
      action: function() {
        bkBunsenHelper.saveNotebookAs();
      }
    }
  ];
  // var newNotebook = function() {
  //   bkHelper.getDefaultNotebook().then(function(notebookJSON) {
  //     bkHelper.loadNotebook(notebookJSON, true);
  //   });
  // };

  var menuItemPromise = bkHelper.newPromise({
    parent: "Bunsen",
    items: bunsenMenuItems
  });

  exports.getMenuItems = function() {
    return menuItemPromise;
  };

});

