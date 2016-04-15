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

var BeakerPageObject = require('../../beaker.po.js');
var path = require('path');
var beakerPO;

describe('Text, Formatting, and Equations tutorial', function (done) {

    beakerPO = new BeakerPageObject();
    browser.get(beakerPO.baseURL + "beaker/#/open?uri=file:config%2Ftutorials%2Ftext.bkr&readOnly=true").then(done);

    it('Edit and Preview mode', function () {
        var idCell = "markdown8nMuAN";
        beakerPO.checkBkCellByIdCell(idCell);
        var elemPreviw = beakerPO.getBkCellByIdCell(idCell).element(by.css('div[ng-show="mode==\'preview\'"]'));
        var elemEdit = beakerPO.getBkCellByIdCell(idCell).element(by.css('div[ng-show="mode==\'edit\'"]'));

        expect(elemPreviw.isDisplayed()).toBe(true);
        expect(elemEdit.isDisplayed()).toBe(false);

        expect(elemPreviw.all(by.css('p')).get(0).getText()).toBe('Beaker\'s text cells (insert one by clicking \'text\' in the blue button bar) are based ' +
            'primarily on markdown, but have a number of more advanced features as described below. There are also HTML and TeX cells, which you can insert with ' +
            'the \'code\' menu in the blue button bar, and are also explained in their own sections below. Images can be included \'inline\' in both HTML and text cells.');
        expect(elemPreviw.all(by.css('p')).get(1).getText()).toBe('In addition, there are menu commands to control how the notebook is displayed:');
        expect(elemPreviw.all(by.css('li')).get(0).getText()).toBe('Notebook → Lock: hides the all the code, and removes the boxes from around the cells.');
        expect(elemPreviw.all(by.css('li')).get(1).getText()).toBe('View → Show Hierarchy: indents sections and adds numbering and lines to show hierarchy.');
        expect(elemPreviw.all(by.css('li')).get(2).getText()).toBe('View → Advanced Mode: reduces vertical space and hides the big run button (you can still run cells with the ' +
            'little run button in the upper-right of each cell.');
        expect(elemPreviw.all(by.css('li')).get(3).getText()).toBe('View → Theme: switch from the default black-on-white color theme to the light-on-dark ambience theme.');

        beakerPO.getBkCellByIdCell(idCell).click();
        expect(elemPreviw.isDisplayed()).toBe(false);
        expect(elemEdit.isDisplayed()).toBe(true);

        var elemEditPreArr = elemEdit.all(by.css('.CodeMirror-code > pre'));
        expect(elemEditPreArr.get(0).getText()).toBe('Beaker\'s text cells (insert one by clicking \'text\' in the blue button bar) are based primarily on markdown,');
        expect(elemEditPreArr.get(1).getText()).toBe('but have a number of more advanced features as described below.  There are also HTML and TeX cells,');
        expect(elemEditPreArr.get(2).getText()).toBe('which you can insert with the \'code\' menu in the blue button bar, and are also explained in their own');
        expect(elemEditPreArr.get(3).getText()).toBe('sections below.  Images can be included \'inline\' in both HTML and text cells. ');
        expect(elemEditPreArr.get(4).getText()).toBe('');
        expect(elemEditPreArr.get(5).getText()).toBe('In addition, there are menu commands to control how the notebook is displayed:');
        expect(elemEditPreArr.get(6).getText()).toBe('* **Notebook → Lock**: hides the all the code, and removes the boxes from around the cells.');
        expect(elemEditPreArr.get(7).getText()).toBe('* **View → Show Hierarchy**: indents sections and adds numbering and lines to show hierarchy.');
        expect(elemEditPreArr.get(8).getText()).toBe('* **View → Advanced Mode**: reduces vertical space and hides the big run button (you can still run cells with the little run ' +
            'button in the upper-right of each cell.');
        expect(elemEditPreArr.get(9).getText()).toBe('* **View → Theme**: switch from the default black-on-white color theme to the light-on-dark ambience theme.');
    });

    it('Text Cells', function () {
        var idCell = "markdowngV91Gh";
        beakerPO.checkBkCellByIdCell(idCell);
        var elemPreviw = beakerPO.getBkCellByIdCell(idCell).element(by.css('div[ng-show="mode==\'preview\'"]'));
        var elemEdit = beakerPO.getBkCellByIdCell(idCell).element(by.css('div[ng-show="mode==\'edit\'"]'));

        expect(elemPreviw.isDisplayed()).toBe(true);
        expect(elemEdit.isDisplayed()).toBe(false);

        beakerPO.checkSubString(elemPreviw.all(by.css('p')).get(0), "Beaker's text cells use Markdown, a text-to-HTML conversion tool that allows you to write using an e");
        beakerPO.checkSubString(elemPreviw.all(by.css('li')).get(0), "Markdown is good for making lists that emphasize your points,");
        beakerPO.checkSubString(elemPreviw.all(by.css('li')).get(1), "writing code documentation,");
        beakerPO.checkSubString(elemPreviw.all(by.css('li')).get(2), "and making bold statements.");
        beakerPO.checkSubString(elemPreviw.all(by.css('p')).get(1), "It has too many features to demonstrate all of them here, so we'll cut to this block quote:");
        beakerPO.checkSubString(elemPreviw.all(by.css('blockquote')).get(0), "The best way to get a feel for Markdown’s formatting syntax is simply to look at a Markdown-formatte");
        beakerPO.checkSubString(elemPreviw.all(by.css('p')).get(3), "Click on this cell to see how this formatting was specified or to edit its contents. Click away on t");
        beakerPO.checkSubString(elemPreviw.all(by.css('p')).get(4), "You can embed TeX (Donald Knuth\'s mathematical typesetting system) into a markdown cell by enclosing");
        beakerPO.checkSubString(elemPreviw.all(by.css('p')).get(5), "You can just copy-and-paste unicode characters in:", 0, 50);
        var katexElem = elemPreviw.all(by.css('p')).get(4).all(by.css('span.katex-html > span.base.textstyle.uncramped > span'));
        expect(katexElem.get(0).all(by.css('span > span.mord.mathit')).get(0).getText()).toBe('e');
        expect(katexElem.get(0).all(by.css('span.vlist span.mord.mathit')).get(0).getText()).toBe('i');
        beakerPO.checkHexCharCode(katexElem.get(0).all(by.css('span.vlist span.mord.mathit')).get(1), '3c0');
        expect(katexElem.get(1).getText()).toBe('+');
        expect(katexElem.get(2).getText()).toBe('1');
        expect(katexElem.get(3).getText()).toBe('=');
        expect(katexElem.get(4).getText()).toBe('0');

        beakerPO.getBkCellByIdCell(idCell).click();
        expect(elemPreviw.isDisplayed()).toBe(false);
        expect(elemEdit.isDisplayed()).toBe(true);

        var elemEditPreArr = elemEdit.all(by.css('.CodeMirror-code > pre'));
        beakerPO.checkSubString(elemEditPreArr.get(0), "Beaker's text cells use [Markdown](http://daringfireball.net/projects/markdown/syntax), a text-to-HT");
        beakerPO.checkSubString(elemEditPreArr.get(1), "you to write using an easy-to-read, easy-to-write plain text format.  Here's a quick demo:");
        beakerPO.checkSubString(elemEditPreArr.get(2), "");
        beakerPO.checkSubString(elemEditPreArr.get(3), "* Markdown is good for making *lists that emphasize your points*,");
        beakerPO.checkSubString(elemEditPreArr.get(4), "* writing `code documentation`,");
        beakerPO.checkSubString(elemEditPreArr.get(5), "* and making **bold** statements.");
        beakerPO.checkSubString(elemEditPreArr.get(6), "");
        beakerPO.checkSubString(elemEditPreArr.get(7), "It has too many features to demonstrate all of them here, so we'll cut to this block quote:");
        beakerPO.checkSubString(elemEditPreArr.get(8), "");
        beakerPO.checkSubString(elemEditPreArr.get(9), "> The best way to get a feel for Markdown’s formatting syntax is simply to look at a");
        beakerPO.checkSubString(elemEditPreArr.get(10), "Markdown-formatted document. For example, you can view the Markdown source for");
        beakerPO.checkSubString(elemEditPreArr.get(11), "the article text on this page here: http://daringfireball.net/projects/markdown/index.text");
        beakerPO.checkSubString(elemEditPreArr.get(12), "");
        beakerPO.checkSubString(elemEditPreArr.get(13), "Click on this cell to see how this formatting was specified or to edit its contents.");
        beakerPO.checkSubString(elemEditPreArr.get(14), "Click away on the background of the notebook to reformat and display.");
        beakerPO.checkSubString(elemEditPreArr.get(15), 'You can also use the {{(beaker.client.mac)?"&#x2318;":"Control"}}-Enter keyboard shortcut to format ');
        beakerPO.checkSubString(elemEditPreArr.get(16), "");
        beakerPO.checkSubString(elemEditPreArr.get(17), "You can embed TeX ([Donald Knuth's](https://en.wikipedia.org/wiki/Donald_Knuth) mathematical typeset");
        beakerPO.checkSubString(elemEditPreArr.get(18), "into a markdown cell by enclosing it with dollar characters: $e^{i\\pi}+1=0$.");
        beakerPO.checkSubString(elemEditPreArr.get(19), "");
        beakerPO.checkSubString(elemEditPreArr.get(20), "You can just copy-and-paste unicode characters in:", 0, 50);
        beakerPO.checkHexCharCodeSubString(elemEditPreArr.get(20), 51, 52, '73bb');
        beakerPO.checkHexCharCodeSubString(elemEditPreArr.get(20), 52, 53, '7483');
        beakerPO.checkSubString(elemEditPreArr.get(20), ", or you can enter HTML entities like &amp;dagg", 53);
        beakerPO.checkSubString(elemEditPreArr.get(21), "In fact, many basic HTML elements work, like super&lt;sup&gt;scripts&lt;/sup&gt; for super<sup>scrip");
    });

    it('Size, Color, and Face', function () {
        var idCell = "markdownMDiSsV";
        beakerPO.checkBkCellByIdCell(idCell);
        var elemPreviw = beakerPO.getBkCellByIdCell(idCell).element(by.css('div[ng-show="mode==\'preview\'"]'));
        var elemEdit = beakerPO.getBkCellByIdCell(idCell).element(by.css('div[ng-show="mode==\'edit\'"]'));

        expect(elemPreviw.isDisplayed()).toBe(true);
        expect(elemEdit.isDisplayed()).toBe(false);

        expect(elemPreviw.all(by.css('p')).get(0).getText()).toBe("You can change the size, color, and face of text with familar HTML <font> tags. For example, you can " +
            "make the text larger or smaller compared to its normal size. Or make it green, or change face to font to Times or Courier. You can even change the background " +
            "color like this: chocolate highlight.");
        expect(elemPreviw.all(by.css('p')).get(0).element(by.css('font[size="+2"]')).getText()).toBe('larger');
        expect(elemPreviw.all(by.css('p')).get(0).element(by.css('font[size="-2"]')).getText()).toBe('smaller');
        expect(elemPreviw.all(by.css('p')).get(0).element(by.css('font[color="green"]')).getText()).toBe('green');
        expect(elemPreviw.all(by.css('p')).get(0).element(by.css('font[face="Times"]')).getText()).toBe('Times');
        expect(elemPreviw.all(by.css('p')).get(0).element(by.css('font[face="Courier"]')).getText()).toBe('Courier');
        expect(elemPreviw.all(by.css('p')).get(0).element(by.css('font[style="background-color: chocolate"]')).getText()).toBe('chocolate highlight');
        beakerPO.checkSubString(elemPreviw.all(by.css('p')).get(1), "These tags work with the math and markdown modes, for example:", 0, 62);
        var katexElem = elemPreviw.all(by.css('p')).get(1).all(by.css('span.katex-html > span.base.textstyle.uncramped > span'));
        beakerPO.checkHexCharCode(katexElem.get(0), '3bb');
        expect(katexElem.get(1).getText()).toBe('=');
        expect(katexElem.get(2).getText()).toBe('4');
        expect(katexElem.get(3).getText()).toBe('8');
        expect(katexElem.get(4).getText()).toBe('0');
        expect(elemPreviw.all(by.css('p')).get(1).element(by.css('font[color="\#00d5ff "]')).isPresent()).toBe(true);
        expect(elemPreviw.all(by.css('p')).get(1).element(by.css('strong')).getText()).toBe('bold times');

        beakerPO.getBkCellByIdCell(idCell).click();
        expect(elemPreviw.isDisplayed()).toBe(false);
        expect(elemEdit.isDisplayed()).toBe(true);

        var elemEditPreArr = elemEdit.all(by.css('.CodeMirror-code > pre'));
        beakerPO.checkSubString(elemEditPreArr.get(0), "You can change the size, color, and face of text with familar HTML &lt;font&gt; tags.");
        beakerPO.checkSubString(elemEditPreArr.get(1), 'For example, you can make the text <font size="+2">larger</font> or <font size="-2">smaller</font> compared to its norma', 0, 120);
        beakerPO.checkSubString(elemEditPreArr.get(2), 'Or make it  <font color="green">green</font>, or change face to font to <font face="Times">Times</font> or <font face="C', 0, 120);
        beakerPO.checkSubString(elemEditPreArr.get(3), 'You can even change the background color like this: <font style="background-color: chocolate">chocolate highlight</font>', 0, 120);
        beakerPO.checkSubString(elemEditPreArr.get(4), "");
        beakerPO.checkSubString(elemEditPreArr.get(5), 'These tags work with the math and markdown modes, for example: <font color="#00d5ff ">$\\lambda = 480$</font>, or **<font', 0, 120);

    });

});