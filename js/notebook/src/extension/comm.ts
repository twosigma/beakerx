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

import BeakerXApi from "beakerx_shared/lib/api/BeakerXApi";

declare global {
  interface Window {
    beakerx: any
  }
}

export const BEAKER_GETCODECELLS = 'beakerx.getcodecells';
export const BEAKER_GET_URL_ARG = 'beakerx.geturlarg';
export const BEAKER_AUTOTRANSLATION = 'beakerx.autotranslation';
export const BEAKER_TAG_RUN = 'beakerx.tag.run';

const utils = require('base/js/utils');
const dialog = require('base/js/dialog');
const {Comm} = require('services/kernels/comm');

const msgHandlers = {
  [BEAKER_GETCODECELLS]: (msg) => {
    if (msg.content.data.state.name == "CodeCells") {
      sendJupyterCodeCells(JSON.parse(msg.content.data.state.value), msg.content.data.url);
    }

    msgHandlers[BEAKER_AUTOTRANSLATION](msg);
  },

  [BEAKER_GET_URL_ARG]: (msg) => {
    if (msg.content.data.state.name == "URL_ARG") {
        sendArgUrl(msg.content.data.url, msg.content.data.type, msg.content.data.state.arg_name);
    }
  },

  [BEAKER_AUTOTRANSLATION]: (msg) => {
    window.beakerx['LOCK_PROXY'] = true;
    window.beakerx[msg.content.data.state.name] = JSON.parse(msg.content.data.state.value);
    window.beakerx['LOCK_PROXY'] = false;
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
  kernel.comm_manager.register_target(BEAKER_GETCODECELLS, function (comm) {
    comm.on_msg(msgHandlers[BEAKER_GETCODECELLS]);
  });

  kernel.comm_manager.register_target(BEAKER_AUTOTRANSLATION, function (comm) {
    comm.on_msg(msgHandlers[BEAKER_AUTOTRANSLATION]);
  });

  kernel.comm_manager.register_target(BEAKER_TAG_RUN, function (comm) {
    comm.on_msg(msgHandlers[BEAKER_TAG_RUN]);
  });

  kernel.comm_manager.register_target(BEAKER_GET_URL_ARG, function (comm) {
    comm.on_msg(msgHandlers[BEAKER_GET_URL_ARG]);
  });

  kernel.comm_info(
    null, (msg) => {
      assignMsgHandlersToExistingComms(msg.content.comms, kernel);
    }
  );
};

const sendJupyterCodeCells = (filter: string, url: string) => {

  const data: { code_cells: any , url: string } =
    {
      code_cells: [],
      url : url
    };
  data.code_cells = Jupyter.notebook.get_cells().filter(function (cell) {
    if (cell._metadata.tags) {
      return cell.cell_type == 'code' && cell._metadata.tags.includes(filter);
    }
    return false;
  });
  let service = new BeakerxRestHandler();
  service.post(data)
};

const sendArgUrl = (url: string, type:string, argName:string) => {

    const data: { url: string, type:string, argName:string, argValue:string } =
        {
            argName: argName,
            argValue: "",
            url : url,
            type:type
        };

    let parsedUrl = new URL(window.location.href);
    data.argValue =  parsedUrl.searchParams.get(argName);
    let service = new BeakerxRestHandler();
    service.post(data)
};

class BeakerxRestHandler {

  private api: BeakerXApi;

  constructor() {
    this.setApi()
  }

  private setApi() {
    let baseUrl;

    if (this.api) {
      return;
    }

    try {
      const coreutils = require('@jupyterlab/coreutils');
      coreutils.PageConfig.getOption('pageUrl');
      baseUrl = coreutils.PageConfig.getBaseUrl();
    } catch (e) {
      baseUrl = `${window.location.origin}/`;
    }

    this.api = new BeakerXApi(baseUrl);
  }

  public post(data) {
    this.api
      .restService(data)
      .catch((err) => { console.log(err) });
  }

}


const assignMsgHandlersToExistingComms = (comms, kernel) => {
  for (let commId in comms) {
    let comm = new Comm(comms[commId].target_name, commId);
    kernel.comm_manager.register_comm(comm);

    assignMsgHandlerToComm(comm);
  }
};

const assignMsgHandlerToComm = (comm) => {
  const handler = msgHandlers[comm.target_name];

  if (handler) {
    comm.on_msg(handler);
  }
};
