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
var path = require('path');
var os = require('os');
var beakerPO;


describe('EasyForm', function () {

  function loadGroovy() {
    beakerPO.notebookMenu.click();
    beakerPO.languageManagerMenuItem.click();
    beakerPO.languageManagerButton('Groovy').click();
    beakerPO.waitForPlugin('Groovy');
    beakerPO.languageManagerCloseButton.click();
  }

  function evaluate(code) {
    beakerPO.setCellInput(code)
        .then(function(){ beakerPO.evaluateCell(); })
        .then(function(){ browser.sleep(1000); beakerPO.waitForCellOutput(); });
  }

  function testUndoRedo(code, selector) {
    evaluate(code);

    var e = element(by.css(selector));

    e.sendKeys("A").then(function(){
        expect(e.getAttribute('value')).toEqual("A");
    });

    //TEST UNDO
    if (os.type() === 'Darwin') {
      //COMMAND:      '\uE03D',  // Apple command key
      e.sendKeys("\uE03Dz");
    }
    else {
      //CONTROL:      '\uE009',
      e.sendKeys("\uE009z");
    }
    expect(e.getAttribute('value')).toEqual("");
    //TEST REDO
    //SHIFT:        '\uE008',
    if (os.type() === 'Darwin') {
      //COMMAND:      '\uE03D',  // Apple command key
      e.sendKeys("\uE008\uE03Dz");
    } else {
      //CONTROL:      '\uE009',
      e.sendKeys("\uE008\uE009z");
    }
    beakerPO.createScreenshot('easyFormUndoRedo');
    expect(e.getAttribute('value')).toEqual("A");
}

  beforeEach(function (done) {
    beakerPO = new BeakerPageObject();
    browser.get(beakerPO.baseURL).then(done);
    beakerPO.newEmptyNotebook.click();
    loadGroovy();
    beakerPO.insertCellButton.click();
  });

  afterEach(function (done) {
    beakerPO.closeNotebook()
      .then(done);
  });

  it('Text Fields', function () {
    var code = 'f1 = new EasyForm(\"Form\")\\n';
    code += 'f1.addTextField(\"first\", 15)\\n';
    code += 'f1.addTextField(\"second\", 15)\\n';
    code += 'f1';
    evaluate(code);
    expect(element.all(by.css('bk-output-display  .text-field')).count()).toBe(2);
  });

  it('Text Areas', function () {
    var code = 'f1 = new EasyForm(\"Form\")\\n';
    code += 'f1.addTextArea(\"Text Area\")\\n';
    code += 'f1';
    evaluate(code);
    expect(element(by.css('bk-output-display  .text-area')).isPresent()).toBe(true);
  });

  it('Dates', function () {
    var code = 'f1 = new EasyForm(\"Form\")\\n';
    code += 'f1.addDatePicker(\"Date\")\\n';
    code += 'f1';
    evaluate(code);
    expect(element(by.css('bk-output-display  .date-picker')).isPresent()).toBe(true);
  });

  it('Check Boxes', function () {
    var code = 'f1 = new EasyForm(\"Form\")\\n';
    code += 'options = [\"a\", \"b\", \"c\", \"d\"]\\n';
    code += 'f1.addCheckBoxes(\"Check Boxes\", options)\\n';
    code += 'f1';
    evaluate(code);
    expect(element.all(by.css('bk-output-display input[type="checkbox"]')).count()).toBe(4);
  });

  it('Radio Buttons', function () {
    var code = 'f1 = new EasyForm(\"Form\")\\n';
    code += 'options = [\"a\", \"b\", \"c\", \"d\"]\\n';
    code += 'f1.addRadioButtons(\"Radio Buttons\", options)\\n';
    code += 'f1';
    evaluate(code);
    expect(element.all(by.css('bk-output-display  .radio-button-component-item')).count()).toBe(4);
  });

  it('Combo Boxes', function () {
    var code = 'f1 = new EasyForm(\"Form\")\\n';
    code += 'options = [\"a\", \"b\", \"c\", \"d\"]\\n';
    code += 'f1.addComboBox(\"Combo Box\", options)\\n';
    code += 'f1';
    evaluate(code);
    expect(element.all(by.css('bk-output-display  .combo-box')).count()).toBe(1);
    expect(element.all(by.css('bk-output-display  option')).count()).toBe(4);
  });

  it('Text Areas Undo/Redo', function () {
    var code = 'f1 = new EasyForm(\"Form\")\\n';
    code += 'f1.addTextArea(\"Text Area\")\\n';
    code += 'f1';
    testUndoRedo(code, 'bk-output-display  .text-area');
  });

  it('Text Fields Undo/Redo', function () {
    var code = 'f1 = new EasyForm(\"Form\")\\n';
    code += 'f1.addTextField(\"first\", 15)\\n';
    code += 'f1';
    testUndoRedo(code, 'bk-output-display  .text-field');
  });

});


