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

package com.twosigma.beakerx;

import java.io.IOException;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializerProvider;

import com.google.inject.Inject;
import com.google.inject.Provider;
import com.twosigma.beakerx.jvm.serialization.BeakerObjectConverter;
import com.twosigma.beakerx.jvm.serialization.ObjectDeserializer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class CodeCell {
  private final static Logger logger = LoggerFactory.getLogger(CodeCell.class.getName());
  @JsonProperty("execution_count")
  private String executionCount;
  @JsonProperty("cell_type")
  private String cellType;
  private Object outputs;
  private Object metadata;
  private String source;

  public CodeCell() { }

  public String getExecutionCount() {
    return executionCount;
  }

  public void setExecutionCount(String executionCount) {
    this.executionCount = executionCount;
  }

  public String getCellType() {
    return cellType;
  }

  public void setCellType(String cellType) {
    this.cellType = cellType;
  }

  public Object getOutputs() {
    return outputs;
  }

  public void setOutputs(Object outputs) {
    this.outputs = outputs;
  }

  public Object getMetadata() {
    return metadata;
  }

  public void setMetadata(Object metadata) {
    this.metadata = metadata;
  }

  public String getSource() {
    return source;
  }

  public void setSource(String source) {
    this.source = source;
  }

  public static class Serializer extends JsonSerializer<CodeCell> {

    private final Provider<BeakerObjectConverter> objectSerializerProvider;

    @Inject
    public Serializer(Provider<BeakerObjectConverter> osp) {
      objectSerializerProvider = osp;
    }

    private BeakerObjectConverter getObjectSerializer() {
      return objectSerializerProvider.get();
    }

    @Override
    public void serialize(CodeCell value,
        JsonGenerator jgen,
        SerializerProvider provider)
        throws IOException, JsonProcessingException {

      synchronized (value) {
        jgen.writeStartObject();
        jgen.writeStringField("type", "CodeCell");
        jgen.writeStringField("execution_count", value.executionCount);
        jgen.writeStringField("cell_type", value.cellType);
        jgen.writeFieldName("outputs");
        if (!getObjectSerializer().writeObject(value.outputs, jgen, true))
          jgen.writeString(value.outputs.toString());
        jgen.writeFieldName("metadata");
        if (!getObjectSerializer().writeObject(value.metadata, jgen, true))
          jgen.writeString(value.metadata.toString());
        jgen.writeStringField("source", value.source);
        jgen.writeEndObject();
      }
    }
  }

  public static class DeSerializer implements ObjectDeserializer {

    private final BeakerObjectConverter parent;

    public DeSerializer(BeakerObjectConverter p) {
      parent = p;
      parent.addKnownBeakerType("CodeCell");
    }

    @Override
    public Object deserialize(JsonNode n, ObjectMapper mapper) {
      CodeCell o = null;
      try {
        String executionCount=null, cellType=null, source=null;
        Object outputs=null;
        Object metadata=null;
        if (n.has("execution_count"))
          executionCount = n.get("execution_count").asText();
        if (n.has("cell_type"))
          cellType = n.get("cell_type").asText();
        if (n.has("source"))
          source = n.get("source").asText();
        if (n.has("outputs"))
          outputs = parent.deserialize(n.get("outputs"), mapper);
        if (n.has("metadata"))
          metadata = parent.deserialize(n.get("metadata"), mapper);

        o = new CodeCell();
        o.setExecutionCount(executionCount);
        o.setCellType(cellType);
        o.setSource(source);
        o.setOutputs(outputs);
        o.setMetadata(metadata);
      } catch (Exception e) {
        logger.error("exception deserializing CodeCell ", e);
        e.printStackTrace();
      }
      return o;
    }

    @Override
    public boolean canBeUsed(JsonNode n) {
      return n.has("type") && n.get("type").asText().equals("CodeCell");
    }
  }

}
