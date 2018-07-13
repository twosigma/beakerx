/*
 *  Copyright 2018 TWO SIGMA OPEN SOURCE, LLC
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
package com.twosigma.beakerx.table.serializer;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.twosigma.beakerx.jvm.serialization.ObjectDeserializer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;

public class AutotranslationDefaultDeserializer implements ObjectDeserializer{

    private final static Logger logger = LoggerFactory.getLogger(AutotranslationDefaultDeserializer.class.getName());

    @Override
    public boolean canBeUsed(JsonNode n) {
        // used as a last deserializer if there is no valid deserializer for processed object
        return true;
    }

    @Override
    public Object deserialize(JsonNode n, ObjectMapper mapper) {
        try {
            return mapper.readValue(n.toString(), Object.class);
        } catch (IOException e) {
            logger.error("exception in autotranslation default deserialization", e);
        }
        return null;
    }
}
