/*
 *  Copyright 2017 TWO SIGMA OPEN SOURCE, LLC
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

require('jquery-ui/ui/widgets/selectable');

module.exports = function(TableScope) {
  TableScope.prototype.initRowSelectable = function() {
    var self = this;

    $(this.table.table().container()).selectable({
      filter: 'tr[role="row"]',
      selected: function( event, ui ) {
        setRowSelection(ui.selected, true);
      },
      unselected: function( event, ui ) {
        setRowSelection(ui.unselected, false);
      }
    });

    function setRowSelection(node, shouldSelect) {
      var row = self.table.row(node);
      var index = row.index();

      self.selected[index] = shouldSelect;
      $(row.node()).toggleClass('selected', shouldSelect);
      self.selectFixedColumnRow(index, shouldSelect);
    }
  };
};
