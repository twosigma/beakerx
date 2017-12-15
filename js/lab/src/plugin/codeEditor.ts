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

const LINE_COMMENT_CHAR = '//';

export const registerCommentOutCmd = (panel) => {
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
