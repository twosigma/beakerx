package com.twosigma.beaker.easyform.serializer;

import com.twosigma.beaker.easyform.formitem.ListComponent;
import org.codehaus.jackson.JsonGenerator;

import java.io.IOException;

public class ListComponentSerializer extends AbstractEasyFormComponentSerializer<ListComponent> {

    @Override
    protected void writeSubclassFields(final JsonGenerator jgen, final ListComponent component) throws IOException {
        if (component.getSize() != null) {
            jgen.writeObjectField("size", component.getSize().toString());
        }
        if (component.getMultipleSelection() != null) {
            jgen.writeObjectField("multipleSelection", component.getMultipleSelection().toString());
        }
        if (component.getValues() != null && component.getValues().size() > 0) {
            jgen.writeArrayFieldStart("values");
            for (String value : component.getValues()) {
                jgen.writeString(value);
            }
            jgen.writeEndArray();
        }
    }
}
