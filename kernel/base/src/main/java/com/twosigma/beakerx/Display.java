/*
 *  Copyright 2018 TWO SIGMA OPEN SOURCE, LLC
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
package com.twosigma.beakerx;

import com.twosigma.beakerx.kernel.KernelManager;
import com.twosigma.beakerx.kernel.comm.Comm;
import com.twosigma.beakerx.message.Message;
import com.twosigma.beakerx.mimetype.MIMEContainer;

import java.io.Serializable;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

import static com.twosigma.beakerx.evaluator.InternalVariable.getParentHeader;
import static com.twosigma.beakerx.kernel.comm.Comm.DATA;
import static com.twosigma.beakerx.kernel.comm.Comm.METADATA;
import static com.twosigma.beakerx.kernel.msg.JupyterMessages.DISPLAY_DATA;
import static java.util.Collections.singletonList;

public class Display {

  public static void display(Object value) {
    List<MIMEContainer> result = getMIMEContainers(value);
    if (!result.isEmpty()) {
      displayMIMEContainers(result);
    }
  }

  private static void displayMIMEContainers(List<MIMEContainer> result) {
    HashMap<String, Serializable> content = new HashMap<>();
    HashMap<String, Object> data = new HashMap<>();
    result.forEach(x -> data.put(x.getMime().asString(), x.getData()));
    content.put(DATA, data);
    content.put(METADATA,new HashMap<>());
    Message message = Comm.messageMessage(DISPLAY_DATA, Comm.Buffer.EMPTY, content, getParentHeader());
    KernelManager.get().publish(singletonList(message));
  }

  private static List<MIMEContainer> getMIMEContainers(Object value) {
    List<MIMEContainer> containers = MIMEContainerFactory.createMIMEContainers(value);
    return containers.stream()
            .filter(x -> !x.getMime().asString().equals(MIMEContainer.MIME.HIDDEN)).collect(Collectors.toList());
  }

}
