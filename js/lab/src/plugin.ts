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
import { DisposableDelegate } from '@phosphor/disposable';
import { DocumentRegistry } from '@jupyterlab/docregistry';
import { INotebookModel, NotebookPanel, Notebook } from '@jupyterlab/notebook';
import { Cell, CodeCell, CodeCellModel } from '@jupyterlab/cells';
import { showDialog, Dialog } from '@jupyterlab/apputils';
import { Kernel } from '@jupyterlab/services';

interface msgData {
  name?: string,
  value?: any
}

declare global {
  interface Window {
    beakerx: any
  }
}

function registerGlobal() {
  window.beakerx = window.beakerx || {};
}

function sendJupyterCodeCells(
  kernelInstance: Kernel.IKernelConnection,
  notebook: Notebook,
  comm: Kernel.IComm,
  filter: string
) {
  const codeCells = <JSONArray>getCodeCellsByTag(notebook, filter).map(
    (cell: CodeCell): object => cell.model.toJSON()
  );

  comm.send({ code_cells: codeCells });
}

function getCodeCellsByTag(notebook: Notebook, tag: string): Cell[] {
  let cells = notebook.widgets || [];

  return cells.filter(function(cell) {
    const tags: any = cell.model.metadata.get('tags');

    return (
      cell.model instanceof CodeCellModel &&
      tags && tags.length && tags.includes(tag)
    );
  });
}

function registerCommTargets(panel: NotebookPanel, context: DocumentRegistry.IContext<INotebookModel>) {
  const session = context.session;
  const kernelInstance = session.kernel;
  const notebook = panel.notebook;

  kernelInstance.registerCommTarget('beaker.getcodecells', function(comm, msg) {
    const data: msgData = <object>msg.content.data;

    comm.onMsg = function(msg) {
      if(data.name == "CodeCells") {
        sendJupyterCodeCells(kernelInstance, notebook, comm, JSON.parse(data.value));
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
      registerCommTargets(panel, context);
    });

    return new DisposableDelegate(() => { });
  }
}

export default BeakerxExtension;
