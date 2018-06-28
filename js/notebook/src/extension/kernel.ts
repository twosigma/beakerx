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

/// <reference path='../types/index.d.ts'/>

import {registerCommTargets} from './comm';

export namespace BeakerXKernel {
  const utils = require('base/js/utils');
  let kernel_info;

  export function installHandler() {
    const kernel = Jupyter.notebook.kernel;

    registerCommTargets(kernel);

    Jupyter.notebook.events.on('kernel_interrupting.Kernel', () => {
      interrupt();
    });
  }

  function getInfo(callBack) {
    if (!kernel_info) {
      Jupyter.notebook.kernel.kernel_info((result) => {
        kernel_info = result.content;
        console.log("kernel_info received:");
        console.log(kernel_info);
        callBack(kernel_info);
      });
    } else {
      callBack(kernel_info);
    }
  }

  function interrupt() {
    getInfo(function (info) {
      if (info.beakerx) {
        interruptToKernel();
      }
    });
  }

  function interruptToKernel() {
    const kernel = Jupyter.notebook.kernel;
    const kernel_control_target_name = "kernel.control.channel";
    const comm = kernel.comm_manager.new_comm(kernel_control_target_name, null, null, null, utils.uuid());
    const data = { kernel_interrupt: true };

    comm.send(data);
    comm.close();
  }

}
