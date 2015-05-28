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

import java.awt.image.BufferedImage;
import java.util.Date;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.swing.ImageIcon;

import com.google.inject.AbstractModule;
import com.google.inject.Injector;
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
import com.twosigma.beaker.jvm.object.BeakerDashboard;
import com.twosigma.beaker.jvm.object.EvaluationResult;
import com.twosigma.beaker.jvm.object.OutputContainer;
import com.twosigma.beaker.jvm.object.SimpleEvaluationObject;
import com.twosigma.beaker.jvm.object.TableDisplay;
import com.twosigma.beaker.jvm.object.UpdatableEvaluationResult;
import com.twosigma.beaker.jvm.serialization.BeakerCodeCellList;
import com.twosigma.beaker.jvm.serialization.BeakerCodeCellListDeserializer;
import com.twosigma.beaker.jvm.serialization.BeakerObjectConverter;
import com.twosigma.beaker.jvm.serialization.BufferedImageDeserializer;
import com.twosigma.beaker.jvm.serialization.BufferedImageSerializer;
import com.twosigma.beaker.jvm.serialization.CollectionDeserializer;
import com.twosigma.beaker.jvm.serialization.DateDeserializer;
import com.twosigma.beaker.jvm.serialization.DateSerializer;
import com.twosigma.beaker.jvm.serialization.ImageIconSerializer;
import com.twosigma.beaker.jvm.serialization.MapDeserializer;
import com.twosigma.beaker.jvm.serialization.NamespaceBindingDeserializer;
import com.twosigma.beaker.jvm.serialization.PlotObjectSerializer;
import com.twosigma.beaker.jvm.serialization.ResultsDeserializer;
import com.twosigma.beaker.jvm.updater.ObservableUpdaterFactory;
import com.twosigma.beaker.jvm.updater.UpdateManager;
import com.twosigma.beaker.chart.Color;

import org.codehaus.jackson.Version;
import org.codehaus.jackson.jaxrs.JacksonJsonProvider;
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
      serializer.addTypeDeserializer(new TableDisplay.DeSerializer(serializer));
      serializer.addTypeDeserializer(new OutputContainer.DeSerializer(serializer));
      serializer.addTypeDeserializer(new BeakerCodeCell.DeSerializer(serializer));
      serializer.addTypeDeserializer(new BeakerProgressUpdate.DeSerializer(serializer));
      serializer.addTypeDeserializer(new SimpleEvaluationObject.DeSerializer(serializer));
      serializer.addTypeDeserializer(new UpdatableEvaluationResult.DeSerializer(serializer)); 
      serializer.addTypeDeserializer(new BufferedImageDeserializer(serializer));
      serializer.addTypeDeserializer(new DateDeserializer(serializer));
      serializer.addTypeDeserializer(new ResultsDeserializer(serializer));
      serializer.addTypeDeserializer(new CollectionDeserializer(serializer));
      serializer.addTypeDeserializer(new MapDeserializer(serializer));
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
      module.addSerializer(BeakerProgressUpdate.class, injector.getInstance(BeakerProgressUpdate.Serializer.class));
      module.addSerializer(BeakerCodeCell.class, injector.getInstance(BeakerCodeCell.Serializer.class));

      module.addSerializer(TableDisplay.class, injector.getInstance(TableDisplay.Serializer.class));
      module.addSerializer(OutputContainer.class, injector.getInstance(OutputContainer.Serializer.class));
      module.addSerializer(StringObject.class, injector.getInstance(StringObject.Serializer.class));
      module.addSerializer(BufferedImage.class, new BufferedImageSerializer());
      module.addSerializer(ImageIcon.class, new ImageIconSerializer());
      module.addSerializer(Date.class, new DateSerializer());
      module.addSerializer(BeakerDashboard.class, injector.getInstance(BeakerDashboard.Serializer.class));
      
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

}
