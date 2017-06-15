/*
 *  Copyright 2014 TWO SIGMA OPEN SOURCE, LLC
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

package com.twosigma.beakerx.chart;

import org.apache.commons.lang3.SerializationUtils;
import org.apache.commons.lang3.StringUtils;

import com.twosigma.beakerx.chart.actions.GraphicsActionListener;
import com.twosigma.beakerx.chart.actions.GraphicsActionObject;
import com.twosigma.beakerx.widgets.BeakerxWidget;
import com.twosigma.jupyter.message.Message;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public abstract class Graphics implements Serializable, Cloneable{

  private static final long serialVersionUID = -1878979081955090695L;
  
  private final String uid;
  private boolean visible     = true;
  private String  yAxisName   = null;
  private GraphicsActionListener onClickListener;
  private String clickTag;
  private Map<String, GraphicsActionListener> onKeyListeners = new HashMap<String, GraphicsActionListener>();
  private Map<String, String> keyTags = new HashMap<String, String>();

  public Graphics() {
    this.uid = UUID.randomUUID().toString();
  }

  public void setVisible(boolean visible) {
    this.visible = visible;
  }

  public Boolean getVisible() {
    return this.visible;
  }

  public void setYAxis(String yAxisName) {
    this.yAxisName = yAxisName;
  }

  public void setyAxis(String yAxisName) {
    this.yAxisName = yAxisName;
  }

  public String getYAxis() {
    return yAxisName;
  }

  public String getUid() {
    return uid;
  }

  public boolean hasClickAction() {
    return onClickListener != null || StringUtils.isNotEmpty(clickTag);
  }

  public String getClickTag() {
    return clickTag;
  }

  public Map<String, String> getKeyTags (){
    return this.keyTags;
  }

  public Object[] getKeys () {
    return this.onKeyListeners.keySet().toArray();
  }

  public Graphics onClick(GraphicsActionListener onClickListener) {
    this.onClickListener = onClickListener;
    return this;
  }

  public Graphics onClick(String tag) {
    this.clickTag = tag;
    return this;
  }

  private Object clickHandler(Object ... params) throws Exception {
    GraphicsActionObject ao = (GraphicsActionObject)params[0];
    ao.setGraphics(this);
    onClickListener.execute(ao);
    return null;
  }
  
  public void fireClick(GraphicsActionObject actionObject, Message message) {
    if (onClickListener != null) {
      BeakerxWidget.handleCompiledCode(message, this::clickHandler, actionObject);
    }
  }

  public Graphics onKey(String key, GraphicsActionListener listener) {
    this.onKeyListeners.put(key, listener);
    return this;
  }

  public Graphics onKey(KeyboardCodes key, GraphicsActionListener listener) {
    this.onKeyListeners.put(key.name(), listener);
    return this;
  }

  public Graphics onKey(String key, String tag) {
    this.keyTags.put(key, tag);
    return this;
  }

  public Graphics onKey(KeyboardCodes key, String tag) {
    this.keyTags.put(key.name(), tag);
    return this;
  }
  
  private Object onKeyHandler(Object ... params) throws Exception {
    GraphicsActionListener listener = (GraphicsActionListener)params[0];
    GraphicsActionObject ao = (GraphicsActionObject)params[1];
    ao.setGraphics(this);
    listener.execute(ao);
    return null;
  }

  public void fireOnKey(String key, GraphicsActionObject actionObject, Message message) {
    GraphicsActionListener listener = onKeyListeners.get(key);
    if (listener != null) {
      BeakerxWidget.handleCompiledCode(message, this::onKeyHandler, listener, actionObject);
    }
  }

  @Override
  public Object clone() throws CloneNotSupportedException {
    return SerializationUtils.clone(this);
  }

  abstract public void setColori(Color color);
  abstract public Color getColor();
}
