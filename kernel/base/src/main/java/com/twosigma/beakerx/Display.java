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

import com.twosigma.beakerx.mimetype.MIMEContainer;
import com.twosigma.beakerx.widget.MIMEDisplayMethodManager;

import java.util.List;
import java.util.stream.Collectors;

public class Display {

  private static Display instance = new Display(MIMEDisplayMethodManager.getInstance());

  private MIMEDisplayMethodManager mimeDisplayMethodManager;

  private Display(MIMEDisplayMethodManager mimeDisplayMethodManager) {
    this.mimeDisplayMethodManager = mimeDisplayMethodManager;
  }

  public static void display(Object value) {
    instance.displayObject(value);
  }

  private void displayObject(Object value) {
    List<MIMEContainer> result = getNotHiddenMIMEContainers(value);
    if (!result.isEmpty()) {
      mimeDisplayMethodManager.display(result);
    }
  }

  private List<MIMEContainer> getNotHiddenMIMEContainers(Object value) {
    List<MIMEContainer> containers = MIMEContainerFactory.createMIMEContainers(value);
    return containers.stream()
            .filter(x -> !x.getMime().asString().equals(MIMEContainer.MIME.HIDDEN)).collect(Collectors.toList());
  }

  public interface MIMEContainerDisplayMethodStrategy {
    void display(List<MIMEContainer> mimeContainers);
  }

}
