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

package com.twosigma.beakerx.chart.serializer;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.twosigma.beakerx.chart.xychart.plotitem.Rasters;
import com.twosigma.beakerx.message.Message;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.codec.binary.StringUtils;

public class RastersSerializer extends JsonSerializer<Rasters> {

  public static final String TYPE = "type";

  @Override
  public void serialize(Rasters rasters, JsonGenerator jgen, SerializerProvider sp)
      throws IOException {
    validate(rasters);

    jgen.writeStartObject();

    jgen.writeObjectField(TYPE, rasters.getClass().getSimpleName());
    jgen.writeObjectField("x", rasters.getX());
    jgen.writeObjectField("y", rasters.getY());
    jgen.writeObjectField("opacity", rasters.getOpacity());
    jgen.writeObjectField("visible", rasters.getVisible());
    jgen.writeObjectField("yAxis", rasters.getYAxis());
    jgen.writeObjectField("position", rasters.getPosition());
    jgen.writeObjectField("width", rasters.getWidth());
    jgen.writeObjectField("height", rasters.getHeight());

    // datastring will override file path/url
    if (rasters.getDataString() != null) {
      jgen.writeObjectField("value", Bytes2Base64(rasters.getDataString(), null));
    } else if (!rasters.getFilePath().isEmpty()) {
      String path = rasters.getFilePath();
      File file = new File(path);

      if (!file.exists()) {
        throw new FileNotFoundException("Cannot find file " + path);
      }

      byte[] picture = Files.readAllBytes(new File(path).toPath());
      String extension = "";
      int i = path.lastIndexOf('.');
      if (i > 0) {
        extension = path.substring(i + 1);
      }

      jgen.writeObjectField("value", Bytes2Base64(picture, extension));
    } else if (!rasters.getFileUrl().isEmpty()) {
      jgen.writeObjectField("value", rasters.getFileUrl());
    }

    jgen.writeEndObject();
  }

  private void validate(Rasters raster) {
    if (raster.getY() == null || raster.getY().isEmpty()) {
      throw new IllegalStateException(Messages.PROVIDE_Y_COORDINATE);
    }

    if (raster.getHeight() == null || raster.getHeight().isEmpty()) {
      throw new IllegalStateException(Messages.PROVIDE_HEIGHT);
    }

    if (raster.getWidth() == null || raster.getWidth().isEmpty()) {
      throw new IllegalStateException(Messages.PROVIDE_WIDTH);
    }
  }

  private String Bytes2Base64(byte[] bytes, String format) {
    StringBuilder sb = new StringBuilder();
    if (format != null) {
      sb.append("data:image/").append(format).append(";base64,");
    } else {
      sb.append("data:image/png;base64,");
    }
    sb.append(StringUtils.newStringUtf8(Base64.encodeBase64(bytes, false)));
    return sb.toString();
  }
}
