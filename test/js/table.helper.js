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

  /*
 * The table element contains another two tables for header and data.
 * For data table the css selector is '.dataTables_scrollBody'
 * For header table the css selector is '.dataTables_scrollHead'
 */

  this.dataTablesIsEnabled = function(dtcontainer){
    var dataTables = dtcontainer.$('.dataTables_scroll');
    dataTables.waitForEnabled();
  };

  this.getDataTablesScrollBody = function(dtcontainer){
    return dtcontainer.$('.dataTables_scrollBody');
  };

  this.getDataTablesScrollHead = function(dtcontainer){
    return dtcontainer.$('.dataTables_scrollHead');
  };

  this.getAllRowsOfTable  = function(tblElement){
    return tblElement.$$('tr[role="row"]');
  };

  this.getCellOfTableBody = function(dtContainer, rowIndex, colIndex){
    var tblBody = this.getDataTablesScrollBody(dtContainer).$('tbody');
    return this.getAllRowsOfTable(tblBody)[rowIndex].$$('td.ui-selectee')[colIndex];
  };

  this.getAllRowsOfTableBody  = function(dtContainer){
    var tblBody = this.getDataTablesScrollBody(dtContainer).$('tbody');
    return this.getAllRowsOfTable(tblBody);
  };

  this.getCellOfTableHeader = function(dtContainer, colIndex){
    var tblHead = this.getDataTablesScrollHead(dtContainer);
    return this.getAllRowsOfTable(tblHead)[0].$$('th')[colIndex];
  };

};
module.exports = TableHelperObject;