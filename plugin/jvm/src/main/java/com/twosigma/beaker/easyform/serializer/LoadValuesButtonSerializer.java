package com.twosigma.beaker.easyform.serializer;

import com.twosigma.beaker.easyform.formitem.LoadValuesButton;
import org.codehaus.jackson.JsonGenerator;

import java.io.IOException;

public class LoadValuesButtonSerializer extends AbstractEasyFormComponentSerializer<LoadValuesButton> {

    @Override
    protected void writeSubclassFields(final JsonGenerator jgen, final LoadValuesButton component)
            throws IOException {
        if (component.getPath() != null) {
            jgen.writeStringField("path", component.getPath());
        }
    }
}
