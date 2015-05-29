package com.twosigma.beaker.easyform.serializer;

import com.twosigma.beaker.easyform.EasyForm;
import com.twosigma.beaker.easyform.EasyFormComponent;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.map.JsonSerializer;
import org.codehaus.jackson.map.SerializerProvider;

import java.io.IOException;

public class EasyFormSerializer extends JsonSerializer<EasyForm> {
    @Override
    public void serialize(final EasyForm easyForm, final JsonGenerator jgen,
                          final SerializerProvider serializerProvider)
            throws IOException {
        jgen.writeStartObject();
        jgen.writeObjectField("type", easyForm.getClass().getSimpleName());
        if (easyForm.hasComponents()) {
            jgen.writeArrayFieldStart("components");
            for (EasyFormComponent component : easyForm.getComponentMap().values()) {
                jgen.writeObject(component);
            }
            if (easyForm.hasSaveValuesButton()) {
                jgen.writeObject(easyForm.getSaveValuesButton());
            }
            if (easyForm.hasLoadValuesButton()) {
                jgen.writeObject(easyForm.getLoadValuesButton());
            }
            jgen.writeEndArray();
        }
        jgen.writeEndObject();
    }
}
