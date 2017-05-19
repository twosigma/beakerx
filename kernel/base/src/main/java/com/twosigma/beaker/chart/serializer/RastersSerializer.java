/*
 *  Copyright 2017 TWO SIGMA OPEN SOURCE, LLC
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

package com.twosigma.beaker.chart.serializer;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.twosigma.beaker.chart.xychart.plotitem.Rasters;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.codec.binary.StringUtils;

public class RastersSerializer extends JsonSerializer<Rasters> {

  @Override
  public void serialize(Rasters raster, JsonGenerator jgen, SerializerProvider sp) throws IOException {
    validate(raster);

    jgen.writeStartObject();

    jgen.writeObjectField("type", raster.getClass().getSimpleName());
    jgen.writeObjectField("x", raster.getX());
    jgen.writeObjectField("y", raster.getY());
    jgen.writeObjectField("opacity", raster.getOpacity());
    jgen.writeObjectField("visible", raster.getVisible());
    jgen.writeObjectField("yAxis", raster.getYAxis());
    jgen.writeObjectField("position", raster.getPosition());
    jgen.writeObjectField("width", raster.getWidth());
    jgen.writeObjectField("height", raster.getHeight());

    // datastring will override file path/url
    if (raster.getDataString() != null) {
      jgen.writeObjectField("value", Bytes2Base64(raster.getDataString(), null));
    } else if (!raster.getFilePath().isEmpty()) {
      String path = raster.getFilePath();
      File file = new File(path);

      if (!file.exists()) {
        throw new FileNotFoundException("Cannot find file " + path);
      }

      byte[] picture = Files.readAllBytes(new File(path).toPath());
      String extension = "";
      int i = path.lastIndexOf('.');
      if (i > 0) {
        extension = path.substring(i+1);
      }

      jgen.writeObjectField("value", Bytes2Base64(picture, extension));
    } else if (!raster.getFileUrl().isEmpty()) {
      jgen.writeObjectField("value", raster.getFileUrl());
    }

    jgen.writeEndObject();
  }

  private void validate(Rasters raster) {
    if (raster.getY() == null || raster.getY().isEmpty()) {
      throw new IllegalStateException("Please provide Y coordinate.");
    }

    if (raster.getHeight() == null || raster.getHeight().isEmpty()) {
      throw new IllegalStateException("Please provide height size.");
    }

    if (raster.getWidth() == null || raster.getWidth().isEmpty()) {
      throw new IllegalStateException("Please provide width size.");
    }
  }

  private String processLargeNumber(Number largeNumber){
    return largeNumber != null ? largeNumber.toString() : "";
  }

  private String Bytes2Base64(byte[] bytes, String format) {
    StringBuilder sb = new StringBuilder();
    if (format != null)
      sb.append("data:image/").append(format).append(";base64,");
    else
      sb.append("data:image/png;base64,");
    sb.append(StringUtils.newStringUtf8(Base64.encodeBase64(bytes, false)));
    return sb.toString();
  }
}
