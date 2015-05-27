package com.twosigma.beaker.easyform.serializer;

import com.twosigma.beaker.easyform.formitem.DatePickerComponent;
import org.codehaus.jackson.JsonGenerator;

import java.io.IOException;

public class DatePickerComponentSerializer extends AbstractEasyFormComponentSerializer<DatePickerComponent> {

    @Override
    protected void writeSubclassFields(final JsonGenerator jgen, final DatePickerComponent component)
            throws IOException {
        if (component.getShowTime() != null) {
            jgen.writeObjectField("showTime", component.getShowTime().toString());
        }
    }
}
