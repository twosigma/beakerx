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

var BeakerXPageObject = require('../beakerx.po.js');
var beakerxPO;

describe('(Groovy) Interrupt infinite loop', function () {
    beforeAll(function () {
        beakerxPO = new BeakerXPageObject();
        beakerxPO.runNotebookByUrl('/test/ipynb/groovy/InfiniteLoopGroovyTest.ipynb');
    });

    afterAll(function () {
        beakerxPO.closeAndHaltNotebook();
    });

    var cellIndex;

    describe('Infinite loop interruption', function () {
        it('Should interrupt an infinite loop and check the output', function () {
            cellIndex = 0;

            setTimeout(function () {
                beakerxPO.interruptKernel('button[data-jupyter-action="jupyter-notebook:interrupt-kernel"]')
            }, 1500);

            beakerxPO.runCodeCellByIndex(cellIndex);

            expect(beakerxPO.checkKernelIdle()).toBeTruthy();
        });
    });
});