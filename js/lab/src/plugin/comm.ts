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

import { DocumentRegistry } from '@jupyterlab/docregistry';
import { INotebookModel, Notebook, NotebookPanel } from '@jupyterlab/notebook';
import { showDialog, Dialog, IClientSession } from '@jupyterlab/apputils';
import { sendJupyterCodeCells, getCodeCellsByTag } from './codeCells';
import { messageData } from '../interface/messageData';
import { Kernel } from "@jupyterlab/services";
import { CodeCell } from '@jupyterlab/cells';

const BEAKER_GETCODECELLS = 'beaker.getcodecells';
const BEAKER_AUTOTRANSLATION = 'beaker.autotranslation';
const BEAKER_TAG_RUN = 'beaker.tag.run';

const getMsgHandlers = (
  session: IClientSession,
  kernelInstance: Kernel.IKernelConnection,
  notebook: Notebook
) => ({
  [BEAKER_GETCODECELLS]: (msg) => {
    const data: messageData = <object>msg.content.data;

    if (!data.name) {
      return;
    }

    if(data.name == "CodeCells") {
      sendJupyterCodeCells(kernelInstance, notebook, JSON.parse(data.value));
    }

    window.beakerx[data.name] = JSON.parse(data.value);
  },

  [BEAKER_AUTOTRANSLATION]: (msg) => {
    const data: messageData = <object>msg.content.data;

    window.beakerx[data.name] = JSON.parse(data.value);
  },

  [BEAKER_TAG_RUN]: (msg) => {
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
  }
});

export const registerCommTargets = (panel: NotebookPanel, context: DocumentRegistry.IContext<INotebookModel>): void => {
  const session = context.session;
  const kernelInstance = session.kernel;
  const notebook = panel.notebook;
  const msgHandlers = getMsgHandlers(session, kernelInstance, notebook);

  kernelInstance.registerCommTarget(BEAKER_GETCODECELLS, (comm) => {
    comm.onMsg = msgHandlers[BEAKER_GETCODECELLS];
  });

  kernelInstance.registerCommTarget(BEAKER_AUTOTRANSLATION, (comm) => {
    comm.onMsg = msgHandlers[BEAKER_AUTOTRANSLATION]
  });

  kernelInstance.registerCommTarget(BEAKER_TAG_RUN, (comm) => {
    comm.onMsg = msgHandlers[BEAKER_TAG_RUN]
  });

  kernelInstance.requestCommInfo({}).then((msg): void => {
    assignMsgHandlersToExistingComms(msg.content.comms, kernelInstance, msgHandlers);
  });
};

const assignMsgHandlersToExistingComms = (
  comms: Object,
  kernelInstance: Kernel.IKernelConnection,
  msgHandlers: Object
): void => {
  for (let commId in comms) {
    let comm = kernelInstance.connectToComm(comms[commId].target_name, commId);

    assignMsgHandlerToComm(comm, msgHandlers[comm.targetName]);
  }
};

const assignMsgHandlerToComm = (comm, handler): void => {
  if (handler) {
    comm.onMsg = handler;
  }
};
