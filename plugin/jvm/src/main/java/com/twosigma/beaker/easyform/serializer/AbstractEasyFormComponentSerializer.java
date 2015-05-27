package com.twosigma.beaker.easyform.serializer;

import com.twosigma.beaker.easyform.EasyFormComponent;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.map.JsonSerializer;
import org.codehaus.jackson.map.SerializerProvider;

import java.io.IOException;

public abstract class AbstractEasyFormComponentSerializer<T extends EasyFormComponent> extends JsonSerializer<T> {

    @Override
    public void serialize(final T component, final JsonGenerator jgen,
                          final SerializerProvider serializerProvider) throws IOException {
        jgen.writeStartObject();
        jgen.writeObjectField("type", component.getClass().getSimpleName());
        if (component.getLabel() != null) {
            jgen.writeStringField("label", component.getLabel());
        }
        jgen.writeBooleanField("enabled", component.isEnabled());
        writeSubclassFields(jgen, component);
        jgen.writeEndObject();
    }

    /**
     * Override to serialize fields from subclasses
     *
     * @param jgen
     * @param component
     */
    protected void writeSubclassFields(final JsonGenerator jgen, final T component) throws IOException {
    }
}
