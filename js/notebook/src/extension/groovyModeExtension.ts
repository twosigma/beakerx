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

import {addLineMagicsOverlay} from "./codeMirror";

export namespace GroovyMode {
  export const LINE_COMMENT_CHAR = '//';

  export function setCodeMirrorLineComment(cell: any, CodeMirror) {
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

    cell.auto_highlight();
    addLineMagicsOverlay(cm);
  }

  export function extendWithLineComment(Jupyter: any, CodeMirror: any) {
    CodeMirror.extendMode('groovy', { lineComment: LINE_COMMENT_CHAR });

    Jupyter.notebook.get_cells().map((cell) => setCodeMirrorLineComment(cell, CodeMirror));
  }
}
