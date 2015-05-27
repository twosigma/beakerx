package com.twosigma.beaker.easyform.serializer;

import com.twosigma.beaker.easyform.formitem.TextField;
import org.codehaus.jackson.JsonGenerator;

import java.io.IOException;

public class TextFieldSerializer extends AbstractEasyFormComponentSerializer<TextField> {

    @Override
    protected void writeSubclassFields(final JsonGenerator jgen, final TextField component) throws IOException {
        if (component.getWidth() != null) {
            jgen.writeObjectField("width", component.getWidth().toString());
        }
    }
}
