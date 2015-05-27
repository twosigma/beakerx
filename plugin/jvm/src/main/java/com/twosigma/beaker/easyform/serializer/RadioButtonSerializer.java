package com.twosigma.beaker.easyform.serializer;

import com.twosigma.beaker.easyform.formitem.RadioButtonComponent;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.map.JsonSerializer;
import org.codehaus.jackson.map.SerializerProvider;

import java.io.IOException;

public class RadioButtonSerializer extends JsonSerializer<RadioButtonComponent> {
    @Override
    public void serialize(final RadioButtonComponent radioButtonComponent, final JsonGenerator jgen,
                          final SerializerProvider serializerProvider)
            throws IOException {
        jgen.writeStartObject();
        jgen.writeObjectField("type", radioButtonComponent.getClass().getSimpleName());
        if (radioButtonComponent.getLabel() != null) {
            jgen.writeObjectField("label", radioButtonComponent.getLabel().toString());
        }
        if (radioButtonComponent.getHorizontal() != null) {
            jgen.writeObjectField("isHorizontal", radioButtonComponent.getHorizontal().toString());
        }
        if (radioButtonComponent.getValues() != null && radioButtonComponent.getValues().size() > 0) {
            jgen.writeArrayFieldStart("values");
            for (String value : radioButtonComponent.getValues()) {
                jgen.writeString(value);
            }
            jgen.writeEndArray();
        }
        jgen.writeEndObject();
    }
}
