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
package com.twosigma.beakerx.message;

import static com.twosigma.beakerx.kernel.Utils.timestamp;
import static com.twosigma.beakerx.kernel.Utils.uuid;
import static com.twosigma.beakerx.util.Preconditions.checkNotNull;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.twosigma.beakerx.kernel.msg.JupyterMessages;

@JsonPropertyOrder({ "id", "username", "session", "date", "type", "version" })
public class Header {

  public static final String MSG_ID = "msg_id";

  private String date;
  @JsonProperty(MSG_ID)
  private String id;
  private String username;
  private String session;
  @JsonProperty("msg_type")
  private JupyterMessages type;
  private String version;

  private Header(){
    //only for jackson
  }

  public Header(JupyterMessages type, String session) {
    date = timestamp();
    id = uuid();
    username = "kernel";
    this.type = type;
    this.session = checkNotNull(session);
    this.version = "5.3";
  }

  public String asJson() {
    return MessageSerializer.toJson(this);
  }

  public String getDate() {
    return date;
  }

  public void setDate(String date) {
    this.date = date;
  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getSession() {
    return session;
  }

  public String getType() {
    return type != null ? type.getName() : null;
  }
  
  public JupyterMessages getTypeEnum() {
    return type;
  }

  public void setTypeEnum(JupyterMessages type) {
    this.type = type;
  }
  
  public void setType(String type) {
    this.type = JupyterMessages.getType(type);
  }

  public String getVersion() {
    return version;
  }

  public void setVersion(String version) {
    this.version = version;
  }
  
  @Override
  public String toString() {
    return "Type = " + this.getType() + " Id = " + this.getId();
  }
  
}