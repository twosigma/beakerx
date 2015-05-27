package com.twosigma.beaker.easyform.serializer;

import com.twosigma.beaker.easyform.formitem.TextField;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.map.JsonSerializer;
import org.codehaus.jackson.map.SerializerProvider;

import java.io.IOException;

public class TextFieldSerializer extends JsonSerializer<TextField> {

    @Override
    public void serialize(final TextField textField, final JsonGenerator jgen,
                          final SerializerProvider serializerProvider)
            throws IOException {
        jgen.writeStartObject();
        jgen.writeObjectField("type", textField.getClass().getSimpleName());
        if (textField.getLabel() != null) {
            jgen.writeObjectField("label", textField.getLabel().toString());
        }
        if (textField.getWidth() != null) {
            jgen.writeObjectField("width", textField.getWidth().toString());
        }
        jgen.writeEndObject();
    }
}
