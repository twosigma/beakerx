/*
 *  Copyright 2014 TWO SIGMA OPEN SOURCE, LLC
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
 * File menu plugin for IPython notebook
 * This adds a menu items to the File menu: open...(IPython), that loads IPython notebook and
 * convert it to a Beaker noteboook
 */
define(function(require, exports, module) {
  'use strict';
  var notebookConverter = (function() {
    var convertCodeCell = function(ipyCodeCell, evaluator) {
      var bkrCodeCell = {
        "id": "code" + bkHelper.generateId(6),
        "evaluator": evaluator,
        "type": "code",
        "input": {
          "body": ""
        },
        "output": {
        }
      };
      if (ipyCodeCell.input && ipyCodeCell.input.length > 0) {
        bkrCodeCell.input.body = ipyCodeCell.input.join('');
      } else if (ipyCodeCell.source && ipyCodeCell.source.length > 0) {
        bkrCodeCell.input.body = ipyCodeCell.source.join('');
      }
      if (ipyCodeCell.outputs && ipyCodeCell.outputs.length > 0) {
        var ipyOutput = ipyCodeCell.outputs[0];
        if (ipyOutput.output_type === "pyout" && ipyOutput.text) {
          bkrCodeCell.output.selectedType = "Text";
          bkrCodeCell.output.result = ipyOutput.text[0];
        } else if (ipyOutput.output_type === "display_data" && ipyOutput.png) {
          bkrCodeCell.output.selectedType = "Image";
          bkrCodeCell.output.result = {
            "type": "ImageIcon",
            "imageData": ipyOutput.png
          };
        }
      } else {
        bkrCodeCell.output.result = "";
      }
      return bkrCodeCell;
    };

    var convertMarkDownCell = function(ipyMDCell) {
      var bkrMDCell = {
        "id": "markdown" + bkHelper.generateId(6),
        "type": "markdown",
        "body": "",
        "mode": "preview"
      };
      if (ipyMDCell.source && ipyMDCell.source.length > 0) {
        bkrMDCell.body = ipyMDCell.source.join("");
      }
      return bkrMDCell;
    };

    var convertRawCell = function(ipyRawCell) {
      var bkrTextCell = {
        "id": "text" + bkHelper.generateId(6),
        "type": "text",
        "body": ""
      };
      if (ipyRawCell.source && ipyRawCell.source.length > 0) {
        bkrTextCell.body = ipyRawCell.source.join(" ");
      }
      return bkrTextCell;
    };

    var convertHeadingCell = function(ipyHeadingCell) {
      var bkrSectionCell = {
        "id": "section" + bkHelper.generateId(6),
        "level": ipyHeadingCell.level,
        "type": "section",
        "body": "",
        "title": "Imported Heading"
      };
      if (ipyHeadingCell.source && ipyHeadingCell.source.length > 0) {
        bkrSectionCell.title = ipyHeadingCell.source.join("\n");
      }
      return bkrSectionCell;
    };

    var newBeakerNotebook = function() {
      return {
        "beaker": "2",
        "evaluators": [
           {
            "name": "Html",
            "plugin": "Html",
            "view": {
              "cm": {
                "mode": "htmlmixed"
              }
            }
          },
          {
            "name": "TeX",
            "plugin": "TeX",
            "view": {
              "cm": {
                "mode": "stex"
              }
            }
          },
          {
            "name": "JavaScript",
            "plugin": "JavaScript",
            "view": {
              "cm": {
                "mode": "javascript",
                "background": "#FFE0F0"
              }
            }
          },
          {
            "name": "IPython",
            "plugin": "IPython",
            "imports": "",
            "supplementalClassPath": ""
          }
        ],
        cells: [],
        tagMap: {
          "root": []
        },
        tagMap2: {
          "initialization": [],
          "IPython": []
        }
      };
    };

    return {
      convert: function(ipyNb) {
        var bkrNb;
        var output = [];
        bkrNb = newBeakerNotebook();
        
        if (ipyNb.nbformat === 3) {
          if (ipyNb.worksheets.length==0)
            output.push("WARNING: this notebook is empty");
          else {
            ipyNb.worksheets[0].cells.forEach(function(cell) {
              var bkrCell;
              if (cell.cell_type === "code") {
                bkrCell = convertCodeCell(cell, "IPython");
              } else if (cell.cell_type === "markdown") {
                bkrCell = convertMarkDownCell(cell);
              } else if (cell.cell_type === "raw" || cell.cell_type === "plaintext") {
                bkrCell = convertRawCell(cell);
              } else if (cell.cell_type === "heading") {
                bkrCell = convertHeadingCell(cell);
              } else {
                output.push("WARNING: unrecognized cell type: " + cell.cell_type);
              }
              if (bkrCell) {
                bkrNb.cells.push(bkrCell);
                bkrNb.tagMap.root.push(bkrCell.id);
                bkrNb.tagMap2.IPython.push(bkrCell.id);
              }
            });
          }
          if (ipyNb.worksheets.length > 1) {
            output.push("WARNING: multiple workspaces are not supported - only the first one has been converted");
          }
        } else if (ipyNb.nbformat === 4) {
          var evaluator = "IPython";
          
          if (_.isObject(ipyNb.metadata) && _.isObject(ipyNb.metadata.language_info)) {
            if (ipyNb.metadata.language_info.version !== undefined && ipyNb.metadata.language_info.version.substring(0,1) === "3") {
              evaluator = "Python3";
            }
          }
          bkrNb.evaluators[3].name = evaluator;
          bkrNb.evaluators[3].plugin = evaluator;
          ipyNb.cells.forEach(function(cell) {
            var bkrCell;
            if (cell.cell_type === "code") {
              bkrCell = convertCodeCell(cell, evaluator);
            } else if (cell.cell_type === "markdown") {
              bkrCell = convertMarkDownCell(cell);
            } else if (cell.cell_type === "raw" || cell.cell_type === "plaintext") {
              bkrCell = convertRawCell(cell);
            } else if (cell.cell_type === "heading") {
              bkrCell = convertHeadingCell(cell);
            } else {
              output.push("WARNING: unrecognized cell type: " + cell.cell_type);
            }
            if (bkrCell) {
              bkrNb.cells.push(bkrCell);
              bkrNb.tagMap.root.push(bkrCell.id);
              bkrNb.tagMap2.IPython.push(bkrCell.id);
            }
          });
        } else {
          output.push("ERROR: unsupported notebook format "+ipyNb.nbformat);
        }
        if (output.length>0) {
          // Display WARNING list
          console.log(output.join("\n"));
          // TODO
        }
        return bkrNb;
      }
    };
  })();

  var IPYNB_PATH_PREFIX = "ipynb";
  bkHelper.setNotebookImporter(IPYNB_PATH_PREFIX, {
    import: function(fileContentAsString) {
      var ipyNbJson = fileContentAsString;
      var ipyNb = JSON.parse(ipyNbJson);
      var bkrNb = notebookConverter.convert(ipyNb);
      return bkrNb;
    }
  });

  var menuItemsDeferred = bkHelper.newDeferred();
  bkHelper.getHomeDirectory().then(function(homeDir) {
    var strategy = bkHelper.getFileSystemFileChooserStrategy();
    strategy.treeViewfs.extFilter = ['ipynb'];
    var toAdd = [
      {
        parent: "File",
        id: "file-menu",
        items: [
          {
            name: "Import from Jupyter... (.ipynb)",
            id: "open-ipython-menuitem",
            reducedName: "Import...",
            tooltip: "Import an IPython notebook from file system and convert it to Beaker notebook",
            sortorder: 115,
            action: function() {
              bkHelper.openWithDialog('ipynb', 'file', true, IPYNB_PATH_PREFIX);
            }
          }
        ]
      }
    ];
    menuItemsDeferred.resolve(toAdd);
  });

  exports.getMenuItems = function() {
    return menuItemsDeferred.promise;
  };
});
