package org.lappsgrid.jupyter.groovy.msg;

import static com.twosigma.jupyter.groovy.Utils.timestamp;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.lappsgrid.jupyter.groovy.json.Serializer;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.twosigma.jupyter.groovy.msg.Type;

/**
 * Defines the wire protocol used for messages exchanged with Jupyter.
 *
 * @author Keith Suderman
 */
@JsonPropertyOrder({ "identities", "header", "parentHeader", "metadata", "content" })
public class Message {

  private List<byte[]> identities = new ArrayList<byte[]>();
  private Header header;
  @JsonProperty("parent_header")
  private Header parentHeader;
  private Map<String, Serializable> metadata;
  private Map<String, Serializable> content;

  public Message() {
    header = new Header();
    header.setDate(timestamp());
  }

  public Type type() {
    return (header != null && header.getTypeEnum() != null) ? header.getTypeEnum() : null;
  }

  public String asJson() {
    return Serializer.toJson(this);
  }

  public List<byte[]> getIdentities() {
    return identities;
  }

  public void setIdentities(List<byte[]> identities) {
    this.identities = identities;
  }

  public Header getHeader() {
    return header;
  }

  public void setHeader(Header header) {
    this.header = header;
  }

  public Header getParentHeader() {
    return parentHeader;
  }

  public void setParentHeader(Header parentHeader) {
    this.parentHeader = parentHeader;
  }

  public Map<String, Serializable> getMetadata() {
    return metadata;
  }

  public void setMetadata(Map<String, Serializable> metadata) {
    this.metadata = metadata;
  }

  public Map<String, Serializable> getContent() {
    return content;
  }

  public void setContent(Map<String, Serializable> content) {
    this.content = content;
  }
  
  @Override
  public String toString() {
    return "Type = " + header.getType();
  }
  
}