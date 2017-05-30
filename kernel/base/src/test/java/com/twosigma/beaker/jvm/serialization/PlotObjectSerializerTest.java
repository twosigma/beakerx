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

package com.twosigma.beaker.jvm.serialization;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.MapperFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.twosigma.beaker.KernelTest;
import com.twosigma.beaker.chart.categoryplot.CategoryPlot;
import com.twosigma.beaker.chart.categoryplot.plotitem.CategoryLines;
import com.twosigma.beaker.chart.heatmap.HeatMap;
import com.twosigma.beaker.chart.histogram.Histogram;
import com.twosigma.beaker.chart.treemap.TreeMap;
import com.twosigma.beaker.chart.xychart.CombinedPlot;
import com.twosigma.beaker.chart.xychart.Plot;
import com.twosigma.beaker.chart.xychart.plotitem.Bars;
import com.twosigma.beaker.jupyter.KernelManager;
import com.twosigma.beaker.jvm.object.ConsoleOutput;
import net.sf.jtreemap.swing.TreeMapNode;
import org.assertj.core.api.Assertions;
import org.junit.After;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

import java.io.StringWriter;
import java.util.Arrays;

public class PlotObjectSerializerTest {
  private PlotObjectSerializer plotObjectSerializer;
  private static JsonGenerator jgen;
  private static ObjectMapper mapper;

  @BeforeClass
  public static void setUpClass() throws Exception {
    mapper = new ObjectMapper();
    mapper.disable(MapperFeature.AUTO_DETECT_GETTERS);
    mapper.disable(MapperFeature.AUTO_DETECT_IS_GETTERS);
    mapper.disable(MapperFeature.AUTO_DETECT_FIELDS);
    mapper.disable(SerializationFeature.FAIL_ON_EMPTY_BEANS);
    jgen = mapper.getFactory().createGenerator(new StringWriter());
  }

  @Before
  public void setUp() throws Exception {
    KernelManager.register(new KernelTest());
    plotObjectSerializer = new PlotObjectSerializer();
  }

  @After
  public void tearDown() throws Exception {
    KernelManager.register(null);
  }

  @Test
  public void serializeXYChart_returnTrue() throws Exception {
    //when
    boolean result = plotObjectSerializer.writeObject(new Plot(), jgen, true);
    //then
    Assertions.assertThat(result).isTrue();
  }

  @Test
  public void serializeXYGraphics_returnTrue() throws Exception {
    Bars obj = new Bars();
    obj.setX(Arrays.asList(10, 20));
    obj.setY(Arrays.asList(10, 20));
    obj.setDisplayName("test display name");
    //when
    boolean result = plotObjectSerializer.writeObject(obj, jgen, true);
    //then
    Assertions.assertThat(result).isTrue();
  }

  @Test
  public void serializeArrays_returnTrue() throws Exception {
    //when
    boolean result =
        plotObjectSerializer.writeObject(Arrays.asList("v1", "v2"), jgen, true);
    //then
    Assertions.assertThat(result).isTrue();
  }

  @Test
  public void serializeCategoryPlot_returnTrue() throws Exception {
    //when
    boolean result = plotObjectSerializer.writeObject(new CategoryPlot(), jgen, true);
    //then
    Assertions.assertThat(result).isTrue();
  }

  @Test
  public void serializeCategoryGraphics_returnTrue() throws Exception {
    //when
    boolean result = plotObjectSerializer.writeObject(new CategoryLines(), jgen, true);
    //then
    Assertions.assertThat(result).isTrue();
  }

  @Test
  public void serializeHistogram_returnTrue() throws Exception {
    //when
    boolean result = plotObjectSerializer.writeObject(new Histogram(), jgen, true);
    //then
    Assertions.assertThat(result).isTrue();
  }

  @Test
  public void serializeTreeMap_returnTrue() throws Exception {
    //when
    boolean result = plotObjectSerializer.writeObject(new TreeMap(), jgen, true);
    //then
    Assertions.assertThat(result).isTrue();
  }

  @Test
  public void serializeTreeMapNode_returnTrue() throws Exception {
    //when
    boolean result = plotObjectSerializer.writeObject(new TreeMapNode("010"), jgen, true);
    //then
    Assertions.assertThat(result).isTrue();
  }

  @Test
  public void serializeCombinedPlot_returnTrue() throws Exception {
    //when
    boolean result = plotObjectSerializer.writeObject(new CombinedPlot(), jgen, true);
    //then
    Assertions.assertThat(result).isTrue();
  }

  @Test
  public void serializeHeatMap_returnTrue() throws Exception {
    //when
    boolean result = plotObjectSerializer.writeObject(new HeatMap(), jgen, true);
    //then
    Assertions.assertThat(result).isTrue();
  }

  @Test
  public void serializeConsoleOutput_returnFalse() throws Exception {
    //when
    boolean result =
        plotObjectSerializer.writeObject(new ConsoleOutput(true, "txt"), jgen, true);
    //then
    Assertions.assertThat(result).isFalse();
  }

}
