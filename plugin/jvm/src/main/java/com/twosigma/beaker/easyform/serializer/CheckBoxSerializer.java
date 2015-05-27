package com.twosigma.beaker.easyform.serializer;

import com.twosigma.beaker.easyform.formitem.CheckBox;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.map.JsonSerializer;
import org.codehaus.jackson.map.SerializerProvider;

import java.io.IOException;

public class CheckBoxSerializer extends JsonSerializer<CheckBox> {
    @Override
    public void serialize(final CheckBox checkBox, final JsonGenerator jgen,
                          final SerializerProvider serializerProvider)
            throws IOException {
        jgen.writeStartObject();
        jgen.writeObjectField("type", checkBox.getClass().getSimpleName());
        if (checkBox.getLabel() != null) {
            jgen.writeObjectField("label", checkBox.getLabel().toString());
        }
        if (checkBox.getValue() != null) {
            jgen.writeObjectField("value", checkBox.getValue().toString());
        }
        jgen.writeEndObject();
    }
}
