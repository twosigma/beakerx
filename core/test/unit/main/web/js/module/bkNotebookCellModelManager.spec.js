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
describe("M_bkNotebookCellModelManager", function() {
  function CodeCell(id) {
    this.type = "code";
    this.id = id;
  };
  function SectionCell(id, level) {
    this.type = "section";
    this.id = id;
    this.level = level; // root is 0, h1 is 1, h2 is 2
  };
  var code01 = new CodeCell("code01");
  var code02 = new CodeCell("code02");
  var code03 = new CodeCell("code03");
  var code04 = new CodeCell("code04");
  var code05 = new CodeCell("code05");
  var code06 = new CodeCell("code06");
  var code07 = new CodeCell("code07");
  var code08 = new CodeCell("code08");
  var code09 = new CodeCell("code09");
  var code10 = new CodeCell("code10");
  var sect01 = new SectionCell("sect01", 2);
  var sect02 = new SectionCell("sect02", 1);
  var sect03 = new SectionCell("sect03", 2);
  var sect04 = new SectionCell("sect04", 3);
  var sect05 = new SectionCell("sect05", 2);
  var sect06 = new SectionCell("sect06", 3);
  var sect07 = new SectionCell("sect07", 2);
  var sect08 = new SectionCell("sect08", 1);
  var sect09 = new SectionCell("sect09", 3);
  var sect10 = new SectionCell("sect10", 2);


  var bkNotebookCellModelManager;
  beforeEach(module("M_bkNotebookCellModelManager"));
  beforeEach(inject(function(_bkNotebookCellModelManager_) {
    bkNotebookCellModelManager = _bkNotebookCellModelManager_;
  }));
  describe("bkNotebookCellModelManager", function() {
    it("should construct the tree from cells", function() {
      bkNotebookCellModelManager.reset([
          sect02, // h1
              code04,
              sect03, // h2
                  code05,
                  sect04, // h3
                      code06,
              sect05, // h2
                  sect06 // h3
      ]);
      var theTree = bkNotebookCellModelManager._getCellMap();

      expect(theTree["root"].children).toEqual(["sect02"]);
      expect(theTree["code04"].children).toEqual([]);
      expect(theTree["sect03"].children).toEqual(["code05", "sect04"]);
      expect(theTree["sect04"].children).toEqual(["code06"]);
      expect(theTree["sect05"].children).toEqual(["sect06"]);
    });
    it("should get a cell from id", function() {
      bkNotebookCellModelManager.reset([code01]);
      expect(bkNotebookCellModelManager.getCell("code01")).toBe(code01);
    });
    it("should get a cell from index", function() {
      bkNotebookCellModelManager.reset([code01]);
      expect(bkNotebookCellModelManager.getCellAtIndex(0)).toBe(code01);
      expect(bkNotebookCellModelManager.getCellAtIndex(-1)).toBe(undefined);
    });
    it("should get the type of a cell", function() {
      bkNotebookCellModelManager.reset([code01]);
      expect(bkNotebookCellModelManager.getCellType("code01")).toBe("code");
    });
    it("should get the index of a cell in cells list", function() {
      bkNotebookCellModelManager.reset([code01, code02, code03]);
      expect(bkNotebookCellModelManager.getIndex("code01")).toBe(0);
      expect(bkNotebookCellModelManager.getIndex("code02")).toBe(1);
      expect(bkNotebookCellModelManager.getIndex("code03")).toBe(2);
    });
    it("should get the parent of a cell", function() {
      var cells = [
          code01,
          sect01, // h2
              code02,
              code03,
          sect02, // h1
              code04,
              sect03, // h2
                  code05,
                  sect04, // h3
                      code06,
              sect05, // h2
                  sect06, // h3
              sect07, // h2
                  code07,
          sect08, // h1
              sect09, //h3
              sect10, //h2
                  code08,
                  code09
      ];
      bkNotebookCellModelManager.reset(cells);
      expect(bkNotebookCellModelManager.getParent("code01")).toBeUndefined();
      expect(bkNotebookCellModelManager.getParent("code02")).toBe(sect01);
      expect(bkNotebookCellModelManager.getParent("code06")).toBe(sect04);
    });
    it("should get children of a cell", function() {
      var cells = [
          code01,
          sect01, // h2
              code02,
              code03,
          sect02, // h1
              code04,
              sect03, // h2
                  code05,
                  sect04, // h3
                      code06,
              sect05, // h2
                  sect06, // h3
              sect07, // h2
                  code07,
          sect08, // h1
              sect09, //h3
              sect10, //h2
                  code08,
                  code09
      ];
      bkNotebookCellModelManager.reset(cells);
      expect(bkNotebookCellModelManager.getChildren("code01")).toEqual([]);
      expect(bkNotebookCellModelManager.getChildren("sect01")).toEqual([code02, code03]);
      expect(bkNotebookCellModelManager.getChildren("sect05")).toEqual([sect06]);
      expect(bkNotebookCellModelManager.getChildren("sect02")).toEqual([code04, sect03, sect05, sect07]);
      expect(bkNotebookCellModelManager.getChildren("sect08")).toEqual([sect09, sect10]);
    });
    it("should get all descendants of a cell", function() {
      var cells = [
          code01,
          sect01, // h2
              code02,
              code03,
          sect02, // h1
              code04,
              sect03, // h2
                  code05,
                  sect04, // h3
                      code06,
              sect05, // h2
                  sect06, // h3
              sect07, // h2
                  code07,
          sect08, // h1
              sect09, //h3
              sect10, //h2
                  code08,
                  code09
      ];
      bkNotebookCellModelManager.reset(cells);
      expect(bkNotebookCellModelManager.getAllDescendants("code01")).toEqual([]);
      expect(bkNotebookCellModelManager.getAllDescendants("sect01")).toEqual([code02, code03]);
      expect(bkNotebookCellModelManager.getAllDescendants("sect05")).toEqual([sect06]);
      expect(bkNotebookCellModelManager.getAllDescendants("sect02")).toEqual([code04, sect03, code05, sect04, code06, sect05, sect06, sect07, code07]);
      expect(bkNotebookCellModelManager.getAllDescendants("sect08")).toEqual([sect09, sect10, code08, code09]);
      expect(bkNotebookCellModelManager.getAllDescendants("root"))
          .toEqual(cells);
    });
    it("should delete cell", function() {
      bkNotebookCellModelManager.reset([code01, code02, code03, code04]);
      bkNotebookCellModelManager.delete("code02");
      expect(bkNotebookCellModelManager.getCells()).toEqual([code01, code03, code04]);
      bkNotebookCellModelManager.delete("code01");
      expect(bkNotebookCellModelManager.getCells()).toEqual([code03, code04]);
      bkNotebookCellModelManager.delete("code04");
      expect(bkNotebookCellModelManager.getCells()).toEqual([code03]);
      bkNotebookCellModelManager.delete("code05");
      expect(bkNotebookCellModelManager.getCells()).toEqual([code03]);
    });
    it("should insert cell - before", function() {
      bkNotebookCellModelManager.reset([code01, code03]);
      bkNotebookCellModelManager.insertBefore("code03", code02);
      bkNotebookCellModelManager.insertBefore("code01", code04);
      expect(bkNotebookCellModelManager.getCells()).toEqual([code04, code01, code02, code03]);

      expect(function() { bkNotebookCellModelManager.insertBefore("code00", code04); })
          .toThrow("target cell code00 was not found");
    });
    it("should insert cell - after", function() {
      bkNotebookCellModelManager.reset([code01, code03]);
      bkNotebookCellModelManager.insertAfter("code01", code02);
      bkNotebookCellModelManager.insertAfter("code03", code04);
      expect(bkNotebookCellModelManager.getCells()).toEqual([code01, code02, code03, code04]);

      expect(function() { bkNotebookCellModelManager.insertAfter("code00", code04); })
          .toThrow("target cell code00 was not found");
    });
    it("should move a cell up", function() {
      bkNotebookCellModelManager.reset([code01, code02, code03]);
      bkNotebookCellModelManager.moveUp("code02");
      expect(bkNotebookCellModelManager.getCells()).toEqual([code02, code01, code03]);
      bkNotebookCellModelManager.moveUp("code02");
      expect(bkNotebookCellModelManager.getCells()).toEqual([code02, code01, code03]);
    });
    it("should move a cell down", function() {
      bkNotebookCellModelManager.reset([code01, code02, code03]);
      bkNotebookCellModelManager.moveDown("code02");
      expect(bkNotebookCellModelManager.getCells()).toEqual([code01, code03, code02]);
      bkNotebookCellModelManager.moveDown("code02");
      expect(bkNotebookCellModelManager.getCells()).toEqual([code01, code03, code02]);
    });
    it("should delete a section", function() {
      bkNotebookCellModelManager.reset([
          sect02, // h1
              code04,
              sect03, // h2
                  code05,
                  sect04, // h3
                      code06,
              sect05, // h2
                  sect06 // h3
      ]);
      expect(function() { bkNotebookCellModelManager.deleteSection("code04"); })
          .toThrow("target cell code04 is not a section cell");
      bkNotebookCellModelManager.deleteSection("sect03");
      expect(bkNotebookCellModelManager.getCells()).toEqual([sect02, code04, sect05, sect06]);
      bkNotebookCellModelManager.deleteSection("sect02");
      expect(bkNotebookCellModelManager.getCells()).toEqual([]);
      expect(function() { bkNotebookCellModelManager.deleteSection("sect02"); })
          .toThrow("target cell sect02 was not found");
    });
    it("should get code cells", function() {
      bkNotebookCellModelManager.reset([
          sect02, // h1
              code04,
              sect03, // h2
                  code05,
                  sect04, // h3
                      code06,
              sect05, // h2
                  sect06 // h3
      ]);
      expect(bkNotebookCellModelManager.getAllCodeCells("sect02")).toEqual([code04, code05, code06]);
    });
    it("should generate tag maps", function() {
      var cells = [
          code01,
          sect01, // h2
              code02,
              code03,
          sect02, // h1
              code04,
              sect03, // h2
                  code05,
                  sect04, // h3
                      code06,
              sect05, // h2
                  sect06, // h3
              sect07, // h2
                  code07,
          sect08, // h1
              sect09, //h3
              sect10, //h2
                  code08,
                  code09
      ];

      code08.initialization = true;
      bkNotebookCellModelManager.reset(cells);
      expect(bkNotebookCellModelManager.getInitializationCells()).toEqual([code08]);
      sect08.initialization = true;
      bkNotebookCellModelManager.reset(cells);
      expect(bkNotebookCellModelManager.getInitializationCells()).toEqual([code08, code09]);
      sect01.initialization = true;
      bkNotebookCellModelManager.reset(cells);
      expect(bkNotebookCellModelManager.getInitializationCells()).toEqual([code02, code03, code08, code09]);
      code06.initialization = true;
      bkNotebookCellModelManager.reset(cells);
      expect(bkNotebookCellModelManager.getInitializationCells()).toEqual([code02, code03, code06, code08, code09]);
      code01.evaluator = "Groovy";
      code02.evaluator = "R";
      code04.evaluator = "IPython"
      code08.evaluator = "Groovy";
      code09.evaluator = "IPython";
      bkNotebookCellModelManager.reset(cells);
      expect(bkNotebookCellModelManager.getCellsWithEvaluator("Groovy")).toEqual([code01, code08]);
      expect(bkNotebookCellModelManager.getCellsWithEvaluator("IPython")).toEqual([code04, code09]);
      expect(bkNotebookCellModelManager.getCellsWithEvaluator("R")).toEqual([code02]);
    });
    it("should shift a continuous segment of cells", function() {
      bkNotebookCellModelManager.reset([code01, code02, code03, code04, code05]);
      expect(function() {
        bkNotebookCellModelManager.shiftSegment(1, 2, 3);
      }).toThrow("Illegal shifting, result would be out of bound");
      expect(function() {
        bkNotebookCellModelManager.shiftSegment(1, 2, -2);
      }).toThrow("Illegal shifting, result would be out of bound");
      bkNotebookCellModelManager.shiftSegment(1, 2, 2);
      expect(bkNotebookCellModelManager.getCells()).toEqual([code01, code04, code05, code02, code03]);
      bkNotebookCellModelManager.shiftSegment(3, 2, -2);
      expect(bkNotebookCellModelManager.getCells()).toEqual([code01, code02, code03, code04, code05]);
    });
    it("should move a section cell up and down", function() {
      bkNotebookCellModelManager.reset([sect02, sect08, code01]);
      expect(bkNotebookCellModelManager.isPossibleToMoveSectionUp("sect02")).toBe(false);
      expect(bkNotebookCellModelManager.isPossibleToMoveSectionUp("sect08")).toBe(true);
      expect(bkNotebookCellModelManager.isPossibleToMoveSectionDown("sect02")).toBe(true);
      expect(bkNotebookCellModelManager.isPossibleToMoveSectionDown("sect08")).toBe(false);

      bkNotebookCellModelManager.moveSectionUp("sect08");
      expect(bkNotebookCellModelManager.getCells()).toEqual([sect08, code01, sect02]);
      bkNotebookCellModelManager.moveSectionDown("sect08");
      expect(bkNotebookCellModelManager.getCells()).toEqual([sect02, sect08, code01]);
    });

  });
});
