package com.twosigma.beaker.easyform.serializer;

import com.twosigma.beaker.easyform.formitem.TextArea;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.map.JsonSerializer;
import org.codehaus.jackson.map.SerializerProvider;

import java.io.IOException;

public class TextAreaSerializer extends JsonSerializer<TextArea> {
    @Override
    public void serialize(final TextArea textArea, final JsonGenerator jgen,
                          final SerializerProvider serializerProvider)
            throws IOException {
        jgen.writeStartObject();
        jgen.writeObjectField("type", textArea.getClass().getSimpleName());
        if (textArea.getLabel() != null) {
            jgen.writeObjectField("label", textArea.getLabel().toString());
        }
        jgen.writeEndObject();
    }
}
