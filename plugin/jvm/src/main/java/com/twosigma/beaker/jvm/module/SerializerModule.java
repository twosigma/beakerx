/*
 *  Copyright 2014 TWO SIGMA OPEN SOURCE, LLC
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
package com.twosigma.beaker.jvm.module;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import com.google.inject.AbstractModule;
import com.google.inject.Inject;
import com.google.inject.Injector;
import com.google.inject.Provider;
import com.google.inject.Provides;
import com.google.inject.Singleton;
import com.twosigma.beaker.BeakerCodeCell;
import com.twosigma.beaker.BeakerProgressUpdate;
import com.twosigma.beaker.NamespaceClient;
import com.twosigma.beaker.chart.serializer.AreaSerializer;
import com.twosigma.beaker.chart.serializer.BarsSerializer;
import com.twosigma.beaker.chart.serializer.ColorSerializer;
import com.twosigma.beaker.chart.serializer.CombinedPlotSerializer;
import com.twosigma.beaker.chart.serializer.CrosshairSerializer;
import com.twosigma.beaker.chart.serializer.LineSerializer;
import com.twosigma.beaker.chart.serializer.XYChartSerializer;
import com.twosigma.beaker.chart.serializer.PointsSerializer;
import com.twosigma.beaker.chart.serializer.StemsSerializer;
import com.twosigma.beaker.chart.serializer.YAxisSerializer;
import com.twosigma.beaker.chart.xychart.CombinedPlot;
import com.twosigma.beaker.chart.xychart.XYChart;
import com.twosigma.beaker.chart.xychart.plotitem.Area;
import com.twosigma.beaker.chart.xychart.plotitem.Bars;
import com.twosigma.beaker.chart.xychart.plotitem.Crosshair;
import com.twosigma.beaker.chart.xychart.plotitem.Line;
import com.twosigma.beaker.chart.xychart.plotitem.Points;
import com.twosigma.beaker.chart.xychart.plotitem.Stems;
import com.twosigma.beaker.chart.xychart.plotitem.YAxis;
import com.twosigma.beaker.shared.NamespaceBinding;
import com.twosigma.beaker.shared.json.serializer.StringObject;
import com.twosigma.beaker.jvm.object.EvaluationResult;
import com.twosigma.beaker.jvm.object.BeakerObjectConverter;
import com.twosigma.beaker.jvm.object.OutputContainer;
import com.twosigma.beaker.jvm.object.PlotObjectSerializer;
import com.twosigma.beaker.jvm.object.SimpleEvaluationObject;
import com.twosigma.beaker.jvm.object.TableDisplay;
import com.twosigma.beaker.jvm.object.UpdatableEvaluationResult;
import com.twosigma.beaker.jvm.updater.ObservableUpdaterFactory;
import com.twosigma.beaker.jvm.updater.UpdateManager;
import com.twosigma.beaker.chart.Color;

import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.JsonParser;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.Version;
import org.codehaus.jackson.jaxrs.JacksonJsonProvider;
import org.codehaus.jackson.map.DeserializationContext;
import org.codehaus.jackson.map.JsonDeserializer;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.map.SerializationConfig;
import org.codehaus.jackson.map.module.SimpleModule;
import org.cometd.bayeux.server.BayeuxServer;

/**
 * The Guice module as the registry of mapping from classes to serializers
 */
public class SerializerModule extends AbstractModule {
  private final static Logger logger = Logger.getLogger(SerializerModule.class.getName());
  
  @Override
  protected void configure() {
    bind(SimpleEvaluationObject.Serializer.class);
    bind(EvaluationResult.Serializer.class);
    bind(UpdatableEvaluationResult.Serializer.class);
    bind(OutputContainer.Serializer.class);
    bind(BeakerProgressUpdate.Serializer.class);
  }

  @Provides
  @Singleton
  public UpdateManager getUpdateManager(Injector injector) {
    BayeuxServer bayeuxServer = injector.getInstance(BayeuxServer.class);
    UpdateManager updateManager = new UpdateManager(bayeuxServer);
    updateManager.addUpdaterFactory(new ObservableUpdaterFactory());
    return updateManager;
  }

  @Provides
  @Singleton
  public BeakerObjectConverter getObjectSerializer(Injector injector) {
    BeakerObjectConverter serializer = injector.getInstance(PlotObjectSerializer.class);
    try {
      serializer.addTypeDeserializer(injector.getInstance(TableDisplay.DeSerializer.class));
      serializer.addTypeDeserializer(injector.getInstance(OutputContainer.DeSerializer.class));
      // TODO add here more - BeakerCodeCell BeakerProgressUpdate SimpleEvaluationObject UpdatableEvaluationResult
      
    } catch(Exception e) {
      logger.log(Level.SEVERE, "exception while creating ObjectSerializer", e);
    }
    return serializer;
  }

  @Provides
  @Singleton
  public ObjectMapper getObjectMapper(Injector injector) {
    ObjectMapper mapper = new ObjectMapper();
    try {
      SimpleModule module =
          new SimpleModule("MySerializer", new Version(1, 0, 0, null));

      // this is the root object we deserialize when reading from notebook namespace
      module.addDeserializer(NamespaceBinding.class, injector.getInstance(NamespaceBindingDeserializer.class));
      module.addDeserializer(BeakerCodeCellList.class, injector.getInstance(BeakerCodeCellListDeserializer.class));
      
      // all these objects can be returned as values and/or stored in the notebook namespace
      module.addSerializer(SimpleEvaluationObject.class, injector.getInstance(SimpleEvaluationObject.Serializer.class));
      module.addSerializer(EvaluationResult.class, injector.getInstance(EvaluationResult.Serializer.class));
      module.addSerializer(UpdatableEvaluationResult.class, injector.getInstance(UpdatableEvaluationResult.Serializer.class));
      module.addSerializer(TableDisplay.class, injector.getInstance(TableDisplay.Serializer.class));
      module.addSerializer(OutputContainer.class, injector.getInstance(OutputContainer.Serializer.class));
      module.addSerializer(StringObject.class, injector.getInstance(StringObject.Serializer.class));
      module.addSerializer(BeakerProgressUpdate.class, injector.getInstance(BeakerProgressUpdate.Serializer.class));
      module.addSerializer(BeakerCodeCell.class, injector.getInstance(BeakerCodeCell.Serializer.class));
      module.addSerializer(Color.class, injector.getInstance(ColorSerializer.class));
      module.addSerializer(XYChart.class, injector.getInstance(XYChartSerializer.class));
      module.addSerializer(CombinedPlot.class, injector.getInstance(CombinedPlotSerializer.class));
      module.addSerializer(Line.class, injector.getInstance(LineSerializer.class));
      module.addSerializer(Points.class, injector.getInstance(PointsSerializer.class));
      module.addSerializer(Bars.class, injector.getInstance(BarsSerializer.class));
      module.addSerializer(Stems.class, injector.getInstance(StemsSerializer.class));
      module.addSerializer(Area.class, injector.getInstance(AreaSerializer.class));
      module.addSerializer(YAxis.class, injector.getInstance(YAxisSerializer.class));
      module.addSerializer(Crosshair.class, injector.getInstance(CrosshairSerializer.class));

      mapper.registerModule(module);

      mapper.enable(SerializationConfig.Feature.INDENT_OUTPUT);

      // Manually serialize everything, either through mixin or serializer
      mapper.disable(SerializationConfig.Feature.AUTO_DETECT_GETTERS);
      mapper.disable(SerializationConfig.Feature.AUTO_DETECT_IS_GETTERS);
      mapper.disable(SerializationConfig.Feature.AUTO_DETECT_FIELDS);
      mapper.disable(SerializationConfig.Feature.FAIL_ON_EMPTY_BEANS);

      NamespaceClient.setInjector(injector);
    } catch(Exception e) {
      logger.log(Level.SEVERE, "exception while creating ObjectMapper", e);
    }
    return mapper;
  }

  @Provides
  @Singleton
  public JacksonJsonProvider getJackson(ObjectMapper mapper) {
    return new JacksonJsonProvider(mapper);
  }

  /*
   * This class is used to deserialize the root object when reading from the notebook namespace
   */
  public static class NamespaceBindingDeserializer extends JsonDeserializer<NamespaceBinding> {

    private final Provider<BeakerObjectConverter> objectSerializerProvider;

    @Inject
    public NamespaceBindingDeserializer(Provider<BeakerObjectConverter> osp) {
      objectSerializerProvider = osp;
    }

    @Override
    public NamespaceBinding deserialize(JsonParser jp, DeserializationContext ctxt) 
        throws IOException, JsonProcessingException {
      ObjectMapper mapper = (ObjectMapper)jp.getCodec();
      JsonNode node = mapper.readTree(jp);
      String name = node.get("name").asText();
      String session = node.get("session").asText();
      Boolean defined = node.get("defined").asBoolean();
      JsonNode o = node.get("value");

      Object obj = objectSerializerProvider.get().deserialize(o, mapper);
      return new NamespaceBinding(name,session,obj,defined);
    }
  }


  /*
   * This class is usedas fake root object when accessing the notebook code cells
   */
  public static class BeakerCodeCellList {
    public List<BeakerCodeCell> theList;
  }
  
  /*
   * This class is used to deserialize the above fake root object when reading the notebook code cells
   */
  public static class BeakerCodeCellListDeserializer extends JsonDeserializer<BeakerCodeCellList> {

    private final Provider<BeakerObjectConverter> objectSerializerProvider;

    @Inject
    public BeakerCodeCellListDeserializer(Provider<BeakerObjectConverter> osp) {
      objectSerializerProvider = osp;
    }

    @Override
    public BeakerCodeCellList deserialize(JsonParser jp, DeserializationContext ctxt) 
        throws IOException, JsonProcessingException {
      ObjectMapper mapper = (ObjectMapper)jp.getCodec();
      JsonNode node = mapper.readTree(jp);
      
      List<BeakerCodeCell> l = new ArrayList<BeakerCodeCell>();
      
      if (node.isArray()) {
        for (JsonNode o : node) {
          Object obj = objectSerializerProvider.get().deserialize(o, mapper);
          if (obj instanceof BeakerCodeCell)
            l.add((BeakerCodeCell) obj);
        }
      }
      
      BeakerCodeCellList r = new BeakerCodeCellList();
      r.theList = l;
      return r;
    }
  }

}
