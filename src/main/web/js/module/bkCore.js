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
 * M_bkCore
 * Holds the core of beaker utilities. It wraps of lower level utilities that come from other modules.
 * The user facing directives also use the core as a communication/exchange layer.
 */
(function () {
    'use strict';
    var bkCore = angular.module('M_bkCore', [
        'ui.bootstrap',
        'ui.keypress',
        'M_generalUtils',
        'M_angularUtils',
        'M_commonUI',
        'M_bkUtils',
        'M_bkRecentMenu'
    ]);

    /**
     * bkBaseSessionModel
     * - manages run-time session properties + notebook model
     * e.g. sessionID, notebook URL, ...
     * - should be the gateway to interact with the overall notebook model
     * - cellOps
     * - insert/remove/move cells
     * - currently assumes the default hierarchical layout
     * - there is only one copy of the model, every changes should be reflected immediately
     */
    /**
     * For some historical reason, tagMap is reserved for describing the hierarchical (single-tree) layout
     * All other arbitrary tagging should go under tagMap2
     */
    bkCore.factory('bkBaseSessionModel', function (generalUtils) {
        var _notebookModel = {};
        var _notebookUrl = "";
        var _sessionID = null;
        var _caption = "";
        var _edited = false;
        var _cellOps = {
            getCell: function (cellID) {
                return _.find(_notebookModel.cells, function (it) {
                    return it.id === cellID;
                });
            },
            isCellOfClass: function (cellID, className) {
                return _.contains(this.getCell(cellID).class, className);
            },
            isContainer: function (cellID) {
                return _notebookModel
                    && _notebookModel.tagMap
                    && _notebookModel.tagMap.hasOwnProperty(cellID);
            },

            // collect a list of cell objects
            getChildren: function (cellID) {
                if (_notebookModel && _notebookModel.tagMap) {
                    return _.map(_notebookModel.tagMap[cellID], function (childCellID) {
                        return _.find(_notebookModel.cells, function (it) {
                            return it.id === childCellID;
                        });
                    });
                }
            },

            // get a list of IDs
            _getChildrenIDs: function (cellID) {
                return _notebookModel.tagMap[cellID];
            },
            getChildrenIDs: function (cellID) {
                return _.clone(this._getChildrenIDs(cellID));
            },
            getAllDescendants: function (cellID) {
                var descendantCellIDs = this.getAllDescendantIDs(cellID);
                var getCell = this.getCell;
                return _.map(descendantCellIDs, function (it) {
                    return getCell(it);
                });
            },
            getAllDescendantIDs: function (cellID) {
                var cID, children, decendants = [];
                var stack = [cellID];
                while (!_.isEmpty(stack)) {
                    cID = stack.pop();
                    if (this.isContainer(cID)) {
                        children = this.getChildrenIDs(cID);
                        if (!_.isEmpty(children)) {
                            decendants = decendants.concat(children);
                            stack = stack.concat(children);
                        }
                    }
                }
                return decendants;
            },

            // get the first parent found
            getParentID: function (cellID) {
                for (var key in _notebookModel.tagMap) {
                    if (_notebookModel.tagMap.hasOwnProperty(key)) {
                        if (_.contains(_notebookModel.tagMap[key], cellID)) {
                            return key;
                        }
                    }
                }
            },
            // get the parent(ancestor) at the specified level,
            // if level is not provided, get the direct parent
            // The result returned is a 2 element array.
            // The first element is the parent cell
            // The second element is the index of the children of
            // parent(1st element) that contains the given cell.
            getParent: function (cellID, level) {
                if (level === undefined) {
                    level = this.getLevel(cellID) - 1;
                }
                var parent = cellID;
                var parents = [];
                var indicies = [];
                while (parent) {
                    parents.push(parent);
                    var pp = this.getParentID(parent);
                    if (pp) {
                        indicies.push(this.getIndex(parent, pp));
                    } else {
                        indicies.push(0);
                    }
                    parent = pp;
                }
                var i = parents.length - 1 - level;
                if (i - 1 < 0 || i >= parents.length) {
                    // There is no parent at level
                    return;
                }
                return [parents[i], indicies[i - 1]];
            },

            // return a boolean indicating whether a given cell is the first
            // among its siblings.
            isLeftMost: function (cellID, parentID) {
                var siblings = this.getSiblings(cellID, parentID);
                return cellID === siblings[0];
            },

            // return a boolean indicating whether a given cell is the last
            // among its siblings.
            isRightMost: function (cellID, parentID) {
                var siblings = this.getSiblings(cellID, parentID);
                return cellID === siblings[siblings.length - 1];
            },


            // get the left most non-section cell
            getLeftMostChildren: function (containerCellID) {
                var cID, children;
                var stack = [containerCellID];
                while (!_.isEmpty(stack)) {
                    cID = stack.pop();
                    if (this.isContainer(cID)) {
                        children = this.getChildrenIDs(cID);
                        if (!_.isEmpty(children)) {
                            stack = stack.concat(children.reverse());
                        }
                    } else {
                        return cID;
                    }
                }
                return null;
            },
            // get the next non-section cell
            getNext: function (cellID) {
                var cID, children;
                var stack = ["root"];
                var inputCellFound = false;
                while (!_.isEmpty(stack)) {
                    cID = stack.pop();
                    if (this.isContainer(cID)) {
                        children = this.getChildrenIDs(cID);
                        if (!_.isEmpty(children)) {
                            stack = stack.concat(children.reverse());
                        }
                    } else {
                        if (inputCellFound) {
                            return cID;
                        } else if (cID === cellID) {
                            inputCellFound = true;
                        }
                    }
                }
                return null;
            },
            // get the prev non-section cell
            getPrev: function (cellID) {
                var cID, children;
                var stack = ["root"];
                var inputCellFound = false;
                while (!_.isEmpty(stack)) {
                    cID = stack.pop();
                    if (this.isContainer(cID)) {
                        children = this.getChildrenIDs(cID);
                        if (!_.isEmpty(children)) {
                            stack = stack.concat(children);
                        }
                    } else {
                        if (inputCellFound) {
                            return cID;
                        } else if (cID === cellID) {
                            inputCellFound = true;
                        }
                    }
                }
                return null;
            },
            insertSection: function (targetCellID, level) {
                if (this.isContainer(targetCellID)) {
                    this._insertSectionToSection(targetCellID, level);
                } else {
                    this._insertSectionAfterALeave(targetCellID, level);
                }
            },
            /**
             * create a new section cell of the specified level and insert it
             * to the beginning of an existing section
             * @param sectionCellID Insert to the head this sectionCell
             * @param level The level of the new section
             * @returns null
             */
            _insertSectionToSection: function (sectionCellID, level) {
                // parent the new section is going to attach to
                var parent = this.getParent(sectionCellID, level - 1);
                var parentID, index;
                if (parent) {
                    parentID = parent[0];
                    index = parent[1];
                } else {
                    parentID = sectionCellID;
                    index = -1;
                }

                var newSectionCell = this.newSectionCell();

                // DFS
                var cID, children;
                var stack = ["root"];
                var targetFound = false;
                var newSectionCellMap = [];
                var toDelete = [];
                while (!_.isEmpty(stack)) {
                    cID = stack.pop();
                    if (!targetFound) {
                        if (this.isContainer(cID)) {
                            children = this.getChildrenIDs(cID);
                            if (!_.isEmpty(children)) {
                                stack = stack.concat(children.reverse());
                            }
                            if (cID === sectionCellID) {
                                targetFound = true;
                            }
                        }
                    } else {
                        if (this.isContainer(cID) && this.getLevel(cID) <= level) {
                            if (this.getLevel(cID) === level && this.getCell(cID).hideTitle) {
                                _.each(this.getChildrenIDs(cID), function (ccID) {
                                    _cellOps.moveTo(ccID, newSectionCell.id);
                                });
                                toDelete.push(cID);
                            } else {
                                break;
                            }
                        }
                        _cellOps.moveTo(cID, newSectionCell.id);
                    }
                }
                _.each(toDelete, function (ccID) {
                    _cellOps.deleteCell(ccID);
                });

                this.attach(newSectionCell.id, parentID, index + 1);
                while (this.getLevel(newSectionCell.id) < level) {
                    this.moveLeft(newSectionCell.id);
                }
            },
            /**
             * create a new section cell of the specified level and insert it
             * to after a given leave cell (e.g. code, text, markdown)
             * @param sectionCellID Insert to the head this sectionCell
             * @param level The level of the new section
             * @returns null
             */
            _insertSectionAfterALeave: function (
                codeCellID, // insert after this code cell
                level // the level of the new section
                )
            {
                // parent the new section is going to attach to
                var parent = this.getParent(codeCellID, level - 1);
                if (!parent) {
                    parent = this.getParent(codeCellID);
                }
                var parentID = parent[0];
                var index = parent[1];
                var newSectionCell = this.newSectionCell();

                // DFS
                var cID, children;
                var stack = ["root"];
                var codeCellFound = false;
                var newSectionCellMap = [];
                var toDelete = [];
                while (!_.isEmpty(stack)) {
                    cID = stack.pop();
                    if (!codeCellFound) {
                        if (this.isContainer(cID)) {
                            children = this.getChildrenIDs(cID);
                            if (!_.isEmpty(children)) {
                                stack = stack.concat(children.reverse());
                            }
                        } else {
                            if (cID === codeCellID) {
                                codeCellFound = true;
                            }
                        }
                    } else {
                        if (this.isContainer(cID) && this.getLevel(cID) <= level) {
                            if (this.getLevel(cID) === level && this.getCell(cID).hideTitle) {
                                _.each(this.getChildrenIDs(cID), function (ccID) {
                                    _cellOps.moveTo(ccID, newSectionCell.id);
                                });
                                toDelete.push(cID);
                            } else {
                                break;
                            }
                        }
                        _cellOps.moveTo(cID, newSectionCell.id);
                    }
                }
                _.each(toDelete, function (ccID) {
                    _cellOps.deleteCell(ccID);
                });

                this.attach(newSectionCell.id, parentID, index + 1);
                while (this.getLevel(newSectionCell.id) < level) {
                    this.moveLeft(newSectionCell.id);
                }
            },

            getLevel: function (cellID) {
                var level = 0;
                var parent = this.getParentID(cellID);
                while (parent) {
                    parent = this.getParentID(parent);
                    level++;
                }
                return level;
            },
            getSiblings: function (cellID, parentID) { // return a list of IDs of Siblings
                var siblings;
                if (parentID) {
                    siblings = _notebookModel.tagMap[parentID];
                } else {
                    siblings = _.find(_notebookModel.tagMap, function (it) {
                        return it.indexOf(cellID) !== -1;
                    });
                }
                return siblings;
            },
            getIndex: function (cellID, parentID) {
                return this.getSiblings(cellID, parentID).indexOf(cellID);
            },
            deleteCell: function (cellID, deleteChildrenToo) {
                if (deleteChildrenToo === undefined) {
                    deleteChildrenToo = true;
                }

                // if this is a container(section cell), either delete all children or move children up 1 level
                // and insert them to where the cell being deleted currently occupies.
                if (_cellOps.isContainer(cellID)) {
                    var children = _cellOps.getChildrenIDs(cellID);
                    if (children) {
                        if (deleteChildrenToo) {
                            _.each(children.slice(0), _cellOps.deleteCell);
                        } else {
                            var parentID = _cellOps.getParentID(cellID);
                            var thisIndex = _cellOps.getIndex(cellID, parentID);
                            var childID;
                            for (var i = 0; i < children.length; i++) {
                                childID = children[i];
                                _cellOps.detach(childID, cellID);
                                _cellOps.attach(childID, parentID, thisIndex + 1 + i);
                            }
                        }
                    }
                    delete _notebookModel.tagMap[cellID];
                }

                // remove it from all the tag maps that have it
                _.each(_notebookModel.tagMap, function (it) {
                    var index = it.indexOf(cellID);
                    if (index !== -1) {
                        it.splice(index, 1);
                    }
                });
                _.each(_notebookModel.tagMap2, function (it) {
                    var index = it.indexOf(cellID);
                    if (index !== -1) {
                        it.splice(index, 1);
                    }
                });

                // remove it from the cells list
                var cellObj = _.find(_notebookModel.cells, function (it) {
                    return it.id === cellID;
                });
                _notebookModel.cells.splice(_notebookModel.cells.indexOf(cellObj), 1);
                _edited = true;
            },
            detach: function (cellID, parentID) {
                // detach just removes the cell from one tagMap (if parentID is not provided,
                // it will find the first tagMap that has it). The difference btw detach
                // and deleteCell is that deleteCell removes the cell completely, while
                // detach is more a temporary operation that is usually followed by attach.
                // deleteCell removes the cell from every tagMap, detach doesn't.
                // deleteCell removes the cell from 'cells' list, detach doesn't.
                var siblings = this.getSiblings(cellID, parentID);
                var index = siblings.indexOf(cellID);
                if (index !== -1) {
                    siblings.splice(index, 1);
                    _edited = true;
                }
                return index;
            },
            attach: function (cellID, parentID, index) {
                if (!parentID) {
                    parentID = "root";
                }
                var list = _notebookModel.tagMap[parentID];
                if (!index && index !== 0) { // if index is not specified
                    index = list.length; // append to tail
                }
                list.splice(index, 0, cellID);
                _edited = true;
            },
            moveTo: function (cellID, toParentID, index, fromParentID) {
                this.detach(cellID, fromParentID);
                this.attach(cellID, toParentID, index);
            },
            newCodeCell: function (cellID, evaluator) {
                var tail = _notebookModel.cells.length - 1;
                if (!cellID) {
                    cellID = "code" + generalUtils.generateID(6);
                }
                if (!evaluator) {
                    evaluator = _notebookModel.evaluators[0].name;
                }
                var newCell = {
                    "id": cellID,
                    "class": ["code"],
                    "evaluator": evaluator,
                    "input": {
                        "body": ""
                    },
                    "output": {}
                };
                _cellTagOps.addTag(cellID, evaluator);
                _notebookModel.cells.splice(tail, 0, newCell);
                return newCell;
            },
            newSectionCell: function (cellID, title) {
                var tail = _notebookModel.cells.length - 1;
                if (!cellID) {
                    cellID = "Section" + generalUtils.generateID(6);
                }
                _notebookModel.tagMap[cellID] = [];
                var newCell = {
                    "id": cellID,
                    "class": ["section", "container"],
                    "title": title !== undefined ? title : "New Section"
                };
                _notebookModel.cells.splice(tail, 0, newCell);
                return newCell;
            },
            newTextCell: function (cellID) {
                var tail = _notebookModel.cells.length - 1;
                if (!cellID) {
                    cellID = "text" + generalUtils.generateID(6);
                }
                var newCell = {
                    "id": cellID,
                    "class": ["text"],
                    "body": "New <b>text</b> cell"
                };
                _notebookModel.cells.splice(tail, 0, newCell);
                return newCell;
            },
            newMarkdownCell: function (cellID) {
                var tail = _notebookModel.cells.length - 1;
                if (!cellID) {
                    cellID = "markdown" + generalUtils.generateID(6);
                }
                var newCell = {
                    "id": cellID,
                    "class": ["markdown"],
                    "body": ""
                };
                _notebookModel.cells.splice(tail, 0, newCell);
                return newCell;
            },
            moveUp: function (cellID, parentID) {
                if (!parentID) {
                    parentID = this.getParentID(cellID);
                }
                var index = this.getIndex(cellID, parentID);
                if (index > 0) {
                    this.detach(cellID, parentID);
                    this.attach(cellID, parentID, index - 1);
                }
            },
            moveDown: function (cellID, parentID) {
                if (!parentID) {
                    parentID = this.getParentID(cellID);
                }
                var siblings = this.getSiblings(cellID, parentID);
                var index = siblings.indexOf(cellID);
                if (index < siblings.length - 1) {
                    this.detach(cellID, parentID);
                    this.attach(cellID, parentID, index + 1);
                }
            },
            moveLeft: function (cellID, parentID) {
                // level++
                if (!parentID) {
                    parentID = this.getParentID(cellID);
                }
                var newSection = this.newSectionCell();
                newSection.hideTitle = true;
                var index = this.detach(cellID, parentID);
                this.attach(newSection.id, parentID, index);
                this.attach(cellID, newSection.id);
            },
            moveRight: function (cellID, parentID) {
                // level--
                if (!parentID) {
                    parentID = this.getParentID(cellID);
                }
                var grandParentID = this.getParentID(parentID);
                if (!grandParentID) {
                    return;
                }
                var siblings = this.getSiblings(cellID, parentID);
                var index = siblings.indexOf(cellID);
                var parentIndex = this.getIndex(parentID, grandParentID);
                if (siblings.length === 1) {
                    this.detach(cellID, parentID);
                    this.detach(parentID, grandParentID);
                    this.attach(cellID, grandParentID);
                    this.deleteCell(parentID);
                } else if (index === 0) {
                    this.detach(cellID, parentID);
                    this.attach(cellID, grandParentID, parentIndex);
                } else if (index === siblings.length - 1) {
                    this.detach(cellID, parentID);
                    this.attach(cellID, grandParentID, parentIndex + 1);
                } else {
                    var uncle = this.newSectionCell();
                    var uncleID = uncle.id;
                    // the siblings before this cell stay with parent
                    // the siblings after this cell move to uncle
                    var after = siblings.splice(index + 1, siblings.length - index - 1);
                    _notebookModel.tagMap[uncleID] = after;
                    siblings.splice(index, 1);
                    this.attach(cellID, grandParentID, parentIndex + 1);
                    this.attach(uncleID, grandParentID, parentIndex + 2);
                }
            },
            appendCell: function (cellID, parentID, type) {
                if (!parentID) {
                    parentID = this.getParentID(cellID);
                }
                if (!type) {
                    type = "codeCell";
                }
                var newCellID = (type === "codeCell") ? this.newCodeCell().id : this.newSectionCell().id;
                this.attach(newCellID, parentID, this.getIndex(cellID, parentID) + 1);
            },
            insertCell: function (cellID, parentID, type) {
                if (!parentID) {
                    parentID = this.getParentID(cellID);
                }
                if (!type) {
                    type = "codeCell";
                }
                var newCellID = (type === "codeCell") ? this.newCodeCell().id : this.newSectionCell().id;
                this.attach(newCellID, parentID, this.getIndex(cellID, parentID));
            },
            addFirst: function (cellID, parentID, type) {
                if (!parentID) {
                    parentID = this.getParentID(cellID);
                }
                if (!this.isContainer(cellID)) {
                    console.error("Not supported. addFirst only work for container cells");
                    return;
                }
                var newCellID = (type === "codeCell") ? this.newCodeCell().id : this.newSectionCell().id;
                this.attach(newCellID, cellID, 0);
            },
            addLast: function (cellID, parentID, type) {
                if (!parentID) {
                    parentID = this.getParentID(cellID);
                }
                if (!this.isContainer(cellID)) {
                    console.error("Not supported. addFirst only work for container cells");
                    return;
                }
                var newCellID = (type === "codeCell") ? this.newCodeCell().id : this.newSectionCell().id;
                this.attach(newCellID, cellID, this.getChildrenIDs(cellID, parentID).length);
            },
            clipboard: null,
            cut: function (cellID) {
                if (this.clipboard) {
                    this.deleteCell(this.clipboard);
                }
                this.clipboard = cellID;
                this.detach(this.clipboard);
            },
            paste: function (destinationID) {
                if (this.clipboard) {
                    if (this.isContainer(destinationID)) {
                        // add to tail
                        this.attach(this.clipboard, destinationID, this.getChildrenIDs(destinationID).length);
                    } else {
                        // append after
                        var parentID = this.getParentID(destinationID);
                        this.attach(this.clipboard, parentID, this.getIndex(destinationID, parentID) + 1);
                    }
                    this.clipboard = null;
                }
            },
            // split, separate a section cell into 2 parts(2 section cells).
            // children 0 ..< index will stay in the original seciton cell.
            // A new section cell at the same level will be created.
            // and children starting with index until the end will be moved to the
            // newly created section cell.
            //
            // parameters:
            // cellID: the id of the section cell to be splited.
            // index: where to split. Children with this given index will be
            //        the first item of the new section
            // hideTitle: whether the new section has title hidden or displayed
            // forceSplit: if forceSplit is false, new section wont be created
            //             if it is going to be empty (ie. index >= children length).
            split: function (cellID, index, hideTitle, forceSplit) {
                if (index <= 0) {
                    return;
                }
                if (!this.isContainer(cellID)) {
                    return;
                }
                var children = this.getChildrenIDs(cellID);
                if (!forceSplit && index >= children.length) {
                    return;
                }
                var newSectionCell = this.newSectionCell();
                if (hideTitle) {
                    newSectionCell.hideTitle = true;
                }
                var parentID = this.getParentID(cellID);
                var thisIndex = this.getIndex(cellID);
                this.attach(newSectionCell.id, parentID, thisIndex + 1);
                while (this.getChildrenIDs(cellID).length !== index) {
                    var toMove = this.getChildrenIDs(cellID)[index];
                    this.detach(toMove, cellID);
                    this.attach(toMove, newSectionCell.id);
                }
            }
        };
        var _cellTagOps = {
            hasTag: function (cellID, tagName) {
                if (!_notebookModel.tagMap2) {
                    _notebookModel.tagMap2 = {};
                }
                if (!_notebookModel.tagMap2[tagName]) {
                    return false;
                }
                return _.contains(_notebookModel.tagMap2[tagName], cellID);
            },
            addTag: function (cellID, tagName) {
                if (!_notebookModel.tagMap2) {
                    _notebookModel.tagMap2 = {};
                }
                if (!_notebookModel.tagMap2[tagName]) {
                    _notebookModel.tagMap2[tagName] = [];
                }
                if (!_.contains(_notebookModel.tagMap2[tagName], cellID)) {
                    _notebookModel.tagMap2[tagName].push(cellID);
                    _edited = true;
                }
            },
            removeTag: function (cellID, tagName) {
                if (!_notebookModel.tagMap2) {
                    _notebookModel.tagMap2 = {};
                }
                if (!_notebookModel.tagMap2[tagName]) {
                    return;
                }
                var index = _notebookModel.tagMap2[tagName].indexOf(cellID);
                if (index !== -1) {
                    _notebookModel.tagMap2[tagName].splice(index, 1);
                    _edited = true;
                }
            }
        };
        var bkBaseSessionModel = {
            setNotebookModel: function (notebookModel) {
                _notebookModel = notebookModel;
            },
            getNotebookModel: function () {
                return _notebookModel;
            },
            setNotebookUrl: function (notebookUrl) {
                _notebookUrl = notebookUrl;
            },
            setCaption: function (caption) {
                _caption = caption;
            },
            setSessionID: function (sessionID) {
                _sessionID = sessionID;
            },
            getSessionID: function () {
                return _sessionID;
            },
            getSessionData: function () {
                return {
                    sessionid: _sessionID,
                    notebookurl: _notebookUrl,
                    content: angular.toJson(_notebookModel),
                    caption: _caption,
                    edited: _edited
                };
            },
            clearSession: function () {
                _notebookModel = {};
                _notebookUrl = "";
                _sessionID = null;
                _caption = "";
            },
            toggleNotebookLocked: function () {
                if (_notebookModel) {
                    if (_notebookModel.locked === undefined) {
                        _notebookModel.locked = true;
                    } else {
                        _notebookModel.locked = undefined;
                    }
                    _edited = true;
                }
            },
            isNotebookLocked: function () {
                return (_notebookModel && _notebookModel.locked) ? true : false;
            },
            cellOp: _cellOps,
            cellTagOp: _cellTagOps,
            isEdited: function () {
                return _edited;
            },
            setEdited: function (edited) {
                _edited = edited;
            },
            /**
             * hierachicalLayout
             * contains the cell operations that are specific to the hierachical notebook layout
             * many of the current code under 'cellOp' should be moved here
             */
            hierachicalLayout: {
                getFirstCell: function () {
                    return _cellOps.getLeftMostChildren("root");
                },
                getAllCellsInOrder: function (rootNode) { // from top to bottom
                    if (!rootNode) {
                        rootNode = "root";
                    }
                    var ret = [];
                    var cID, children;
                    var stack = [rootNode];
                    while (!_.isEmpty(stack)) {
                        cID = stack.pop();
                        if (_cellOps.isContainer(cID)) {
                            children = _cellOps.getChildrenIDs(cID);
                            if (!_.isEmpty(children)) {
                                stack = stack.concat(children.reverse());
                            }
                        } else {
                            ret.push(cID);
                        }
                    }
                    return ret;
                },
                getTaggedCellsInOrder: function (tagName, rootNode) { // from top to bottom
                    var ret = [];
                    var cellIDs = this.getAllCellsInOrder(rootNode);
                    _.each(cellIDs, function (cellID) {
                        if (_cellTagOps.hasTag(cellID, tagName)) {
                            ret.push(cellID);
                        }
                    });
                    return ret;
                },
                getAllLeavesInOrder: function (rootNode) { // from top to bottom

                }
            }
        };

        return bkBaseSessionModel;
    });
    /**
     * bkCoreManager
     * - this acts as the global space for all view managers to use it as the communication channel
     * - bkUtils should be consider 'private' to beaker, external code should depend on bkHelper instead
     */
    bkCore.factory('bkCoreManager', function (
        $dialog,
        $location,
        bkUtils,
        bkSession,
        bkRecentMenu,
        fileChooserOp) {
        var bkCoreManager = {
            _beakerRootOp: null,
            init: function (beakerRootOp) {
                this._beakerRootOp = beakerRootOp;
            },
            gotoControlPanel: function () {
                // TODO. There is a synchronous problem now. Currently the session backup is
                // not guaranteed to be done before the control panel loads.
                // This should be refactored so that when we are going from bkApp to control
                // panel, backup the session explicitly first, 'then' go to control panel.
                return this._beakerRootOp.gotoControlPanel();
            },
            openURI: function (path) {
                return this._beakerRootOp.openURI(path);
            },
            newSession: function () {
                return this._beakerRootOp.newSession();
            },

            _bkAppImpl: null,
            setBkAppImpl: function (bkAppOp) {
                this._bkAppImpl = bkAppOp;
            },
            getBkApp: function () {
                return this._bkAppImpl;
            },
            evaluate: function (cellModel) {
                return this._bkAppImpl.evaluate(cellModel);
            },
            evaluateCode: function (evaluator, code) {
                return this._bkAppImpl.evaluateCode(evaluator, code);
            },

            _bkNotebookImpl: null,
            setBkNotebookImpl: function (bkNotebookImpl) {
                this._bkNotebookImpl = bkNotebookImpl;
            },
            getBkNotebook: function () {
                return this._bkNotebookImpl;
            },

            recordRecentDocument: function (doc) {
                return bkRecentMenu.recordRecentDocument(doc);

            },
            getRecentMenuItems: function () {
                return bkRecentMenu.getMenuItems();
            },
            getCurrentOpenMenuItems: function () {
                var deferred = Q.defer();
                bkSession.getSessions().then(function (sessions) {
                    var menuItems = [];
                    _.keys(sessions).forEach(function (sessionID) {
                        var session = sessions[sessionID];
                        var url = session.notebookurl;
                        if (url && url[url.length - 1] === "/") {
                            url = url.substring(0, url.length - 1);
                        }
                        menuItems.push({
                            name: session.caption ? session.caption :
                                (url ? url.replace(/^.*[\\\/]/, '') : "New Notebook"),
                            action: function () {
                                $location.path("session/" + sessionID);
                            }
                        });
                    });
                    deferred.resolve(menuItems);
                });
                return deferred.promise;
            },
            getLoadingPlugin: function (key) {
                return bkUtils.loadingPlugins.get(key);
            },

            _focusables: {}, // map of focusable(e.g. code mirror instances) with cell id being keys
            registerFocusable: function (cellID, focusable) {
                this._focusables[cellID] = focusable;
            },
            unregisterFocusable: function (cellID) {
                delete this._focusables[cellID];
            },
            getFocusable: function (cellID) {
                return this._focusables[cellID];
            },

            _codeMirrors: {},
            _cmKeyMapMode: "default",
            registerCM: function (cellID, cm) {
                this._codeMirrors[cellID] = cm;
                cm.setOption("keyMap", this._cmKeyMapMode);
            },
            unregisterCM: function (cellID) {
                delete this._codeMirrors[cellID];
            },
            setCMKeyMapMode: function (keyMapMode) {
                this._cmKeyMapMode = keyMapMode;
                _.each(this._codeMirrors, function (cm) {
                    cm.setOption("keyMap", keyMapMode);
                });
            },
            getCMKeyMapMode: function () {
                return this._cmKeyMapMode;
            },

            // notebook save functions
            _saveFuncs: {},
            registerSaveFunc: function (type, saveFunc) {
                this._saveFuncs[type] = saveFunc;
            },
            getSaveFunc: function (type) {
                return this._saveFuncs[type];
            },

            // general
            log: function (event, obj) {
                return bkUtils.log(event, obj);
            },
            refreshRootScope: function () {
                return bkUtils.refreshRootScope();
            },
            newDefaultNotebook: function (cb) {
                return bkUtils.newDefaultNotebook(cb);
            },
            loadJS: function (url, success) {
                return bkUtils.loadJS(url, success);
            },
            loadList: function (url, success, failure) {
                return bkUtils.loadList(url, success, failure);
            },
            findTable: function (elem) {
                return bkUtils.findTable(elem);
            },
            generateID: function () {
                return bkUtils.generateID(6);
            },
            toPrettyJson: function (jsObj) {
                return bkUtils.toPrettyJson(jsObj);
            },
            httpGet: function (url, data) {
                return bkUtils.httpGet(url, data);
            },
            httpPost: function (url, data) {
                return bkUtils.httpPost(url, data);
            },
            newDeferred: function () {
                return bkUtils.newDeferred();
            },
            showFileChooser: function (callback, template, strategy) {
                if (!template) {
                    // use default template
                    template = 'template/openMenuModal.html';
                }

                var options = {
                    backdrop: true,
                    keyboard: true,
                    backdropClick: true,
                    controller: 'fileChooserController'
                    //templateUrl: template,
                };

                // XXX - template is sometimes a url now.
                if (template.indexOf('template/') === 0) {
                    options.templateUrl = template;
                } else {
                    options.template = template;
                }

                fileChooserOp.setStrategy(strategy);
                $dialog.dialog(options)
                    .open()
                    .then(function (result) {
                        if (callback) {
                            callback(result);
                        }
                    });
            }
        };
        return bkCoreManager;
    });

    bkCore.factory('fileChooserOp', function () {
        var _strategy = {};
        return {
            setStrategy: function (strategy) {
                _strategy = strategy;
            },
            getStrategy: function () {
                return _strategy;
            }
        };
    });

    bkCore.controller('fileChooserController', function ($scope, dialog, fileChooserOp) {
        $scope.getStrategy = function () {
            return fileChooserOp.getStrategy();
        };
        $scope.close = function (result) {
            dialog.close(result);
        };
    });

    /**
     * Directive to show a modal dialog that does filename input.
     */
    bkCore.directive('fileActionDialog', function () {
        return {
            scope: { actionName: '@', inputId: '@', close: '=' },
            templateUrl: 'template/fileActionDialog.html',
            link: function (scope, element, attrs) {
                element.find('input').focus();
            }
        };
    });

})();
