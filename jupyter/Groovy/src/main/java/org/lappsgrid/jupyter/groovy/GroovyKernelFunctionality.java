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
package org.lappsgrid.jupyter.groovy;

import com.twosigma.beaker.jupyter.Comm;
import org.lappsgrid.jupyter.groovy.msg.Message;

import java.security.NoSuchAlgorithmException;

public interface GroovyKernelFunctionality {

  void publish(Message message) throws NoSuchAlgorithmException;

  void addComm(String commId, Comm comm);

  void removeComm(String commId);

  Message getParentMessage();
}
