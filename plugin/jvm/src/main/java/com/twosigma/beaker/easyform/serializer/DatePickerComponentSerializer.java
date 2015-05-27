package com.twosigma.beaker.easyform.serializer;

import com.twosigma.beaker.easyform.formitem.DatePickerComponent;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.map.JsonSerializer;
import org.codehaus.jackson.map.SerializerProvider;

import java.io.IOException;

public class DatePickerComponentSerializer extends JsonSerializer<DatePickerComponent> {
    @Override
    public void serialize(final DatePickerComponent datePickerComponent, final JsonGenerator jgen,
                          final SerializerProvider serializerProvider)
            throws IOException {
        jgen.writeStartObject();
        jgen.writeObjectField("type", datePickerComponent.getClass().getSimpleName());
        if (datePickerComponent.getLabel() != null) {
            jgen.writeObjectField("label", datePickerComponent.getLabel().toString());
        }
        if (datePickerComponent.getShowTime() != null) {
            jgen.writeObjectField("showTime", datePickerComponent.getShowTime().toString());
        }
        jgen.writeEndObject();
    }
}
