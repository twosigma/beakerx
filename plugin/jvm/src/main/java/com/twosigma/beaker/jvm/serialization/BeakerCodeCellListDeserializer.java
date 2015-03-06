package com.twosigma.beaker.jvm.serialization;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.JsonParser;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.DeserializationContext;
import org.codehaus.jackson.map.JsonDeserializer;
import org.codehaus.jackson.map.ObjectMapper;

import com.google.inject.Inject;
import com.google.inject.Provider;
import com.twosigma.beaker.BeakerCodeCell;

/*
 * This class is used to deserialize the above fake root object when reading the notebook code cells
 */
public class BeakerCodeCellListDeserializer extends JsonDeserializer<BeakerCodeCellList> {

  private final Provider<BeakerObjectConverter> objectSerializerProvider;

  @Inject
  public BeakerCodeCellListDeserializer(Provider<BeakerObjectConverter> osp) {
    objectSerializerProvider = osp;
  }

  @Override
  public BeakerCodeCellList deserialize(JsonParser jp, DeserializationContext ctxt) 
      throws IOException, JsonProcessingException {
    ObjectMapper mapper = (ObjectMapper)jp.getCodec();
    JsonNode node = mapper.readTree(jp);
    
    List<BeakerCodeCell> l = new ArrayList<BeakerCodeCell>();
    if (node.isArray()) {
      for (JsonNode o : node) {
        Object obj = objectSerializerProvider.get().deserialize(o, mapper);
        if (obj instanceof BeakerCodeCell)
          l.add((BeakerCodeCell) obj);
      }
    }
    
    BeakerCodeCellList r = new BeakerCodeCellList();
    r.theList = l;
    return r;
  }
}