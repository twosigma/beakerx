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

package com.twosigma.beaker.jvm;

import java.util.LinkedList;
import java.util.List;
import java.util.Observable;
import java.util.Observer;

public class ObserverObjectTest implements Observer{

  private List<Observable> objectList = new LinkedList<>();

  @Override
  public void update(Observable o, Object arg) {
    objectList.add(o);
  }

  public List<Observable> getObjectList() {
    return objectList;
  }
}
