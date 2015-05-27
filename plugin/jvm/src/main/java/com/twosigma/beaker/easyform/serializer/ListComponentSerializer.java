package com.twosigma.beaker.easyform.serializer;

import com.twosigma.beaker.easyform.formitem.ListComponent;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.map.JsonSerializer;
import org.codehaus.jackson.map.SerializerProvider;

import java.io.IOException;

public class ListComponentSerializer extends JsonSerializer<ListComponent> {
    @Override
    public void serialize(final ListComponent listComponent, final JsonGenerator jgen,
                          final SerializerProvider serializerProvider)
            throws IOException {
        jgen.writeStartObject();
        jgen.writeObjectField("type", listComponent.getClass().getSimpleName());
        if (listComponent.getLabel() != null) {
            jgen.writeObjectField("label", listComponent.getLabel().toString());
        }
        if (listComponent.getSize() != null) {
            jgen.writeObjectField("size", listComponent.getSize().toString());
        }
        if (listComponent.getMultipleSelection() != null) {
            jgen.writeObjectField("multipleSelection", listComponent.getMultipleSelection().toString());
        }
        if (listComponent.getValues() != null && listComponent.getValues().size() > 0) {
            jgen.writeArrayFieldStart("values");
            for (String value : listComponent.getValues()) {
                jgen.writeString(value);
            }
            jgen.writeEndArray();
        }
        jgen.writeEndObject();
    }
}
