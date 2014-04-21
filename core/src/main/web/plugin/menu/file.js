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
(function() {
  'use strict';

  var fileMenuItems = [
    {
      name: "New",
      action: function() {
        bkHelper.newSession();
      },
      tooltip: "Open a new notebook with default languages (Evaluators)"
    },
    {
      name: "Open",
      autoReduce: true,
      items: []
    },
    {
      name: "Save",
      action: function() {
        bkHelper.saveNotebook();
      }
    },
    {
      name: "Close",
      action: function() {
        bkHelper.closeNotebook();
      }
    },
    {
      name: "Open recent",
      items: function() {
        return bkHelper.getRecentMenuItems();
      }
    },
    {
      name: "Control panel",
      action: function() {
        bkHelper.gotoControlPanel();
      }
    },
    {
      name: "Save As",
      autoReduce: true,
      items: []
    }
//        ,
//        {
//            name: "Current open",
//            items: function() {
//                return bkHelper.getCurrentOpenMenuItems();
//            }
//        }
  ];
  var toAdd = {items: fileMenuItems, parent: "File"};
  pluginObj.onReady(toAdd);
})();
