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
describe("M_bkNotebookVersionManager", function() {
    var bkNotebookVersionManager;
    beforeEach(module("M_bkNotebookVersionManager"));
    beforeEach(inject(function (_bkNotebookVersionManager_) {
        bkNotebookVersionManager = _bkNotebookVersionManager_;
    }));

    describe("bkNotebookVersionManager", function () {
        it("should open a notebook", function () {
            expect(bkNotebookVersionManager.open()).toBe("notebook opened");
        });
    });
});