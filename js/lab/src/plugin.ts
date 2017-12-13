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

import { JSONArray } from '@phosphor/coreutils';
import { Widget } from '@phosphor/widgets';
import { DisposableDelegate } from '@phosphor/disposable';
import { DocumentRegistry } from '@jupyterlab/docregistry';
import { INotebookModel, NotebookPanel, Notebook } from '@jupyterlab/notebook';
import { Cell, CodeCell, CodeCellModel } from '@jupyterlab/cells';
import { showDialog, Dialog } from '@jupyterlab/apputils';
import { Kernel } from '@jupyterlab/services';
import { CodeMirrorEditor } from '@jupyterlab/codemirror';

interface msgData {
  name?: string,
  value?: any
}

declare global {
  interface Window {
    beakerx: any,
    require: Function
  }
}

const LINE_COMMENT_CHAR = '//';

function displayHTML(widget: Widget, html: string): void {
  if (!widget.node || !html) {
    return;
  }

  const childElement = document.createElement('pre');

  childElement.classList.add('jp-RenderedHTML');
  childElement.innerHTML = html;
  widget.node.appendChild(childElement);
}

function registerGlobal(): void {
  window.beakerx = window.beakerx || {};
  window.beakerx.displayHTML = displayHTML;
}

function sendJupyterCodeCells(
  kernelInstance: Kernel.IKernelConnection,
  notebook: Notebook,
  filter: string
): void {
  const comm = kernelInstance.connectToComm('beaker.getcodecells');
  const codeCells = <JSONArray>getCodeCellsByTag(notebook, filter)
    .map((cell: CodeCell): object => ({
      cell_type: cell.model.type,
      ...cell.model.toJSON()
    })
  );

  comm.open();
  comm.send({ code_cells: codeCells });
  comm.dispose();
}

function getCodeCellsByTag(notebook: Notebook, tag: string): Cell[] {
  let cells = notebook.widgets || [];

  return cells.filter((cell) => {
    const tags: any = cell.model.metadata.get('tags');

    return (
      cell.model instanceof CodeCellModel &&
      tags && tags.length && tags.includes(tag)
    );
  });
}

function registerCommentOutCmd(panel) {
  const cells = panel.notebook.widgets || [];

  cells
    .filter((cell) => (cell.editor instanceof CodeMirrorEditor))
    .forEach(setCodeMirrorLineComment);
}

function setCodeMirrorLineComment(cell: Cell) {
  if (!(cell instanceof CodeCell)) {
    return;
  }

  const cm = <CodeMirrorEditor>cell.editor;
  const doc = cm.doc;

  if (!doc.mode.lineComment) {
    doc.mode.lineComment = LINE_COMMENT_CHAR;
  }
}

function registerCommTargets(panel: NotebookPanel, context: DocumentRegistry.IContext<INotebookModel>) {
  const session = context.session;
  const kernelInstance = session.kernel;
  const notebook = panel.notebook;

  kernelInstance.registerCommTarget('beaker.getcodecells', function(comm, msg) {
    comm.onMsg = function(msg) {
      const data: msgData = <object>msg.content.data;

      if (!data.name) {
        return;
      }

      if(data.name == "CodeCells") {
        sendJupyterCodeCells(kernelInstance, notebook, JSON.parse(data.value));
      }

      window.beakerx[data.name] = JSON.parse(data.value);
    };
  });

  kernelInstance.registerCommTarget('beaker.autotranslation', function(comm, msg) {
    comm.onMsg = function(msg) {
      const data: msgData = <object>msg.content.data;

      window.beakerx[data.name] = JSON.parse(data.value);
    };
  });

  kernelInstance.registerCommTarget('beaker.tag.run', function(comm, msg) {
    comm.onMsg = function(msg) {
      const data: { state?: any } = <object>msg.content.data;

      if(!data.state || !data.state.runByTag) {
        return;
      }

      const matchedCells = getCodeCellsByTag(notebook, data.state.runByTag);

      if (matchedCells.length === 0) {
        showDialog({
          title: 'No cell with the tag !',
          body: 'Tag: ' + data.state.runByTag,
          buttons: [ Dialog.okButton({ label: 'OK' }) ]
        });
      } else {
        matchedCells.forEach((cell) => {
          cell instanceof CodeCell && CodeCell.execute(cell, session);
        });
      }
    };
  });
}

class BeakerxExtension implements DocumentRegistry.WidgetExtension {
  createNew(panel: NotebookPanel, context: DocumentRegistry.IContext<INotebookModel>) {
    registerGlobal();

    Promise.all([panel.ready, context.ready]).then(function() {
      registerCommentOutCmd(panel);
      registerCommTargets(panel, context);
    });

    return new DisposableDelegate(() => { });
  }
}

export default BeakerxExtension;
