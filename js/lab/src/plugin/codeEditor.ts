/*
 *  Copyright 2017 TWO SIGMA OPEN SOURCE, LLC
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

import { CodeMirrorEditor } from "@jupyterlab/codemirror";
import { Cell, CodeCell } from '@jupyterlab/cells';

import 'codemirror/mode/groovy/groovy';
import {NotebookPanel} from "@jupyterlab/notebook";

const LINE_COMMENT_CHAR = '//';
const LINE_MAGIC_MODE = 'line_magic';
const CodeMirror = require("codemirror");

export const registerCommentOutCmd = (panel: NotebookPanel) => {
  const cells = panel.notebook.widgets || [];

  cells
    .filter((cell) => (cell.editor instanceof CodeMirrorEditor))
    .forEach(setCodeMirrorLineComment);
};

const setCodeMirrorLineComment = (cell: Cell) => {
  if (!(cell instanceof CodeCell)) {
    return;
  }

  const editor = <CodeMirrorEditor>cell.editor;
  const cmEditor = editor.editor;
  const mode = cmEditor.getMode();

  if (mode.lineComment) {
    return;
  }

  const CodeMiror = cmEditor.constructor;
  const doc = editor.doc;

  CodeMiror.extendMode(mode.name, { 'lineComment': LINE_COMMENT_CHAR });

  mode.lineComment = LINE_COMMENT_CHAR;
  doc.mode = mode;
};

export function extendHighlightModes(panel: NotebookPanel) {
  const cells = panel.notebook.widgets || [];

  cells
    .filter((cell) => (cell.editor instanceof CodeMirrorEditor))
    .forEach(setLineMagicForCell);

  CodeMirror.defineInitHook(addLineMagicsOverlay);
}

function setLineMagicForCell(cell: Cell) {
  if (!(cell instanceof CodeCell)) {
    return;
  }

  addLineMagicsOverlay((<CodeMirrorEditor>cell.editor).editor);
}

const lineMagicOverlay = {
  startState() {
    return { firstMatched: false, inMagicLine: false };
  },

  token(stream, state) {
    if (stream.match(/^%(%classpath|%spark|\w+)/, false)) {
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

export function addLineMagicsOverlay(editor: any) {
  autoHighlightLineMagics(editor);

  editor.off("focus", autoHighlightLineMagics);
  editor.on("focus", autoHighlightLineMagics);
  editor.off("change", autoHighlightLineMagics);
  editor.on("change", autoHighlightLineMagics);
  editor.off("blur", autoHighlightLineMagics);
  editor.on("blur", autoHighlightLineMagics);

  editor.refresh();
}
