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

/**
 * A directional link
 * source: a (Widget, 'trait_name') tuple for the source trait
 * target: a (Widget, 'trait_name') tuple that should be updated
 * when the source trait changes.
 * 
 * @author konst
 *
 */
public class DirectionalLink extends Link{

  public static final String MODEL_NAME_VALUE = "DirectionalLinkModel";
  
  public DirectionalLink(Widget source, String source_key, Widget target, String target_key) {
    super(source, source_key, target, target_key);
  }

  @Override
  public String getModelNameValue() {
    return MODEL_NAME_VALUE;
  }

  /**
   * Link a source widget attribute with a target widget attribute.
   * The link is created in the front-end and does not rely on a roundtrip
   * to the backend.
   * 
   * @param source Widget
   * @param source_key trait_name
   * @param target Widget
   * @param target_key trait_name
   * @return new DirectionalLink(source, source_key, target, target_key)
   */
  public static DirectionalLink jsdlink(Widget source, String source_key, Widget target, String target_key){
    return new DirectionalLink(source, source_key, target, target_key);
  }
  
}