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
package com.twosigma.beakerx.widget;

import com.twosigma.beakerx.Display;
import com.twosigma.beakerx.kernel.KernelManager;
import com.twosigma.beakerx.kernel.comm.Comm;
import com.twosigma.beakerx.message.Message;
import com.twosigma.beakerx.mimetype.MIMEContainer;

import java.io.Serializable;
import java.util.HashMap;
import java.util.List;

import static com.twosigma.beakerx.evaluator.InternalVariable.getParentHeader;
import static com.twosigma.beakerx.kernel.comm.Comm.DATA;
import static com.twosigma.beakerx.kernel.comm.Comm.METADATA;
import static com.twosigma.beakerx.kernel.msg.JupyterMessages.DISPLAY_DATA;
import static java.util.Collections.singletonList;

public class MIMEDisplayMethodManager {

  private static MIMEDisplayMethodManager instance = new MIMEDisplayMethodManager();

  private Display.MIMEContainerDisplayMethodStrategy defaultDisplayMimeMethodStrategy = new DefaultMIMEContainerDisplayMethodStrategy();
  private Display.MIMEContainerDisplayMethodStrategy displayMimeMethodStrategy = defaultDisplayMimeMethodStrategy;

  private MIMEDisplayMethodManager() {
  }

  public static MIMEDisplayMethodManager getInstance() {
    return instance;
  }

  public void display(List<MIMEContainer> mimeContainers) {
    this.displayMimeMethodStrategy.display(mimeContainers);
  }

  public void setDefaultDisplayMethod() {
    this.displayMimeMethodStrategy = defaultDisplayMimeMethodStrategy;
  }

  public void defineDisplayMethod(Display.MIMEContainerDisplayMethodStrategy mimeContainerDisplayMethodStrategy) {
    this.displayMimeMethodStrategy = mimeContainerDisplayMethodStrategy;
  }

  public static class DefaultMIMEContainerDisplayMethodStrategy implements Display.MIMEContainerDisplayMethodStrategy {
    @Override
    public void display(List<MIMEContainer> mimeContainers) {
      HashMap<String, Serializable> content = new HashMap<>();
      HashMap<String, Object> data = new HashMap<>();
      mimeContainers.forEach(x -> data.put(x.getMime().asString(), x.getData()));
      content.put(DATA, data);
      content.put(METADATA, new HashMap<>());
      Message message = Comm.messageMessage(DISPLAY_DATA, Comm.Buffer.EMPTY, content, getParentHeader());
      KernelManager.get().publish(singletonList(message));
    }
  }
}
