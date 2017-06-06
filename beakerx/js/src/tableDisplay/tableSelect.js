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
      filter: 'tr[role="row"] td',
      delay: 150,
      stop: function( event, ui ) {
        var cells = self.table.cells('.ui-selected');

        self.table.cells({ selected: true }).deselect();
        cells.select();
      }
    });
  };
};
