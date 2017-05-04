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

package com.twosigma.beaker.jupyter.msg;

/**
 * Definitions of the strings used as message type values.
 * 
 * @author konst
 *
 */
public enum JupyterMessages {
  
  KERNEL_INFO_REQUEST,
  KERNEL_INFO_REPLY,
  EXECUTE_REQUEST,
  EXECUTE_INPUT,
  EXECUTE_RESULT,
  EXECUTE_REPLY,
  COMPLETE_REQUEST,
  COMPLETE_REPLY,
  HISTORY_REQUEST,
  HISTORY_REPLY,
  STATUS,
  STREAM,
  SHUTDOWN_REQUEST,
  SHUTDOWN_REPLY,
  COMM_OPEN,
  COMM_CLOSE,
  COMM_INFO_REQUEST,
  COMM_INFO_REPLY,
  COMM_MSG,
  UNDEFINED,
  DISPLAY_DATA,
  CLEAR_OUTPUT,
  ERROR,
  IS_COMPLETE_REQUEST,
  IS_COMPLETE_REPLY;
  
  public String getName() {
    return this.name().toLowerCase();
  }
  
  public static synchronized JupyterMessages getType(final String input){
    JupyterMessages ret = null;
    if(input != null){
      for (JupyterMessages item : JupyterMessages.values()) {
        if(item.getName().equalsIgnoreCase(input.trim().toLowerCase())){
          ret = item;
          break;
        }
      }
    }
    return ret;
  }

}