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

package com.twosigma.beaker;

import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.JsonSerializer;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.map.SerializerProvider;

import com.google.inject.Inject;
import com.google.inject.Provider;
import com.twosigma.beaker.jvm.serialization.BeakerObjectConverter;
import com.twosigma.beaker.jvm.serialization.ObjectDeserializer;

public class BeakerCodeCell {
  private final static Logger logger = Logger.getLogger(BeakerCodeCell.class.getName());
  
  private String cellId;
  private String evaluatorId;
  private String code;
  private String outputtype;
  private Object output;
  private String tags;
  
  public BeakerCodeCell() { }

  public String getcellId() { return cellId; }
  public String getevaluatorId() { return evaluatorId; }
  public String getcode() { return code; }
  public String getoutputtype() { return outputtype; }
  public Object getoutput() { return output; }
  public String gettags() { return tags; }

  public void setcellId(String s) { cellId = s; }
  public void setevaluatorId(String s) { evaluatorId = s; }
  public void setcode(String s) { code = s; }
  public void setoutputtype(String s) { outputtype = s; }
  public void setoutput(Object s) { output = s; }
  public void settags(String s) { tags = s; }
  
  public static class Serializer extends JsonSerializer<BeakerCodeCell> {

    private final Provider<BeakerObjectConverter> objectSerializerProvider;

    @Inject
    private Serializer(Provider<BeakerObjectConverter> osp) {
      objectSerializerProvider = osp;
    }

    private BeakerObjectConverter getObjectSerializer() {
      return objectSerializerProvider.get();
    }

    @Override
    public void serialize(BeakerCodeCell value,
        JsonGenerator jgen,
        SerializerProvider provider)
        throws IOException, JsonProcessingException {

      synchronized (value) {
        jgen.writeStartObject();
        jgen.writeStringField("type", "BeakerCodeCell");
        jgen.writeStringField("cellId", value.cellId);
        jgen.writeStringField("evaluatorId", value.evaluatorId);
        jgen.writeStringField("code", value.code);
        jgen.writeStringField("outputtype", value.outputtype);
        jgen.writeFieldName("output");
        if (!getObjectSerializer().writeObject(value.output, jgen, true))
          jgen.writeString(value.output.toString());
        jgen.writeStringField("tags", value.tags);
        jgen.writeEndObject();
      }
    }
  }
  
  public static class DeSerializer implements ObjectDeserializer {

    private final Provider<BeakerObjectConverter> objectSerializerProvider;

    @Inject
    private DeSerializer(Provider<BeakerObjectConverter> osp) {
      objectSerializerProvider = osp;
    }

    private BeakerObjectConverter getObjectSerializer() {
      return objectSerializerProvider.get();
    }

    @Override
    public Object deserialize(JsonNode n, ObjectMapper mapper) {
      BeakerCodeCell o = null;
      try {
        String cellId=null, evaluatorId=null, code=null, outputtype=null, tags=null;
        Object output=null;
       
        if (n.has("cellId"))
          cellId = n.get("cellId").asText();
        if (n.has("evaluatorId"))
          evaluatorId = n.get("evaluatorId").asText();
        if (n.has("code"))
          code = n.get("code").asText();
        if (n.has("outputtype"))
          outputtype = n.get("outputtype").asText();
        if (n.has("tags"))
          tags = n.get("tags").asText();
        if (n.has("output"))
          output = getObjectSerializer().deserialize(n.get("output"), mapper);
        
        o = new BeakerCodeCell();
        o.setcellId(cellId);
        o.setcode(code);
        o.setevaluatorId(evaluatorId);
        o.setoutputtype(outputtype);
        o.setoutput(output);
        o.settags(tags);
      } catch (Exception e) {
        logger.log(Level.SEVERE, "exception deserializing BeakerCodeCell ", e);
        e.printStackTrace();
      }
      return o;
    }

    @Override
    public boolean canBeUsed(JsonNode n) {
      return n.has("type") && n.get("type").asText().equals("BeakerCodeCell");
    }
  }     
  
}
