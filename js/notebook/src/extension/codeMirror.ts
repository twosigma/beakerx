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

/// <reference path='../types/index.d.ts'/>

export function extendHighlightModes(Jupyter: any) {
  Jupyter.CodeCell.options_default.highlight_modes = {
    ...Jupyter.CodeCell.options_default.highlight_modes,
    magic_python: {reg: ['^%%python']},
    magic_groovy: {reg: ['^%%groovy']},
    magic_java: {reg: ['^%%java']},
    magic_scala: {reg: ['^%%scala']},
    magic_kotlin: {reg: ['^%%kotlin']},
    magic_clojure: {reg: ['^%%clojure']},
    magic_sql: {reg: ['^%%sql']},
    magic_html: {reg: ['^%%html']}
  };
}

const lineMagicOverlay = {
  startState() {
    return { firstMatched: false, inMagicLine: false };
  },

  token(stream, state) {
    if (!state.firstMatched) {
      state.firstMatched = true;

      if (stream.match("%", false)) {
        state.inMagicLine = true;
      }
    }

    if (state.inMagicLine) {
      stream.eat(() => {
        return true;
      });

      if (stream.eol()) {
        state.inMagicLine = false;
      }

      return "line_magic";
    }

    stream.skipToEnd();

    return null;
  }
};

export function autoHighlightLineMagics(code_mirror) {
  const current_mode = code_mirror.getOption('mode');
  const first_line = code_mirror.getLine(0);
  const re = /^%\w+/;

  if (first_line.match(re) !== null) {
    // Add an overlay mode to recognize the first line as "magic" instead
    // of the mode used for the rest of the cell.
    CodeMirror.defineMode('line_magic', (config) => {
      return CodeMirror.overlayMode(CodeMirror.getMode(config, current_mode), lineMagicOverlay);
    });

    code_mirror.setOption('mode', 'line_magic');
  }
}

export function addLineMagicsOverlay(code_mirror) {
  autoHighlightLineMagics(code_mirror);
  code_mirror.on("focus", () => autoHighlightLineMagics(code_mirror));
  code_mirror.on("change", () => autoHighlightLineMagics(code_mirror));
  code_mirror.on("blur", () => autoHighlightLineMagics(code_mirror));
}

export default {
  extendHighlightModes,
  addLineMagicsOverlay
};
