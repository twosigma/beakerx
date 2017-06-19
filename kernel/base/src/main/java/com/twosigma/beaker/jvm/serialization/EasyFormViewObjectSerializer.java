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
package com.twosigma.beaker.jvm.serialization;

import com.fasterxml.jackson.core.JsonGenerator;
import com.twosigma.beaker.easyform.EasyForm;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;

public class EasyFormViewObjectSerializer extends BasicObjectSerializer {
    private final static Logger logger = LoggerFactory.getLogger(EasyFormViewObjectSerializer.class.getName());

    @Override
    public boolean writeObject(Object obj, JsonGenerator jgen, boolean expand)
            throws IOException {

        if (super.writeObject(obj, jgen, expand)) {
            return true;
        } else if (expand && obj instanceof EasyForm) {
            logger.info("test");
            jgen.writeObject((EasyForm) obj);
        } else {
            return false;
        }
        return true;
    }
}
