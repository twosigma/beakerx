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

package com.twosigma.beaker.shared;

import org.codehaus.jackson.annotate.JsonAutoDetect;

@JsonAutoDetect
public class NotebookControlReply {

  private String session;
  private Object value;

  public String getSession() {
    return this.session;
  }
  public Object getValue() {
    return this.value;
  }
  public void setSession(String s) {
    this.session = s;
  }
  public void setValue(Object o) {
    this.value = o;
  }
  public NotebookControlReply() {
  }
  public NotebookControlReply(String session, Object value) {
    this.session = session;
    this.value = value;
  }
  
}
