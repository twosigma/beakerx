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
     * Convers given LaTeX formula into HTML represantation.
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
}