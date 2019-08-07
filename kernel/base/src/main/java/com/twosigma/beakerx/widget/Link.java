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

import java.io.Serializable;
import java.util.HashMap;

/**
 * 
 * Link Widget
 *   source: a (Widget, 'trait_name') tuple for the source trait
 *   target: a (Widget, 'trait_name') tuple that should be updated
 * 
 * @author konst
 *
 */
public class Link extends Widget {
  
  public static final String IPY_MODEL = "IPY_MODEL_";
  public static final String TARGET = "target";
  public static final String SOURCE = "source";
  public static final String MODEL_NAME_VALUE = "LinkModel";
  
  private Widget source;
  private String source_key;
  private Widget target;
  private String target_key;


  public Link(Widget source, String source_key, Widget target, String target_key) {
    super();
    this.source = source;
    this.source_key = source_key;
    this.target = target;
    this.target_key = target_key;
    openComm();
  }

  
  @Override
  public String getModelNameValue() {
    return MODEL_NAME_VALUE;
  }

  @Override
  public String getViewNameValue() {
    return null;
  }
  

  @Override
  protected void addValueChangeMsgCallback() {
  }

  @Override
  protected HashMap<String, Object> content(HashMap<String, Object> content) {
    String [] target = { IPY_MODEL + this.target.getComm().getCommId(), target_key};
    content.put(TARGET, target);
    String [] source = { IPY_MODEL + this.source.getComm().getCommId(), source_key};
    content.put(SOURCE, source);
    return content;
  }

  public void unlink(){
    this.getComm().close();
  }
  
  /**
   * Link two widget attributes on the frontend so they remain in sync.
   * The link is created in the front-end and does not rely on a roundtrip
   * to the backend.
   *
   * @param source Widget
   * @param source_key trait_name
   * @param target Widget
   * @param target_key trait_name
   * @return new Link(source, source_key, target, target_key)
   */
  public static Link jslink(Widget source, String source_key, Widget target, String target_key){
    return new Link(source, source_key, target, target_key);
  }
  
}