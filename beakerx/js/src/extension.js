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

// This file contains the javascript that is run when the notebook is loaded.
// It contains some requirejs configuration and the `load_ipython_extension`
// which is required for any notebook extension.

// Configure requirejs
if (window.require) {
    window.require.config({
        map: {
            "*" : {
                "beakerx": "nbextensions/beakerx/index",
                "jupyter-js-widgets": "nbextensions/jupyter-js-widgets/extension"
            }
        }
    });
}

define([
  'services/config',
  'services/kernels/comm',
  'base/js/utils',
  'base/js/namespace',
  'base/js/events',
  'require'
], function(
  configmod,
  comm,
  utils,
  Jupyter,
  events,
  require
) {
  "use strict";

  var base_url = utils.get_body_data('baseUrl');
  var config = new configmod.ConfigSection('notebook', {base_url: base_url});
  var comm;
  var kernel_info = undefined;
  
  config.loaded.then(function() {
    console.log('beaker extension loaded');
  });

  Jupyter.notebook.events.on('kernel_ready.Kernel', function() {
    var kernel = Jupyter.notebook.kernel;
    window.beaker = {};
    kernel.comm_manager.register_target('beaker.getcodecells',
      function(comm, msg) {
        comm.on_msg(function(msg) {
          if(msg.content.data.name == "CodeCells"){
            console.log("TZ msg", msg.content.data);
            sendJupyterCodeCells(JSON.parse(msg.content.data.value));
          }
          window.beaker[msg.content.data.name] = JSON.parse(msg.content.data.value);
        });
      });
    setBeakerxKernelParameters();
  });

  Jupyter.notebook.events.on('kernel_interrupting.Kernel', function() {
    interrupt();
  });

  function sendJupyterCodeCells(filter) {
    var comm = Jupyter.notebook.kernel.comm_manager.new_comm("beaker.getcodecells",
        null, null, null, utils.uuid());
    var data = {};
    console.log("TZ filter", filter);
    data.code_cells = Jupyter.notebook.get_cells().filter(function (cell) {
      if (cell._metadata.tags) {
        return cell.cell_type == 'code' && cell._metadata.tags.includes(filter);
      }
      return false;
    });
    console.log("filtered data", data);
    comm.send(data);
    comm.close();
  }



  var load_ipython_extension = function() {
  };

  // function load_css(name) {
  //   var link = document.createElement("link");
  //   link.type = "text/css";
  //   link.rel = "stylesheet";
  //   link.href = require.toUrl("nbextensions/beaker/"+name);
  //   document.getElementsByTagName("head")[0].appendChild(link);
  // }
  
  function getKernelInfo(callBack){
    if (!kernel_info) {
      Jupyter.notebook.kernel.kernel_info(function(result) {
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
    getKernelInfo(function(info) {
      if (info.beakerx) {
        interruptToKernel();
      }
    });
  }
  

  function interruptToKernel() {
    var kernel = Jupyter.notebook.kernel;
    var kernel_control_target_name = "kernel.control.channel";
    var comm = Jupyter.notebook.kernel.comm_manager.new_comm(kernel_control_target_name, 
                                                             null, null, null, utils.uuid());
    var data = {};
    data.kernel_interrupt = true;
    comm.send(data);
    comm.close();
  }
  

  function setBeakerxKernelParameters() {
    getKernelInfo(function(info) {
      if (info.beakerx) {
        setBeakerxKernelParametersToKernel();
      }
    });
  }
  

  function setBeakerxKernelParametersToKernel() {
    var kernel_control_target_name = "kernel.control.channel";
    var comm = Jupyter.notebook.kernel.comm_manager.new_comm(kernel_control_target_name, 
                                                             null, null, null, utils.uuid());

    var newNotebook = undefined == Jupyter.notebook.metadata.beakerx_kernel_parameters;

    if (newNotebook) {
      comm.on_msg(function(resp) {
        if (undefined != resp.content.data.kernel_control_response) {
          if ("OK" === resp.content.data.kernel_control_response) {
          } else if (undefined != resp.content.data.kernel_control_response.beakerx_kernel_parameters) {
            Jupyter.notebook.metadata.beakerx_kernel_parameters = resp.content.data.kernel_control_response.beakerx_kernel_parameters;

            var theData = {};
            if (Jupyter.notebook && Jupyter.notebook.metadata) {
              theData.beakerx_kernel_parameters = Jupyter.notebook.metadata.beakerx_kernel_parameters;
            }
            comm.send(theData);
            comm.close();
          }
        }
      });

      var data = {};
      data.get_default_shell = true;
      comm.send(data);
    } else {
      var data = {};
      if (Jupyter.notebook && Jupyter.notebook.metadata) {
        data.beakerx_kernel_parameters = Jupyter.notebook.metadata.beakerx_kernel_parameters;
      }
      comm.send(data);
      comm.close();
    }
  }

  return {
    load_ipython_extension : load_ipython_extension
  };
});
