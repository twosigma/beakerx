package com.twosigma.beaker.easyform.serializer;

import com.twosigma.beaker.easyform.formitem.TextArea;
import org.codehaus.jackson.JsonGenerator;

import java.io.IOException;

public class TextAreaSerializer extends AbstractEasyFormComponentSerializer<TextArea> {

    @Override
    protected void writeSubclassFields(final JsonGenerator jgen, final TextArea component) throws IOException {
    }
}
