/*
 *  Copyright 2018 TWO SIGMA OPEN SOURCE, LLC
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

var TableHelperObject = function () {

  this.getDataTablesScrollBody = function(dtcontainer){
    return dtcontainer.$('.dataTables_scrollBody');
  };

  this.getDataTablesScrollHead = function(dtcontainer){
    return dtcontainer.$('.dataTables_scrollHead');
  };

  this.getDataTableBody = function(dtcontainer){
    return this.getDataTablesScrollBody(dtcontainer).$('tbody');
  };

  this.dataTablesIsEnabled = function(dtcontainer){
    var dataTables = dtcontainer.$('.dataTables_scroll');
    dataTables.waitForEnabled();
  };

  this.getTableRow = function(tblElement, rowIndex){
    return this.getTableAllRows(tblElement)[rowIndex];
  };

  this.getTableAllRows  = function(tblElement){
    return tblElement.$$('tr[role="row"]');
  };

  this.getTableBodyCell = function(tblElement, rowIndex, colIndex){
    return this.getTableBodyRowAllCells(tblElement, rowIndex)[colIndex];
  };

  this.getTableBodyRowAllCells = function(tblElement, rowIndex){
    return this.getTableRow(tblElement, rowIndex).$$('td.ui-selectee');
  };

  this.getTableHeaderAllCells = function(tblElement){
    return this.getTableRow(tblElement, 0).$$('th');
  };

  this.getTableHeaderCell = function(tblElement, rowIndex){
    return this.getTableHeaderAllCells(tblElement, 0)[rowIndex];
  };

};
module.exports = TableHelperObject;