package org.lappsgrid.jupyter.groovy.msg;

import static com.twosigma.beaker.jupyter.Utils.timestamp;
import static com.twosigma.beaker.jupyter.Utils.uuid;

import org.lappsgrid.jupyter.groovy.json.Serializer;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.twosigma.beaker.jupyter.msg.JupyterMessages;

/**
 * The ZMQ header included with each message.
 *
 * @author Keith Suderman
 */
@JsonPropertyOrder({ "id", "username", "session", "date", "type", "version" })
public class Header {

  private String date;
  @JsonProperty("msg_id")
  private String id;
  private String username;
  private String session;
  @JsonProperty("msg_type")
  private JupyterMessages type;
  private String version;

  public Header() {
  }

  public Header(Header header) {
    this.id = header.id;
    this.date = header.date;
    this.username = header.username;
    this.session = header.session;
    this.type = header.type;
    this.version = header.version;
  }

  public Header(JupyterMessages type, String session) {
    date = timestamp();
    id = uuid();
    username = "kernel";
    this.type = type;
    this.session = session;
    this.version = "5.0";
  }

  public String asJson() {
    return Serializer.toJson(this);
  }

  public String prettyPrint() {
    return Serializer.toPrettyJson(this);
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

  public void setSession(String session) {
    this.session = session;
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