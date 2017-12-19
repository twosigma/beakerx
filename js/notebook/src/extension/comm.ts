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


declare global {
  interface Window {
    beakerx: any
  }
}

const BEAKER_GETCODECELLS = 'beaker.getcodecells';
const BEAKER_AUTOTRANSLATION = 'beaker.autotranslation';
const BEAKER_TAG_RUN = 'beaker.tag.run';

const utils = require('base/js/utils');
const dialog = require('base/js/dialog');

const msgHandlers = {
  [BEAKER_GETCODECELLS]: (msg) => {
    if(msg.content.data.name == "CodeCells"){
      sendJupyterCodeCells(JSON.parse(msg.content.data.value));
    }

    msgHandlers[BEAKER_AUTOTRANSLATION](msg);
  },

  [BEAKER_AUTOTRANSLATION]: (msg) => {
    window.beakerx[msg.content.data.name] = JSON.parse(msg.content.data.value);
  },

  [BEAKER_TAG_RUN]: (msg) => {
    if (!msg.content.data.state || !msg.content.data.state.runByTag) {
      return;
    }

    const notebook = Jupyter.notebook;
    const cells = Jupyter.notebook.get_cells();
    const indexList = cells.reduce((acc, cell, index) => {
      if (cell._metadata.tags && cell._metadata.tags.includes(msg.content.data.state.runByTag)) {
        acc.push(index);
      }

      return acc;
    }, []);

    if (indexList.length === 0) {
      dialog.modal({
        title: 'No cell with the tag !',
        body: 'Tag: ' + msg.content.data.state.runByTag,
        buttons: {'OK': {'class': 'btn-primary'}},
        notebook: Jupyter.notebook,
        keyboard_manager: Jupyter.keyboard_manager,
      });
    } else {
      notebook.execute_cells(indexList);
    }
  }
};

export const registerCommTargets = (kernel: any): void => {
  kernel.comm_manager.register_target(BEAKER_GETCODECELLS, function(comm) {
    comm.on_msg(msgHandlers[BEAKER_GETCODECELLS]);
  });
  kernel.comm_manager.register_target(BEAKER_AUTOTRANSLATION, function(comm) {
    comm.on_msg(msgHandlers[BEAKER_AUTOTRANSLATION]);
  });
  kernel.comm_manager.register_target(BEAKER_TAG_RUN, function(comm) {
    comm.on_msg(msgHandlers[BEAKER_TAG_RUN]);
  });

  kernel.send_shell_message(
    "comm_info_request",
    {},
    {
      shell: {
        reply: (msg) => { assignMsgHandlersToExistingComms(msg.content.comms, kernel); }
      }
    }
  );
};

const sendJupyterCodeCells = (filter: string) => {
  const data: { code_cells: any } = { code_cells: [] };
  const comm = Jupyter.notebook.kernel.comm_manager.new_comm(
    "beaker.getcodecells", null, null, null, utils.uuid()
  );

  data.code_cells = Jupyter.notebook.get_cells().filter(function (cell) {
    if (cell._metadata.tags) {
      return cell.cell_type == 'code' && cell._metadata.tags.includes(filter);
    }

    return false;
  });

  comm.send(data);
  comm.close();
};

const assignMsgHandlersToExistingComms = (comms, kernel) => {
  for (let commId in comms) {
    let comm = kernel.comm_manager.new_comm(comms[commId].target_name, null, null, null, commId);

    assignMsgHandlerToComm(comm);
  }
};

const assignMsgHandlerToComm = (comm) => {
  const handler = msgHandlers[comm.target_name];

  if (handler) {
    comm.on_msg(handler);
  }
};
