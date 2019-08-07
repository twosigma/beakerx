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
package com.twosigma.beakerx.widget;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static java.util.Arrays.asList;

public abstract class BeakerxWidget extends Widget {

  private static final Logger logger = LoggerFactory.getLogger(BeakerxWidget.class);

  public static final String MODEL_MODULE_VALUE = "beakerx";
  public static final String VIEW_MODULE_VALUE = "beakerx";
  public static final String MODEL = "model";
  public static final String MODEL_UPDATE = "updateData";
  private UpdateModel updateModel = (List<ChangeItem> changes) -> {
    //empty function
  };

  protected abstract Map serializeToJsonObject();

  protected abstract Map serializeToJsonObject(Object item);

  @Override
  protected void addValueChangeMsgCallback() {
  }

  @Override
  protected HashMap<String, Object> content(HashMap<String, Object> content) {
    return content;
  }

  @Override
  public String getModelModuleValue() {
    return BeakerxWidget.MODEL_MODULE_VALUE;
  }

  @Override
  public String getViewModuleValue() {
    return BeakerxWidget.VIEW_MODULE_VALUE;
  }

  protected void sendModel() {
    this.updateModel.update(doSendModel());
  }

  protected List<ChangeItem> doSendModel(){
    return new ArrayList<ChangeItem>(){
      {
        add(new ChangeItem(MODEL, serializeToJsonObject()));
      }
    };
  }

  protected void sendModelUpdate(Object item) {
    this.updateModel.update(asList(new ChangeItem(MODEL_UPDATE, serializeToJsonObject(item))));
  }

  protected void sendModelUpdate() {
    this.updateModel.update(asList(new ChangeItem(MODEL_UPDATE, serializeToJsonObject())));
  }

  private void enableModelUpdate() {
    updateModel = (changeItems) -> sendUpdate(changeItems);
  }

  interface UpdateModel {
    void update(List<ChangeItem> changes);
  }

  @Override
  public void activateWidgetInContainer() {
    beforeDisplay();
    super.activateWidgetInContainer();
  }

  @Override
  public void beforeDisplay() {
    enableModelUpdate();
    sendModel();
  }
}