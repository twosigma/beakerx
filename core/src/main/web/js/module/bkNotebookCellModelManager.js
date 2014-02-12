/*
 *  Copyright 2014 TWO SIGMA INVESTMENTS, LLC
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
 * M_bkNotebookCellModelManager
 * Notebook Cell Model doesn't own the notebook model.
 */
(function () {
    'use strict';

    var module = angular.module("M_bkNotebookCellModelManager", []);
    module.factory("bkNotebookCellModelManager", function () {
        var cells = [];
        var cleanup = function () {
        };

        var cellOp = {
            getIndex: function (id) {
                for (var i = 0; i < cells.length; ++i) {
                    if (cells[i].id === id) {
                        return i;
                    }
                }
                return -1;
            },
            getCellAtIndex: function (index) {
                return cells[index];
            },
            getCell: function (id) {
                return _(cells).find(function (cell) {
                    return cell.id === id;
                });
            },
            getCellType: function (id) {
                return this.getCell(id).type;
            },
            getCellLevel: function () {

            },
            getChildren: function (id) {
                var target = this.getCell(id);
                if (target.type !== "section") {
                    return [];
                }
                var i, cell, children = [];
                for (i = this.getIndex(id) + 1; i < cells.length; ++i) {
                    cell = cells[i];
                    if (cell.level && cell.level <= target.level) {
                        break;
                    }
                    children.push(cell);
                }
                return children;
            },
            insertBefore: function (id, cell) {
                var index = this.getIndex(id);
                if (index !== -1) {
                    cells.splice(index, 0, cell);
                } else {
                    throw "target cell " + id + " was not found";
                }
            },
            insertAfter: function (id, cell) {
                var index = this.getIndex(id);
                if (index !== -1) {
                    cells.splice(index + 1, 0, cell);
                } else {
                    throw "target cell " + id + " was not found";
                }
            },
            moveUp: function (id) {
                var index = this.getIndex(id);
                if (index !== -1) {
                    if (index === 0) {
                        return;
                    } else {
                        var cell = this.getCell(id);
                        cells[index] = this.getCellAtIndex(index - 1);
                        cells[index - 1] = cell;
                    }
                } else {
                    throw "target cell " + id + " was not found";
                }
            },
            moveDown: function (id) {
                var index = this.getIndex(id);
                if (index !== -1) {
                    if (index === cells.length - 1) {
                        return;
                    } else {
                        var cell = this.getCell(id);
                        cells[index] = this.getCellAtIndex(index + 1);
                        cells[index + 1] = cell;
                    }
                } else {
                    throw "target cell " + id + " was not found";
                }
            },
            delete: function (id) {
                var index = this.getIndex(id);
                if (index !== -1) {
                    cells.splice(index, 1);
                }
            },
            deleteSection: function (id) {
                var cell = this.getCell(id);
                if (!cell) {
                    throw "target cell " + id + " was not found";
                }
                if (cell.type !== "section") {
                    throw "target cell " + id + " is not a section cell";
                }
                var index = this.getIndex(id);
                var children = this.getChildren(id);
                cells.splice(index, children.length + 1);
                return [cell].concat(children);
            }
        };

        return {
            reset: function (_cells_) {
                /* reset the notebook cell model to be managed */
                cleanup();
                cells = _cells_;
            },
            cellOp: cellOp,
            getCells: function () {
                return cells;
            }
        };
    });
})();

//function helloWorld() {
//    return "Hello world!";
//}