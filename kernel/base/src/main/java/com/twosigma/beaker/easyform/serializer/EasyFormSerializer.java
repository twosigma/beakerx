/*
 * Copyright (c) 2017 Two Sigma Investments, LP
 * All Rights Reserved
 *
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF
 * Two Sigma Investments, LLC.
 *
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
package com.twosigma.beaker.easyform.serializer;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.twosigma.beaker.easyform.EasyForm;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;

public class EasyFormSerializer extends JsonSerializer {
    private final static Logger logger = LoggerFactory.getLogger(EasyFormSerializer.class.getName());
    public static final String CAPTION = "caption";

    @Override
    public void serialize(Object o, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException, JsonProcessingException {
        jsonGenerator.writeStartObject();
        String type = o.getClass().getSimpleName();
        jsonGenerator.writeObjectField("type", type);
        jsonGenerator.writeObjectField(CAPTION, ((EasyForm)o).getCaption());
        jsonGenerator.writeEndObject();
    }
}
