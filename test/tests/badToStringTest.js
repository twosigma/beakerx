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


var BeakerPageObject = require('./beaker.po.js');
var beakerPO;

describe('Test for bad toString() method. ', function () {

    beforeAll(function (done) {
        beakerPO = new BeakerPageObject();
        browser.get(beakerPO.baseURL + "beaker/#/open?uri=file:..%2Ftest%2Fnotebooks%2FbadToString.bkr&readOnly=true").then(done);
        browser.driver.manage().window().maximize();
    });

    afterAll(function (done) {
        beakerPO.createScreenshot('badToString');
        done();
    });

    describe('Qux class has bad toString() method. ', function () {

        function checkOutputError(idCell){
            beakerPO.scrollToBkCellByIdCell(idCell);
            beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Error');
            beakerPO.getCodeCellOutputByIdCell(idCell).element(by.css('.out_error')).getText()
                .then(function (value) {
                    expect(value.substring(1, 28)).toBe('java.lang.RuntimeException:');
                });
        }

        it('output for qux should display error', function () {
            checkOutputError("codeAL4o76");
        });

        it('output for [qux, qux] should display error', function () {
            checkOutputError("codefSFdqZ");
        });

        it('output for ["a", qux] should display error', function () {
            checkOutputError("codeVjifQP");
        });

    });
});

