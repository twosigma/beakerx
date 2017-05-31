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

package com.twosigma.beaker.table;

import com.fasterxml.jackson.core.Version;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.twosigma.beaker.chart.Color;
import com.twosigma.beaker.chart.serializer.ColorSerializer;
import com.twosigma.beaker.jvm.serialization.DateSerializer;
import com.twosigma.beaker.table.format.DecimalStringFormat;
import com.twosigma.beaker.table.format.TimeStringFormat;
import com.twosigma.beaker.table.format.ValueStringFormat;
import com.twosigma.beaker.table.highlight.HeatmapHighlighter;
import com.twosigma.beaker.table.highlight.ThreeColorHeatmapHighlighter;
import com.twosigma.beaker.table.highlight.UniqueEntriesHighlighter;
import com.twosigma.beaker.table.highlight.ValueHighlighter;
import com.twosigma.beaker.table.renderer.DataBarsRenderer;
import com.twosigma.beaker.table.serializer.DataBarsRendererSerializer;
import com.twosigma.beaker.table.serializer.DecimalStringFormatSerializer;
import com.twosigma.beaker.table.serializer.HeatmapHighlighterSerializer;
import com.twosigma.beaker.table.serializer.TableDisplaySerializer;
import com.twosigma.beaker.table.serializer.ThreeColorHeatmapHighlighterSerializer;
import com.twosigma.beaker.table.serializer.TimeStringFormatSerializer;
import com.twosigma.beaker.table.serializer.UniqueEntriesHighlighterSerializer;
import com.twosigma.beaker.table.serializer.ValueHighlighterSerializer;
import com.twosigma.beaker.table.serializer.ValueStringFormatSerializer;

import java.util.Date;
import java.util.Map;

import static com.fasterxml.jackson.databind.SerializationFeature.WRITE_ENUMS_USING_TO_STRING;

public class TableDisplayToJson {

  private static ObjectMapper mapper;

  static {
    SimpleModule module = new SimpleModule("TableDisplaySerializer", new Version(1, 0, 0, null));
    module.addSerializer(TableDisplay.class, new TableDisplaySerializer());
    module.addSerializer(ValueStringFormat.class, new ValueStringFormatSerializer());
    module.addSerializer(DecimalStringFormat.class, new DecimalStringFormatSerializer());
    module.addSerializer(TimeStringFormat.class, new TimeStringFormatSerializer());
    module.addSerializer(DataBarsRenderer.class, new DataBarsRendererSerializer());
    module.addSerializer(HeatmapHighlighter.class, new HeatmapHighlighterSerializer());
    module.addSerializer(ThreeColorHeatmapHighlighter.class, new ThreeColorHeatmapHighlighterSerializer());
    module.addSerializer(UniqueEntriesHighlighter.class, new UniqueEntriesHighlighterSerializer());
    module.addSerializer(ValueHighlighter.class, new ValueHighlighterSerializer());
    module.addSerializer(Date.class, new DateSerializer());
    module.addSerializer(Color.class, new ColorSerializer());


    mapper = new ObjectMapper();
    mapper.enable(WRITE_ENUMS_USING_TO_STRING);
    mapper.registerModule(module);
  }

  public static Map toJson(TableDisplay tableDisplay) {
    return mapper.convertValue(tableDisplay, Map.class);
  }
}