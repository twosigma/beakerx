package com.twosigma.beaker.easyform.serializer;

import com.twosigma.beaker.easyform.formitem.SaveValuesButton;
import org.codehaus.jackson.JsonGenerator;

import java.io.IOException;

public class SaveValuesButtonSerializer extends AbstractEasyFormComponentSerializer<SaveValuesButton> {

    @Override
    protected void writeSubclassFields(final JsonGenerator jgen, final SaveValuesButton component)
            throws IOException {
        if (component.getPath() != null) {
            jgen.writeStringField("path", component.getPath());
        }
    }
}
