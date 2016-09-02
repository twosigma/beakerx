/* eslint no-console:0 */


/*
 *copied from https://github.com/Khan/KaTeX/tree/master/contrib/auto-render
 *until https://github.com/Khan/KaTeX/issues/425 is resolved.
 */


/*
 *The MIT License (MIT)
 *
 *Copyright (c) 2015 Khan Academy
 *
 *This software also uses portions of the underscore.js project, which is
 *MIT licensed with the following copyright:
 *
 *Copyright (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative
 *Reporters & Editors
 *
 *Permission is hereby granted, free of charge, to any person obtaining a copy
 *of this software and associated documentation files (the "Software"), to deal
 *in the Software without restriction, including without limitation the rights
 *to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *copies of the Software, and to permit persons to whom the Software is
 *furnished to do so, subject to the following conditions:
 *
 *The above copyright notice and this permission notice shall be included in all
 *copies or substantial portions of the Software.
 *
 *THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *SOFTWARE.
*/

(function() {
  'use strict';
  angular.module('bk.katexhelper', []).factory('katexhelper', function() {
    return {
      splitWithDelimiters: function(text, delimiters) {
        var data = [{type: "text", data: text}];
        delimiters = delimiters.delimiters;
        for(var i = 0; i<delimiters.length; i++){
          var delimiter = delimiters[i];
          data = this.splitAtDelimiters(
            data, delimiter.left, delimiter.right,
            delimiter.display || false);
        }
        return data;
      },
      renderMathInText: function(element, text, delimiters, id) {
        var data = this.splitWithDelimiters(text, delimiters);
        var fragment = document.createDocumentFragment();
        $("[cellid='"+id+"']").find('.katex_error').remove();
        for(var i = 0; i<data.length; i++){
          if (data[i].type === "text"){
            fragment.appendChild(document.createTextNode(data[i].data));
          } else {
            var element = document.createElement("div");
            fragment.appendChild(element);
            element.style.float = "left";
            var math = data[i].data;
            try {
              katex.render(math, element, {throwOnError: false});
            } catch(err) {
              var errorDiv = document.createElement('div');
              errorDiv.className = 'katex_error';
              errorDiv.style.color = '#AF061B';
              errorDiv.style.border = '1px solid #AF061B';
              errorDiv.style.margin = '-1px';
              errorDiv.style.minHeight = '17px';
              errorDiv.style.padding = '0px 0 8px 20px';
              errorDiv.style.fontFamily = '"Roboto Mono", monospace';

              var errorMain = document.createElement('h6');
              errorMain.appendChild(document.createTextNode('Error'));
              errorMain.style.fontSize = '13px';
              errorMain.style.fontWeight = 'bold';
              errorMain.style.fontHeight = '1em';
              errorMain.style.marginBottom = '0';

              var errorSpan = document.createElement('span');
              errorSpan.appendChild(document.createTextNode(err.message));

              errorDiv.appendChild(errorMain);
              errorDiv.appendChild(errorSpan);

              $("[cellid='"+id+"']").find('.markdown-area').parent().append(errorDiv);
              return fragment;
            }
          }
        }
        return fragment;
      },
      renderElem: function(element, delimiters, ignoredTags, id) {
        var elem = element[0];
        for(var i = 0; i<elem.childNodes.length; i++){
          var childNode = elem.childNodes[i];
          if (childNode.nodeType === 3){
            // Text node
            var frag = this.renderMathInText(element, childNode.textContent, delimiters, id);
            i += frag.childNodes.length - 1;
            elem.replaceChild(frag, childNode);
          } else if (childNode.nodeType === 1){
            // Element node
            if (ignoredTags || ignoredTags != undefined){
              var shouldRender = ignoredTags.indexOf(
                  childNode.nodeName.toLowerCase()) === -1;
            }

            if (shouldRender){
              this.renderElem(childNode, delimiters, ignoredTags);
            }
          }
          // Otherwise, it's something else, and ignore it.
        }
      },
      defaultOptions: {
        delimiters: [
          {left: "$$", right: "$$", display: true},
          {left: "\\[", right: "\\]", display: true},
          {left: "\\(", right: "\\)", display: false},
          // LaTeX uses this, but it ruins the display of normal `$` in text:
          {left: "$", right: "$", display: false},
        ],

        ignoredTags: [
          "script", "noscript", "style", "textarea", "pre", "code",
        ]
      },
      extend: function(obj) {
        // Adapted from underscore.js' `_.extend`. See LICENSE.txt for license.
        var source;
        var prop;
        for(var i = 1, length = arguments.length; i<length; i++){
          source = arguments[i];
          for(prop in source){
            if (Object.prototype.hasOwnProperty.call(source, prop)){
              obj[prop] = source[prop];
            }
          }
        }
        return obj;
      },
      findEndOfMath: function(delimiter, text, startIndex) {
        // Adapted from
        // https://github.com/Khan/perseus/blob/master/src/perseus-markdown.jsx
        var index = startIndex;
        var braceLevel = 0;

        var delimLength = delimiter.length;

        while(index<text.length) {
          var character = text[index];

          if (braceLevel<=0 &&
            text.slice(index, index + delimLength) === delimiter){
            return index;
          } else if (character === "\\"){
            index++;
          } else if (character === "{"){
            braceLevel++;
          } else if (character === "}"){
            braceLevel--;
          }

          index++;
        }

        return -1;
      },
      splitAtDelimiters: function(startData, leftDelim, rightDelim, display) {
        var finalData = [];

        for(var i = 0; i<startData.length; i++){
          if (startData[i].type === "text"){
            var text = startData[i].data;

            var lookingForLeft = true;
            var currIndex = 0;
            var nextIndex;

            nextIndex = text.indexOf(leftDelim);
            if (nextIndex !== -1){
              currIndex = nextIndex;
              finalData.push({
                type: "text",
                data: text.slice(0, currIndex),
              });
              lookingForLeft = false;
            }

            while(true) {
              if (lookingForLeft){
                nextIndex = text.indexOf(leftDelim, currIndex);
                if (nextIndex === -1){
                  break;
                }

                finalData.push({
                  type: "text",
                  data: text.slice(currIndex, nextIndex),
                });

                currIndex = nextIndex;
              } else {
                nextIndex = this.findEndOfMath(
                  rightDelim,
                  text,
                  currIndex + leftDelim.length);
                if (nextIndex === -1){
                  break;
                }

                finalData.push({
                  type: "math",
                  data: text.slice(
                    currIndex + leftDelim.length,
                    nextIndex),
                  rawData: text.slice(
                    currIndex,
                    nextIndex + rightDelim.length),
                  display: display,
                });

                currIndex = nextIndex + rightDelim.length;
              }

              lookingForLeft = !lookingForLeft;
            }

            finalData.push({
              type: "text",
              data: text.slice(currIndex),
            });
          } else {
            finalData.push(startData[i]);
          }
        }
        return finalData;
      }
    };
  });
})();