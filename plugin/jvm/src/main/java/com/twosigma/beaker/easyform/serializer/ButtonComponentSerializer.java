package com.twosigma.beaker.easyform.serializer;

import com.twosigma.beaker.easyform.formitem.ButtonComponent;
import org.codehaus.jackson.JsonGenerator;

import java.io.IOException;

public class ButtonComponentSerializer extends AbstractEasyFormComponentSerializer<ButtonComponent> {

    @Override
    protected void writeSubclassFields(final JsonGenerator jgen, final ButtonComponent component) throws IOException {
        if (component.getTag() != null) {
            jgen.writeObjectField("tag", component.getTag().toString());
        }
    }
}
