package com.twosigma.beaker.easyform.serializer;

import com.twosigma.beaker.easyform.formitem.ComboBox;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.map.JsonSerializer;
import org.codehaus.jackson.map.SerializerProvider;

import java.io.IOException;

public class ComboBoxSerializer extends JsonSerializer<ComboBox> {
    @Override
    public void serialize(final ComboBox comboBox, final JsonGenerator jgen,
                          final SerializerProvider serializerProvider)
            throws IOException {
        jgen.writeStartObject();
        jgen.writeObjectField("type", comboBox.getClass().getSimpleName());
        if (comboBox.getLabel() != null) {
            jgen.writeObjectField("label", comboBox.getLabel().toString());
        }
        if (comboBox.getEditable() != null) {
            jgen.writeObjectField("editable", comboBox.getEditable().toString());
        }
        if (comboBox.getValues() != null && comboBox.getValues().size() > 0) {
            jgen.writeArrayFieldStart("values");
            for (String value : comboBox.getValues()) {
                jgen.writeString(value);
            }
            jgen.writeEndArray();
        }
        jgen.writeEndObject();
    }
}
