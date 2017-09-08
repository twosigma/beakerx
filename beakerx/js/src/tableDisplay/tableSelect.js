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
var _ = require('underscore');

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

  TableScope.prototype.selectCellsRange = function(startCellIndex, endCellIndex) {
    var rowIndexes = this.table.rows({ order: 'applied' }).indexes();
    var colIndexes = this.table.columns().indexes();
    var rowIndexPositions = [rowIndexes.indexOf(startCellIndex.row), rowIndexes.indexOf(endCellIndex.row)];
    var colIndexPositions = [colIndexes.indexOf(startCellIndex.column), colIndexes.indexOf(endCellIndex.column)];

    var minColumnPosition = Math.min.apply(null, colIndexPositions);
    var maxColumnPosition = Math.max.apply(null, colIndexPositions);
    var minRowPosition = Math.min.apply(null, rowIndexPositions);
    var maxRowPosition = Math.max.apply(null, rowIndexPositions);
    var rowSelector = rowIndexes.splice(minRowPosition, maxRowPosition - minRowPosition + 1);
    var columnSelector = colIndexes.splice(minColumnPosition, maxColumnPosition - minColumnPosition + 1);

    this.table.cells(rowSelector, columnSelector).select();
  };

  TableScope.prototype.initTableSelect = function() {
    var self = this;

    self.element.find('.DTFC_ScrollWrapper')
      .selectable({
        filter: 'tr[role="row"] td',
        delay: 150,
        cancel: 'thead',
        appendTo: self.element,
        start: function() {
          self.deselectCells(self.table.cells({ selected: true }));
        },
        stop: function() {
          var cells = self.table.cells('.ui-selected', { page: 'current' });
          var nodes = cells.nodes();

          cells.select();
          _.each(nodes, function (element) {
            $(element).removeClass('ui-selected').removeData('selectable-item');
          });

          cells = null;
        }
      })
      .on('click', 'td', function(e) {
        if (e.shiftKey) {
          return;
        }

        var cell = self.table.cell(e.target);
        var selected = cell.node().classList.contains('selected');
        var selectedCells = self.table.cells({ selected: true });

        selectedCells.deselect();
        (!selected || self.focusChanged || selectedCells.indexes().length > 1) && cell.select();

        self.focusChanged = false;
      });

    self.table
      .on('key-blur', function () {
        self.prevFocussedCell = _.clone(self.focussedCell);
        self.focussedCell = null;
      })
      .on('key-focus', function (e, datatable, cell, originalEvent) {
        self.focussedCell = cell.index();
        self.focusChanged = true;

        if (!originalEvent || !originalEvent.shiftKey) {
          return;
        }

        var selectedCells = self.table.cells({ selected: true });
        var firstCellIndex = selectedCells.indexes().pop();

        selectedCells.deselect();
        self.selectCellsRange(firstCellIndex, self.focussedCell);
      });
  };

  TableScope.prototype.destroyTableSelect = function() {
    var $scrollWrapper = this.element.find('.DTFC_ScrollWrapper');

    this.table.off('key-blur key-focus');

    if ($scrollWrapper.length) {
      $scrollWrapper.off('click', 'td');
      $scrollWrapper.selectable('instance') && $scrollWrapper.selectable('destroy');
    }

    $scrollWrapper = null;
  }
};
