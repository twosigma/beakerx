describe("M_bkNotebookCellModelManager", function() {
    function CodeCell (id) {
        this.type = "code";
        this.id = id;
    };
    function SectionCell (id, level) {
        this.type = "section";
        this.id = id;
        this.level = level; // for level, root is 0, h1 is 1, h2 is 2
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
    beforeEach(inject(function (_bkNotebookCellModelManager_) {
        bkNotebookCellModelManager = _bkNotebookCellModelManager_;
    }));
    describe("bkNotebookCellModelManager", function () {
        it("should get a cell from id", function () {
            bkNotebookCellModelManager.reset([code01]);
            expect(bkNotebookCellModelManager.cellOp.getCell("code01")).toBe(code01);
        });
        it("should get a cell with index", function () {
            bkNotebookCellModelManager.reset([code01]);
            expect(bkNotebookCellModelManager.cellOp.getCellAtIndex(0)).toBe(code01);
            expect(bkNotebookCellModelManager.cellOp.getCellAtIndex(-1)).toBe(undefined);
        });
        it("should get a cell type", function () {
            bkNotebookCellModelManager.reset([code01]);
            expect(bkNotebookCellModelManager.cellOp.getCellType("code01")).toBe("code");
        });
        it("should get the index of a cell in cells list", function () {
            bkNotebookCellModelManager.reset([code01, code02, code03]);
            expect(bkNotebookCellModelManager.cellOp.getIndex("code01")).toBe(0);
            expect(bkNotebookCellModelManager.cellOp.getIndex("code02")).toBe(1);
            expect(bkNotebookCellModelManager.cellOp.getIndex("code03")).toBe(2);
        });
        it("should get children of a cell", function () {
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
            expect(bkNotebookCellModelManager.cellOp.getChildren("code01")).toEqual([]);
            expect(bkNotebookCellModelManager.cellOp.getChildren("sect01")).toEqual([code02, code03]);
            expect(bkNotebookCellModelManager.cellOp.getChildren("sect05")).toEqual([sect06]);
            expect(bkNotebookCellModelManager.cellOp.getChildren("sect02")).toEqual([code04, sect03, code05, sect04, code06, sect05, sect06, sect07, code07]);
            expect(bkNotebookCellModelManager.cellOp.getChildren("sect08")).toEqual([sect09, sect10, code08, code09]);
        });
        it("should delete cell", function () {
            bkNotebookCellModelManager.reset([code01, code02, code03, code04]);
            bkNotebookCellModelManager.cellOp.delete("code02");
            expect(bkNotebookCellModelManager.getCells()).toEqual([code01, code03, code04]);
            bkNotebookCellModelManager.cellOp.delete("code01");
            expect(bkNotebookCellModelManager.getCells()).toEqual([code03, code04]);
            bkNotebookCellModelManager.cellOp.delete("code04");
            expect(bkNotebookCellModelManager.getCells()).toEqual([code03]);
            bkNotebookCellModelManager.cellOp.delete("code05");
            expect(bkNotebookCellModelManager.getCells()).toEqual([code03]);
        });
        it("should insert cell - before", function () {
            bkNotebookCellModelManager.reset([code01, code03]);
            bkNotebookCellModelManager.cellOp.insertBefore("code03", code02);
            bkNotebookCellModelManager.cellOp.insertBefore("code01", code04);
            expect(bkNotebookCellModelManager.getCells()).toEqual([code04, code01, code02, code03]);

            expect(function () { bkNotebookCellModelManager.cellOp.insertBefore("code00", code04) })
                .toThrow("target cell code00 was not found");
        });
        it("should insert cell - after", function () {
            bkNotebookCellModelManager.reset([code01, code03]);
            bkNotebookCellModelManager.cellOp.insertAfter("code01", code02);
            bkNotebookCellModelManager.cellOp.insertAfter("code03", code04);
            expect(bkNotebookCellModelManager.getCells()).toEqual([code01, code02, code03, code04]);

            expect(function () { bkNotebookCellModelManager.cellOp.insertAfter("code00", code04) })
                .toThrow("target cell code00 was not found");
        });
        it("should move a cell up", function () {
            bkNotebookCellModelManager.reset([code01, code02, code03]);
            bkNotebookCellModelManager.cellOp.moveUp("code02");
            expect(bkNotebookCellModelManager.getCells()).toEqual([code02, code01, code03]);
            bkNotebookCellModelManager.cellOp.moveUp("code02");
            expect(bkNotebookCellModelManager.getCells()).toEqual([code02, code01, code03]);
        });
        it("should move a cell down", function () {
            bkNotebookCellModelManager.reset([code01, code02, code03]);
            bkNotebookCellModelManager.cellOp.moveDown("code02");
            expect(bkNotebookCellModelManager.getCells()).toEqual([code01, code03, code02]);
            bkNotebookCellModelManager.cellOp.moveDown("code02");
            expect(bkNotebookCellModelManager.getCells()).toEqual([code01, code03, code02]);
        });
        it("should delete a section", function () {
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
            expect(function () { bkNotebookCellModelManager.cellOp.deleteSection("code04") })
                .toThrow("target cell code04 is not a section cell");
            bkNotebookCellModelManager.cellOp.deleteSection("sect03");
            expect(bkNotebookCellModelManager.getCells()).toEqual([sect02, code04, sect05, sect06]);
            bkNotebookCellModelManager.cellOp.deleteSection("sect02");
            expect(bkNotebookCellModelManager.getCells()).toEqual([]);
            expect(function () { bkNotebookCellModelManager.cellOp.deleteSection("sect02") })
                .toThrow("target cell sect02 was not found");
        });
    });
});