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

export const LINE_COMMENT_CHAR = '//';
export const LINE_MAGIC_MODE = 'line_magic';

export function extendWithLineComment(Jupyter: any, CodeMirror: any) {
  CodeMirror.extendMode('groovy', { lineComment: LINE_COMMENT_CHAR });

  Jupyter.notebook.get_cells().map(setCodeMirrorLineComment);
}

function setCodeMirrorLineComment(cell: any) {
  if (cell.cell_type !== 'code') {
    return;
  }

  const cm = cell.code_mirror;
  const doc = cm.getDoc();
  const mode = cm.getMode();

  if (!mode.lineComment) {
    mode.lineComment = LINE_COMMENT_CHAR;
    doc.mode = mode;
  }
}

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

  Jupyter.notebook.get_cells().map(setLineMagicForCell);
  CodeMirror.defineInitHook(addLineMagicsOverlay);
}

function setLineMagicForCell(cell) {
  cell.auto_highlight();
  addLineMagicsOverlay(cell.code_mirror);
}

const lineMagicOverlay = {
  startState() {
    return { firstMatched: false, inMagicLine: false };
  },

  token(stream, state) {
    if (stream.match(/^%(%classpath|%spark|\w+)/)) {
      state.inMagicLine = true;
    }

    if (state.inMagicLine) {
      stream.eat(() => true);

      if (stream.eol()) {
        state.inMagicLine = false;
      }

      return LINE_MAGIC_MODE;
    }

    stream.skipToEnd();

    return null;
  }
};

export function autoHighlightLineMagics(code_mirror) {
  const current_mode = code_mirror.getOption('mode');

  if (current_mode === LINE_MAGIC_MODE) {
    return;
  }

  const re = /^%(%classpath|%spark|\w+)/;

  code_mirror.eachLine((line) => {
    if (line && line.text.match(re) !== null) {
      // Add an overlay mode to recognize the first line as "line magic" instead
      // of the mode used for the rest of the cell.
      CodeMirror.defineMode(LINE_MAGIC_MODE, (config) => {
        return CodeMirror.overlayMode(CodeMirror.getMode(config, current_mode), lineMagicOverlay);
      });

      code_mirror.setOption('mode', LINE_MAGIC_MODE);

      return false;
    }
  });
}

export function addLineMagicsOverlay(code_mirror) {
  autoHighlightLineMagics(code_mirror);
  code_mirror.off("focus", autoHighlightLineMagics);
  code_mirror.on("focus", autoHighlightLineMagics);
  code_mirror.off("change", autoHighlightLineMagics);
  code_mirror.on("change", autoHighlightLineMagics);
  code_mirror.off("blur", autoHighlightLineMagics);
  code_mirror.on("blur", autoHighlightLineMagics);
}
