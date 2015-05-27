package com.twosigma.beaker.easyform.serializer;

import com.twosigma.beaker.easyform.formitem.ComboBox;
import org.codehaus.jackson.JsonGenerator;

import java.io.IOException;

public class ComboBoxSerializer extends AbstractEasyFormComponentSerializer<ComboBox> {

    @Override
    protected void writeSubclassFields(final JsonGenerator jgen, final ComboBox component) throws IOException {
        if (component.getEditable() != null) {
            jgen.writeObjectField("editable", component.getEditable().toString());
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
