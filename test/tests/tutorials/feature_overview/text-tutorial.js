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

    describe('Formatting', function () {
        var idCell = "markdown8nMuAN";

        it('Preview Mode', function () {
            beakerPO.checkBkCellByIdCell(idCell);

            var elemPreviw = beakerPO.checkPreviewBkCellByIdCell(idCell);
            beakerPO.checkSubString(elemPreviw.all(by.css('p')).get(0), 'Beaker\'s text cells (insert one by clicking \'text\' in the blue button bar) are based primarily on ma');
            beakerPO.checkSubString(elemPreviw.all(by.css('p')).get(1), 'In addition, there are menu commands to control how the notebook is displayed:');
            beakerPO.checkSubString(elemPreviw.all(by.css('li')).get(0), 'Notebook → Lock: hides the all the code, and removes the boxes from around the cells.');
            beakerPO.checkSubString(elemPreviw.all(by.css('li')).get(1), 'View → Show Hierarchy: indents sections and adds numbering and lines to show hierarchy.');
            beakerPO.checkSubString(elemPreviw.all(by.css('li')).get(2), 'View → Advanced Mode: reduces vertical space and hides the big run button (you can still run cells w');
            beakerPO.checkSubString(elemPreviw.all(by.css('li')).get(3), 'View → Theme: switch from the default black-on-white color theme to the light-on-dark ambience theme');
        });

        it('Edit Mode', function () {
            var elemEdit = beakerPO.checkEditBkCellByIdCell(idCell);
            var elemEditPreArr = elemEdit.all(by.css('.CodeMirror-code > pre'));
            beakerPO.checkSubString(elemEditPreArr.get(0), 'Beaker\'s text cells (insert one by clicking \'text\' in the blue button bar) are based primarily on ma');
            beakerPO.checkSubString(elemEditPreArr.get(1), 'but have a number of more advanced features as described below.  There are also HTML and TeX cells,');
            beakerPO.checkSubString(elemEditPreArr.get(2), 'which you can insert with the \'code\' menu in the blue button bar, and are also explained in their ow');
            beakerPO.checkSubString(elemEditPreArr.get(3), 'sections below.  Images can be included \'inline\' in both HTML and text cells. ');
            beakerPO.checkSubString(elemEditPreArr.get(4), '');
            beakerPO.checkSubString(elemEditPreArr.get(5), 'In addition, there are menu commands to control how the notebook is displayed:');
            beakerPO.checkSubString(elemEditPreArr.get(6), '* **Notebook → Lock**: hides the all the code, and removes the boxes from around the cells.');
            beakerPO.checkSubString(elemEditPreArr.get(7), '* **View → Show Hierarchy**: indents sections and adds numbering and lines to show hierarchy.');
            beakerPO.checkSubString(elemEditPreArr.get(8), '* **View → Advanced Mode**: reduces vertical space and hides the big run button (you can still run c');
            beakerPO.checkSubString(elemEditPreArr.get(9), '* **View → Theme**: switch from the default black-on-white color theme to the light-on-dark ambience');
        });

    });

    describe('Text Cells', function () {
        var idCell = "markdowngV91Gh";

        it('Preview Mode', function () {
            beakerPO.checkBkCellByIdCell(idCell);
            var elemPreviw = beakerPO.checkPreviewBkCellByIdCell(idCell);

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
        });

        it('Edit Mode', function () {
            var elemEdit = beakerPO.checkEditBkCellByIdCell(idCell);
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
    });

    describe('Size, Color, and Face', function () {
        var idCell = "markdownMDiSsV";

        it('Preview Mode', function () {
            expect(beakerPO.getBkCellByIdCell(idCell).isPresent()).toBe(true);
            var elemPreviw = beakerPO.checkPreviewBkCellByIdCell(idCell);

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
        });

        it('Edit Mode', function () {
            var elemEdit = beakerPO.checkEditBkCellByIdCell(idCell);
            var elemEditPreArr = elemEdit.all(by.css('.CodeMirror-code > pre'));
            beakerPO.checkSubString(elemEditPreArr.get(0), "You can change the size, color, and face of text with familar HTML &lt;font&gt; tags.");
            beakerPO.checkSubString(elemEditPreArr.get(1), 'For example, you can make the text <font size="+2">larger</font> or <font size="-2">smaller</font> compared to its norma', 0, 120);
            beakerPO.checkSubString(elemEditPreArr.get(2), 'Or make it  <font color="green">green</font>, or change face to font to <font face="Times">Times</font> or <font face="C', 0, 120);
            beakerPO.checkSubString(elemEditPreArr.get(3), 'You can even change the background color like this: <font style="background-color: chocolate">chocolate highlight</font>', 0, 120);
            beakerPO.checkSubString(elemEditPreArr.get(4), "");
            beakerPO.checkSubString(elemEditPreArr.get(5), 'These tags work with the math and markdown modes, for example: <font color="#00d5ff ">$\\lambda = 480$</font>, or **<font', 0, 120);
        });
    });

    describe('Template Expansion', function () {
        var idCell = "markdownqlcer3";

        it('Define values on the beaker object', function () {
            beakerPO.scrollToCodeCellOutputByIdCell("codedBOCfX");
            beakerPO.checkCellOutputSubTextByIdCell("codedBOCfX",'2.7182818284590', 0, 15);
        });

        it('Preview Mode', function () {
            beakerPO.checkBkCellByIdCell(idCell);
            var elemPreviw = beakerPO.checkPreviewBkCellByIdCell(idCell);

            beakerPO.checkSubString(elemPreviw.all(by.css('p')).get(0), "Markdown cells can include values computed by JavaScript, or from any language via autotranslation a" );
            expect(elemPreviw.all(by.css('p')).get(0).all(by.css('code')).get(0).getText()).toBe('beaker');
            expect(elemPreviw.all(by.css('p')).get(0).all(by.css('code')).get(1).getText()).toBe('beaker.name');
            expect(elemPreviw.all(by.css('p')).get(0).all(by.css('code')).get(2).getText()).toBe('{{beaker.name}}');

            beakerPO.checkSubString(elemPreviw.all(by.css('p')).get(1), "Since you have full access to JavaScript you can call functions to do things like format numbers and");
            expect(elemPreviw.all(by.css('p')).get(1).all(by.css('span.mord.mathit')).get(0).getText()).toBe('e');
            beakerPO.checkSubString(elemPreviw.all(by.css('p')).get(2), "You can also customize content according to the reader's operating sytem. For example, you are on a ");
            beakerPO.checkSubString(elemPreviw.all(by.css('p')).get(3), "In order to get double braces without triggering JavaScript evaluation, use a zero-width unicode spa" );
        });

        it('Edit Mode', function () {
            var elemEdit = beakerPO.checkEditBkCellByIdCell(idCell);
            var elemEditPreArr = elemEdit.all(by.css('.CodeMirror-code > pre'));
            beakerPO.checkSubString(elemEditPreArr.get(0), "Markdown cells can include values computed by JavaScript, or from any language via autotranslation a");
            beakerPO.checkSubString(elemEditPreArr.get(1), 'Just enclose a JavaScript expression in double braces, and that code will be replaced with the resul');
            beakerPO.checkSubString(elemEditPreArr.get(2), 'For example, given the definition of `beaker.name` above, writing `{&#8203;{beaker.name}}` appears a');
            beakerPO.checkSubString(elemEditPreArr.get(3), 'on this cell to see the markdown source).');
            beakerPO.checkSubString(elemEditPreArr.get(4), '');
            beakerPO.checkSubString(elemEditPreArr.get(5), 'Since you have full access to JavaScript you can call functions to do things like');
            beakerPO.checkSubString(elemEditPreArr.get(6), 'format numbers and call out results computed elsewhere in your notebook.  For example, $e$ the base ');
            beakerPO.checkSubString(elemEditPreArr.get(7), '{{beaker.e.toFixed(3)}}.');
            beakerPO.checkSubString(elemEditPreArr.get(8), '');
            beakerPO.checkSubString(elemEditPreArr.get(9), "You can also customize content according to the reader's operating sytem.  For example, you are on a");
            beakerPO.checkSubString(elemEditPreArr.get(10), '{{(beaker.client.mac)?"Mac, so &#x2318;-O":"PC, so Control-O"}} opens a file.');
            beakerPO.checkSubString(elemEditPreArr.get(11), '');
            beakerPO.checkSubString(elemEditPreArr.get(12), 'In order to get double braces without triggering JavaScript evaluation, use a zero-width unicode spa');
            beakerPO.checkSubString(elemEditPreArr.get(13), '(see the markdown source for this cell).');
        });
    });

    describe('Section headings', function () {
        var idCell = "sectionIpgyB6";

        it('Preview Mode', function () {
            expect(beakerPO.getBkCellByIdCell(idCell).isPresent()).toBe(true);
            var elemPreviw = beakerPO.checkPreviewBkCellByIdCell(idCell);

            beakerPO.checkSubString(elemPreviw.all(by.css('p')).get(0), "Section headings may include Markdown and TeX:", 0, 46 );
            expect(elemPreviw.all(by.css('p')).get(0).element(by.css('strong')).getText()).toBe('bold');
            expect(elemPreviw.all(by.css('p')).get(0).element(by.css('code')).getText()).toBe('mono');

            var katexElem = elemPreviw.all(by.css('p')).get(0).all(by.css('span.katex-html > span.base.textstyle.uncramped > span'));
            beakerPO.checkHexCharCode(katexElem.get(0), '3a9');
            expect(katexElem.get(1).getText()).toBe('/');
            beakerPO.checkHexCharCode(katexElem.get(2), '221e');
        });

        it('Edit Mode', function () {
            var elemEdit = beakerPO.getEditBkCellByIdCell(idCell);
            beakerPO.getBkCellByIdCell(idCell).element(by.css('bk-markdown-editable')).click();
            expect(beakerPO.getPreviewBkCellByIdCell(idCell).isDisplayed()).toBe(false);
            expect(elemEdit.isDisplayed()).toBe(true);
            var elemEditPreArr = elemEdit.all(by.css('.CodeMirror-code > pre'));
            beakerPO.checkSubString(elemEditPreArr.get(0), "Section headings may include Markdown and TeX: **bold**, `mono`, $\\Omega / \\infty$");
        });
    });

    it('HTML', function () {
        var idCell = "codeB8fmAw";
        beakerPO.scrollToCodeCellOutputByIdCell(idCell);

        expect(beakerPO.getCodeCellOutputByIdCell(idCell).element(by.css('script')).getAttribute('innerHTML')).toBe('\nvar beaker = bkHelper.getBeakerObject().beakerObj;\n');

        var elemP = beakerPO.getCodeCellOutputByIdCell(idCell).all(by.css('div > p'));
        beakerPO.checkSubString(elemP.get(0), 'The usual text formatting tags work, like <em> for emphasis.');
        beakerPO.checkSubString(elemP.get(1), 'But you can also create interactive elements:', 0, 45);
        beakerPO.checkSubString(elemP.get(1).element(by.css('button')), 'What is a beaker?');
        beakerPO.checkSubString(elemP.get(2), 'You can combine HTML and JavaScript cells to program interactive applications within Beaker.');
        beakerPO.checkSubString(elemP.get(3), 'Click the contracting arrows in the menu of buttons at the top-right of this cell to hide the HTML s');
    });

    describe('Images', function () {
        it('Image in HTML cell', function () {
            beakerPO.checkImageByIdCell("codeS7gkvn");
        });

        var idCell = "markdownNOEwwT";
        it('Preview Mode in text cell', function () {
            expect(beakerPO.getBkCellByIdCell(idCell).isPresent()).toBe(true);
            var elemPreviw = beakerPO.checkPreviewBkCellByIdCell(idCell);
            beakerPO.checkSubString(elemPreviw.all(by.css('p')).get(0), "You can include literal images in text cells:" );
            beakerPO.checkAttribute(elemPreviw.element(by.css('p > img')), "src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYA", 0, 50);
        });

        it('Edit Mode in text cell', function () {
            var elemEdit = beakerPO.checkEditBkCellByIdCell(idCell);
            var elemEditPreArr = elemEdit.all(by.css('.CodeMirror-code > pre'));
            beakerPO.checkSubString(elemEditPreArr.get(0), 'You can include literal images in text cells: ');
            beakerPO.checkSubString(elemEditPreArr.get(1), '');
            beakerPO.checkSubString(elemEditPreArr.get(2), '<img width="30" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYA', 0, 71);
        });
    });

    it('TeX', function () {
        var idCell = "codegJITkE";
        beakerPO.scrollToCodeCellOutputByIdCell(idCell);

        idCell = "codegJITkE";
        var bkCell = beakerPO.getBkCellByIdCell(idCell).element(by.css('.CodeMirror-code'));
        beakerPO.checkSubString(bkCell.all(by.css('pre')).get(0), "1 +  \\frac{q^2}{(1-q)}+\\frac{q^6}{(1-q)(1-q^2)}+\\cdots =" );
        beakerPO.checkSubString(bkCell.all(by.css('pre')).get(1), "\\prod_{j=0}^{\\infty}\\frac{1}{(1-q^{5j+2})(1-q^{5j+3})}," );
        beakerPO.checkSubString(bkCell.all(by.css('pre')).get(2), "\\quad\\quad \\text{for }\\lvert q\\rvert<1." );

        var katexElem = beakerPO.getCodeCellOutputByIdCell(idCell).all(by.css('span.katex-html > span.base.textstyle.uncramped > span'));
        expect(katexElem.get(0).getText()).toBe('1');
        expect(katexElem.get(1).getText()).toBe('+');
        expect(beakerPO.getFormulaSubElement(katexElem.get(2), 0).getText()).toBe('(');
        expect(beakerPO.getFormulaSubElement(katexElem.get(2), 1).getText()).toBe('1');
        beakerPO.checkHexCharCode(beakerPO.getFormulaSubElement(katexElem.get(2), 2), '2212');
        expect(beakerPO.getFormulaSubElement(katexElem.get(2), 3).getText()).toBe('q');
        expect(beakerPO.getFormulaSubElement(katexElem.get(2), 4).getText()).toBe(')');
        expect(katexElem.get(3).getText()).toBe('+');
        expect(beakerPO.getFormulaSubElement(katexElem.get(4), 0).getText()).toBe('(');
        expect(beakerPO.getFormulaSubElement(katexElem.get(4), 1).getText()).toBe('1');
        beakerPO.checkHexCharCode(beakerPO.getFormulaSubElement(katexElem.get(4), 2), '2212');
        expect(beakerPO.getFormulaSubElement(katexElem.get(4), 3).getText()).toBe('q');
        expect(beakerPO.getFormulaSubElement(katexElem.get(4), 4).getText()).toBe(')');
        expect(katexElem.get(5).getText()).toBe('+');
        beakerPO.checkHexCharCode(katexElem.get(6), '22ef');
        expect(katexElem.get(7).getText()).toBe('=');
        expect(beakerPO.getFormulaSubElement(katexElem.get(8), 0).getText()).toBe('j');
        expect(beakerPO.getFormulaSubElement(katexElem.get(8), 1).getText()).toBe('=');
        expect(beakerPO.getFormulaSubElement(katexElem.get(8), 2).getText()).toBe('0');
        expect(beakerPO.getFormulaSubElement(katexElem.get(9), 0).getText()).toBe('(');
        expect(beakerPO.getFormulaSubElement(katexElem.get(9), 1).getText()).toBe('1');
        beakerPO.checkHexCharCode(beakerPO.getFormulaSubElement(katexElem.get(9), 2), '2212');
        expect(beakerPO.getFormulaSubElement(katexElem.get(9), 3).getText()).toBe('q\n5j+2');
        expect(katexElem.get(10).getText()).toBe(',');
        expect(katexElem.get(11).getText()).toBe('');
        expect(katexElem.get(12).getText()).toBe('');
        expect(katexElem.get(13).getText()).toBe('for ');
        beakerPO.checkHexCharCode(katexElem.get(14), '2223');
        expect(katexElem.get(15).getText()).toBe('q');
        beakerPO.checkHexCharCode(katexElem.get(16), '2223');
        expect(katexElem.get(17).getText()).toBe('<');
        expect(katexElem.get(18).getText()).toBe('1');
        expect(katexElem.get(19).getText()).toBe('.');
    });

});