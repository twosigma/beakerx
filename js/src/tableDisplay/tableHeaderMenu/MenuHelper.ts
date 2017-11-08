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

import _ from 'underscore';
import $ from 'jquery';

export default class MenuHelper {
  private tableScope: any;

  constructor(tableScope) {
    this.tableScope = tableScope;
  }

  doAlignment(colIdx: number, key: string) {
    //table variables
    const table = this.tableScope.table;
    const bodyColumn = table.column(colIdx).nodes().to$();
    const headerColumn = $(table.column(colIdx).header());
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
    this.tableScope.getCellAlign[this.tableScope.colorder[colIdx] - 1] = key;
    this.tableScope.actualalign[this.tableScope.colorder[colIdx] - 1] = key;
    // bkSessionManager.setNotebookModelEdited(true); //TODO - check if needed
  }

  checkAlignment(colIdx: number, key: string) {
    return this.tableScope.actualalign[this.tableScope.colorder[colIdx] - 1] === key;
  }

  doSorting(colIdx: number, direction: string) {
    if (_.contains(['asc', 'desc'], direction)) {
      this.tableScope.table.order([colIdx, direction]).draw();
    }
  }

  checkSorting(colIdx: number, direction?: string) {
    const order = this.tableScope.table.order();

    // server ordering
    if (0 === order.length) {
      return false;
    }

    if (_.contains(['asc', 'desc'], direction)) {
      return (order[0][0] == colIdx && order[0][1] == direction);
    } else {
      return (order[0][0] !== colIdx);
    }
  }

  doFixColumnLeft(colIdx: number) {
    const fixed = this.isFixedLeft(colIdx);
    this.tableScope.pagination.fixLeft = fixed ? 0 : colIdx;
    this.tableScope.applyChanges();
  }

  doFixColumnRight(colIdx: number) {
    const fixed = this.isFixedRight(colIdx);
    this.tableScope.pagination.fixRight = fixed ? 0 : this.tableScope.columns.length - colIdx;
    this.tableScope.applyChanges();
  }

  isFixedRight(colIdx: number) {
    return this.tableScope.columns.length - colIdx === this.tableScope.pagination.fixRight;
  }

  isFixedLeft(colIdx: number) {
    return this.tableScope.pagination.fixLeft === colIdx;
  }
}
