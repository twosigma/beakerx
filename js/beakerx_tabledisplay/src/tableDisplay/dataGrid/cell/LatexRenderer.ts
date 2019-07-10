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

import * as katex from 'katex';

export const katexCss = require('katex/dist/katex.css').toString();

const latexFormulaRegex = /^(?:\$)(.+)(?:\$)$/; // match strings like '$e^{i\pi} + 1 = 0$'
const latexCache = {};

export default class LatexRenderer {

    /**
     * Convert given LaTeX formula into HTML representation.
     * @param text - ex. '$e^{i\pi} + 1 = 0$'
     */
    static latexToHtml(text: string): string {
        let [, formula] = text.match(latexFormulaRegex);

        if (latexCache[formula]) {
            return latexCache[formula];
        }

        return latexCache[formula] = katex.renderToString(formula, {
            throwOnError: false
        });
    }

    /**
     * Check if given string is LaTeX formula.
     * Ex.
     * @param text - ex. $\\left(\\LARGE{AB}\\right)$
     */
    static isLatexFormula(text: string) {
        return latexFormulaRegex.test(text);
    }

    /**
     * Get base64 encoded SVG element
     */
    static getLatexImageData(latexHTML: string, width: string, height: string, color: string, vAlign: string,
                             hAlign: string): string {
        const svgEl = LatexRenderer.getSVGElement(latexHTML, width, height, color, vAlign, hAlign);
        return LatexRenderer.getBase64EncodedImage(svgEl);
    }

    /**
     * Get SVG element with LaTeX html included.
     */
    private static getSVGElement(latexHTML: string, width: string, height: string, color: string, vAlign: string,
                          hAlign: string): SVGSVGElement {
        const ns = 'http://www.w3.org/2000/svg';
        const svgEl = document.createElementNS(ns, 'svg');
        svgEl.setAttribute('width', width);
        svgEl.setAttribute('height', height);


        const foreignObject = document.createElementNS(ns, 'foreignObject');
        foreignObject.setAttribute('width', width);
        foreignObject.setAttribute('height', height);

        const div = document.createElement('div');
        div.setAttribute('style', `display: table-cell; width: ${width}px; height: ${height}px; color: ${color}; vertical-align: ${vAlign === 'center' ? 'middle' : vAlign}; text-align: ${hAlign}`);
        div.innerHTML = `<style>${katexCss}</style>${latexHTML}`;

        foreignObject.appendChild(div);
        svgEl.appendChild(foreignObject);
        return svgEl;
    }

    /**
     * Encode SVG element into base64
     */
    private static getBase64EncodedImage(svgEl: SVGSVGElement): string {
        const xml = new XMLSerializer().serializeToString(svgEl);
        // make it base64
        const svg64 = btoa(unescape(encodeURIComponent(xml)));
        const b64Start = 'data:image/svg+xml;base64,';

        // prepend a "header"
        const image64 = b64Start + svg64;

        return image64;
    }
}