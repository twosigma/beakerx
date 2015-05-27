package com.twosigma.beaker.easyform.serializer;

import com.twosigma.beaker.easyform.formitem.CheckBox;
import org.codehaus.jackson.JsonGenerator;

import java.io.IOException;

public class CheckBoxSerializer extends AbstractEasyFormComponentSerializer<CheckBox> {

    @Override
    protected void writeSubclassFields(final JsonGenerator jgen, final CheckBox component) throws IOException {
        if (component.getValue() != null) {
            jgen.writeObjectField("value", component.getValue().toString());
        }
    }
}
