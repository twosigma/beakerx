package com.twosigma.beaker.easyform.serializer;

import com.twosigma.beaker.easyform.formitem.RadioButtonComponent;
import org.codehaus.jackson.JsonGenerator;

import java.io.IOException;

public class RadioButtonSerializer extends AbstractEasyFormComponentSerializer<RadioButtonComponent> {

    @Override
    protected void writeSubclassFields(final JsonGenerator jgen, final RadioButtonComponent component) throws IOException {
        if (component.getHorizontal() != null) {
            jgen.writeObjectField("isHorizontal", component.getHorizontal().toString());
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
