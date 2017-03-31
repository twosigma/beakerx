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

  config.loaded.then(function() {
    console.log('beaker extension loaded');
  });

  Jupyter.notebook.events.on('kernel_ready.Kernel', function() {
    var kernel = Jupyter.notebook.kernel;
    window.beaker = {};
    kernel.comm_manager.register_target('beaker.autotranslation',
      function(comm, msg) {
        comm.on_msg(function(msg) {
          window.beaker[msg.content.data.name] = JSON.parse(msg.content.data.value);
        });
      });
    setImportsAndClasspath();
  });

  Jupyter.notebook.events.on('kernel_interrupting.Kernel', function() {
    interrupt();
  });



  var load_ipython_extension = function() {
  };

  // function load_css(name) {
  //   var link = document.createElement("link");
  //   link.type = "text/css";
  //   link.rel = "stylesheet";
  //   link.href = require.toUrl("nbextensions/beaker/"+name);
  //   document.getElementsByTagName("head")[0].appendChild(link);
  // }

  /**
   * In Python there is no any callback, only beakerx kernels response to this message.
   */
  function getControllCommandList(callBack){
    var kernel_control_target_name = "kernel.control.channel";
    var comm = Jupyter.notebook.kernel.comm_manager.new_comm(kernel_control_target_name, null, null, null, utils.uuid());
    comm.on_msg(function(resp){
      callBack(resp);
    });
    var data = {};
    data.get_kernel_control_command_list = true;
    comm.send(data);
    comm.close();
  }

  function interrupt() {
    getControllCommandList(function(resp){
      if(undefined != resp.content.data){
        if(_.contains(resp.content.data.kernel_control_response, "kernel_interrupt")){
          console.log("beakerx kernel detected, kernel interrupt");
          interruptToKernel();
        }
      }
    });
  }
  
  function interruptToKernel() {
    var kernel = Jupyter.notebook.kernel;
    var kernel_control_target_name = "kernel.control.channel";
    var comm = Jupyter.notebook.kernel.comm_manager.new_comm(kernel_control_target_name, null, null, null, utils.uuid());
    var data = {};
    data.kernel_interrupt = true;
    comm.send(data);
    comm.close();
  }
  
  function setImportsAndClasspath() {
    getControllCommandList(function(resp){
      if(undefined != resp.content.data){
        if(_.contains(resp.content.data.kernel_control_response, "get_default_shell") &&
            _.contains(resp.content.data.kernel_control_response, "classpath") &&
            _.contains(resp.content.data.kernel_control_response, "imports")){
          console.log("beakerx kernel detected, setting imports and classpath");
          setImportsAndClasspathToKernel();
        }
      }
    });
  }
  
  function setImportsAndClasspathToKernel() {
    var kernel_control_target_name = "kernel.control.channel";
    var comm = Jupyter.notebook.kernel.comm_manager.new_comm(kernel_control_target_name, null, null, null, utils.uuid());

    var newNotebook = undefined == Jupyter.notebook.metadata.imports || undefined == Jupyter.notebook.metadata.classpath;

    if(newNotebook){
      comm.on_msg(function(resp){
        if(undefined != resp.content.data.kernel_control_response){
          if("OK" === resp.content.data.kernel_control_response){
          }else if(undefined != resp.content.data.kernel_control_response.imports &&
              undefined != resp.content.data.kernel_control_response.classpath){
            Jupyter.notebook.metadata.imports = resp.content.data.kernel_control_response.imports;
            Jupyter.notebook.metadata.classpath = resp.content.data.kernel_control_response.classpath;

            var theData = {};
            if(Jupyter.notebook && Jupyter.notebook.metadata){
              theData.imports = Jupyter.notebook.metadata.imports;
              theData.classpath = Jupyter.notebook.metadata.classpath;
            }
            comm.send(theData);
            comm.close();
          }
        }
      });

      var data = {};
      data.get_default_shell = true;
      comm.send(data);
    }else{
      var data = {};
      if(Jupyter.notebook && Jupyter.notebook.metadata){
        data.imports = Jupyter.notebook.metadata.imports;
        data.classpath = Jupyter.notebook.metadata.classpath;
      }
      comm.send(data);
      comm.close();
    }
  }

  return {
    load_ipython_extension : load_ipython_extension
  };
});
