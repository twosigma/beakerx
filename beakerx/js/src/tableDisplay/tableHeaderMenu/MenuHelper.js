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

function MenuHelper (tableScope) {
  return {
    doAlignment: function(el, key) {
      var container = el.closest('.bko-header-menu');
      var colIdx = container.data('columnIndex');

      //table variables
      var table = tableScope.table;
      var bodyColumn = table.column(colIdx).nodes().to$();
      var headerColumn = $(table.column(colIdx).header());
      //remove align class
      bodyColumn.removeClass('dtleft').removeClass('dtcenter').removeClass('dtright');
      headerColumn.removeClass('dtleft').removeClass('dtcenter').removeClass('dtright');

      //add align class
      switch (key){
        case 'L':
          bodyColumn.addClass('dtleft');
          headerColumn.addClass('dtleft');
          break;
        case 'C':
          bodyColumn.addClass('dtcenter');
          headerColumn.addClass('dtcenter');
          break;
        case 'R':
          bodyColumn.addClass('dtright');
          headerColumn.addClass('dtright');
          break;
      }

      //update align
      tableScope.getCellAlign[tableScope.colorder[colIdx] - 1] = key;
      tableScope.actualalign[tableScope.colorder[colIdx] - 1] = key;
      // bkSessionManager.setNotebookModelEdited(true); //TODO - check if needed
    },
    checkAlignment: function(container, key) {
      var colIdx = container.data('columnIndex');
      return tableScope.actualalign[tableScope.colorder[colIdx] - 1] === key;
    },
    doSorting: function(el, direction) {
      var container = el.closest('.bko-header-menu');
      var colIdx = container.data('columnIndex');

      if (_.contains(['asc', 'desc'], direction)) {
        tableScope.table.order([colIdx, direction]).draw();
      }
    },
    checkSorting: function(container, direction) {
      var order = tableScope.table.order();
      var colIdx = container.data('columnIndex');

      // server ordering
      if (0 === order.length) {
        return false;
      }

      if (_.contains(['asc', 'desc'], direction)) {
        return (order[0][0] == colIdx && order[0][1] == direction);
      } else {
        return (order[0][0] !== colIdx);
      }
    },
    doFixColumnLeft: function(el) {
      var container = el.closest('.bko-header-menu');
      var colIdx = container.data('columnIndex');
      var fixed = this.isFixedLeft(container);
      tableScope.pagination.fixLeft = fixed ? 0 : colIdx;
      tableScope.applyChanges();
    },
    doFixColumnRight: function(el) {
      var container = el.closest('.bko-header-menu');
      var colIdx = container.data('columnIndex');
      var fixed = this.isFixedRight(container);
      tableScope.pagination.fixRight = fixed ? 0 : tableScope.columns.length - colIdx;
      tableScope.applyChanges();
    },
    isFixedRight: function(container) {
      var colIdx = container.data('columnIndex');
      return tableScope.columns.length - colIdx === tableScope.pagination.fixRight;
    },
    isFixedLeft: function(container) {
      var colIdx = container.data('columnIndex');
      return tableScope.pagination.fixLeft === colIdx;
    }
  }
}

module.exports = MenuHelper;
