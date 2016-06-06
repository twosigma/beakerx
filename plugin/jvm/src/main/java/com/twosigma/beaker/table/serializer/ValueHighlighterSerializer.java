package com.twosigma.beaker.table.serializer;

import com.twosigma.beaker.table.highlight.ValueHighlighter;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.JsonSerializer;
import org.codehaus.jackson.map.SerializerProvider;

import java.io.IOException;

public class ValueHighlighterSerializer extends JsonSerializer<ValueHighlighter> {

  @Override
  public void serialize(ValueHighlighter value,
                        JsonGenerator jgen,
                        SerializerProvider provider)
    throws IOException, JsonProcessingException {

    synchronized (value) {
      jgen.writeStartObject();
      jgen.writeObjectField("type", value.getClass().getSimpleName());
      jgen.writeObjectField("colName", value.getColName());
      jgen.writeObjectField("colors", value.getColors());
      jgen.writeEndObject();
    }
  }

}
