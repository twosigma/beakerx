package com.twosigma.beaker.easyform.serializer;

import com.twosigma.beaker.easyform.formitem.ButtonComponent;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.map.JsonSerializer;
import org.codehaus.jackson.map.SerializerProvider;

import java.io.IOException;

public class ButtonComponentSerializer extends JsonSerializer<ButtonComponent> {
    @Override
    public void serialize(final ButtonComponent buttonComponent, final JsonGenerator jgen,
                          final SerializerProvider serializerProvider)
            throws IOException {
        jgen.writeStartObject();
        jgen.writeObjectField("type", buttonComponent.getClass().getSimpleName());
        if (buttonComponent.getText() != null) {
            jgen.writeObjectField("text", buttonComponent.getText().toString());
        }
        if (buttonComponent.getTag() != null) {
            jgen.writeObjectField("tag", buttonComponent.getTag().toString());
        }
        jgen.writeEndObject();
    }
}
