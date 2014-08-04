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
      name: "Rename notebook",
      action: function() {
        bkHelper.showDefaultSavingFileChooser().then(function(ret) {
          if (ret.uri) {
            return bkHelper.saveNotebookAs(ret.uri, ret.uriType);
          }
        });
      },
      tooltip: "Rename a notebook"
    },
    {
      name: "Lock", action: function() {
      bkHelper.toggleNotebookLocked();
    },
      tooltip: "Lock notebook from further editing",
      isChecked: function() {
        return bkHelper.isNotebookLocked();
      }
    }
  ];

  var menuItemPromise = bkHelper.newPromise({
    parent: "Edit",
    items: menuItems
  });

  exports.getMenuItems = function() {
    return menuItemPromise;
  };
});
