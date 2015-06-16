package com.twosigma.beaker.easyform.serializer;

import com.twosigma.beaker.easyform.formitem.CheckBoxGroup;
import org.codehaus.jackson.JsonGenerator;

import java.io.IOException;

public class CheckBoxGroupSerializer extends AbstractEasyFormComponentSerializer<CheckBoxGroup> {
    @Override
    protected void writeSubclassFields(final JsonGenerator jgen, final CheckBoxGroup component) throws IOException {
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
