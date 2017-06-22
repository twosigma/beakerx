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

  TableScope.prototype.deselectCells = function(cells) {
    var $selected = $(cells.nodes()).filter('.ui-selected');

    cells.deselect();
    $selected.each(function () {
      var selectee = $.data(this, "selectable-item");

      $(this).removeClass('ui-selected');

      if (selectee) {
        selectee.selected = false;
        selectee.startselected = false;
      }
    });
  };

  TableScope.prototype.selectCellsRange = function(startCellIndex, endCell) {
    var cellIndex = endCell.index();
    var minColumnIndex = Math.min(startCellIndex.column, cellIndex.column);
    var maxColumnIndex = Math.max(startCellIndex.column, cellIndex.column);
    var minRowIndex = Math.min(startCellIndex.row, cellIndex.row);
    var maxRowIndex = Math.max(startCellIndex.row, cellIndex.row);
    var rowSelector = _.range(minRowIndex, maxRowIndex + 1);
    var columnSelector = _.range(minColumnIndex, maxColumnIndex + 1);

    this.table.cells(rowSelector, columnSelector).select();
  };

  TableScope.prototype.initTableSelect = function() {
    var self = this;

    $(this.table.table().container())
      .selectable({
        filter: 'tr[role="row"] td',
        delay: 150,
        cancel: 'thead',
        appendTo: self.element,
        start: function() {
          self.deselectCells(self.table.cells({ selected: true }));
        },
        stop: function() {
          var cells = self.table.cells('.ui-selected');

          cells.select();
          $(self.element).find('.ui-selected').removeClass('ui-selected');
        }
      })
      .on('click', 'td', function(e) {
        if (e.shiftKey) {
          return;
        }

        var cell = self.table.cell(e.target);
        var selected = cell.node().classList.contains('selected');

        self.table.cells({ selected: true }).deselect();
        !selected && cell.select();
      });

    self.table
      .on('key-blur', function () {
        self.focussedCell = null;
      })
      .on('key-focus', function (e, datatable, cell, originalEvent) {
        self.focussedCell = cell.index();

        if (!originalEvent.shiftKey) {
          return;
        }

        var selectedCells = self.table.cells({ selected: true });
        var selectedCellsIndexes = selectedCells.indexes();
        var minSelectedRowIndex = Math.min.apply(null, selectedCellsIndexes.pluck('row').sort().unique());
        var minSelectedColumnIndex = Math.min.apply(null, selectedCellsIndexes.pluck('column').sort().unique());

        selectedCells.deselect();
        self.selectCellsRange({ row: minSelectedRowIndex, column: minSelectedColumnIndex }, cell);
      });
  };
};
