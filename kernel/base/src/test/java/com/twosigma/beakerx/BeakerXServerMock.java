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

import com.twosigma.beakerx.kernel.restserver.BeakerXServer;
import com.twosigma.beakerx.kernel.KernelFunctionality;
import com.twosigma.beakerx.kernel.restserver.RESTAction;

public class BeakerXServerMock implements BeakerXServer {

  @Override
  public BeakerXServer get(KernelFunctionality kernel) {
    return null;
  }

  @Override
  public String getURL() {
    return null;
  }

  @Override
  public void addPostMapping(String path, RESTAction restAction) {

  }


  public static BeakerXServer create() {
    return new BeakerXServerMock();
  }
}
