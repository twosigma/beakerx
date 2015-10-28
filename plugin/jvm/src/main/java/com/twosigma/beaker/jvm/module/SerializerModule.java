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

import com.google.inject.AbstractModule;
import com.google.inject.Injector;
import com.google.inject.Provides;
import com.google.inject.Singleton;
import com.twosigma.beaker.BeakerCodeCell;
import com.twosigma.beaker.BeakerProgressUpdate;
import com.twosigma.beaker.NamespaceClient;
import com.twosigma.beaker.chart.Color;
import com.twosigma.beaker.chart.categoryplot.CategoryPlot;
import com.twosigma.beaker.chart.categoryplot.plotitem.CategoryBars;
import com.twosigma.beaker.chart.categoryplot.plotitem.CategoryLines;
import com.twosigma.beaker.chart.categoryplot.plotitem.CategoryPoints;
import com.twosigma.beaker.chart.categoryplot.plotitem.CategoryStems;
import com.twosigma.beaker.chart.histogram.Histogram;
import com.twosigma.beaker.chart.heatmap.HeatMap;
import com.twosigma.beaker.chart.legend.LegendPosition;
import com.twosigma.beaker.chart.serializer.AreaSerializer;
import com.twosigma.beaker.chart.serializer.BarsSerializer;
import com.twosigma.beaker.chart.serializer.CategoryBarsSerializer;
import com.twosigma.beaker.chart.serializer.CategoryLinesSerializer;
import com.twosigma.beaker.chart.serializer.CategoryPlotSerializer;
import com.twosigma.beaker.chart.serializer.CategoryPointsSerializer;
import com.twosigma.beaker.chart.serializer.CategoryStemsSerializer;
import com.twosigma.beaker.chart.serializer.ColorSerializer;
import com.twosigma.beaker.chart.serializer.CombinedPlotSerializer;
import com.twosigma.beaker.chart.serializer.CrosshairSerializer;
import com.twosigma.beaker.chart.serializer.HistogramSerializer;
import com.twosigma.beaker.chart.serializer.HeatMapSerializer;
import com.twosigma.beaker.chart.serializer.LegendPositionSerializer;
import com.twosigma.beaker.chart.serializer.LineSerializer;
import com.twosigma.beaker.chart.serializer.PointsSerializer;
import com.twosigma.beaker.chart.serializer.StemsSerializer;
import com.twosigma.beaker.chart.serializer.TextSerializer;
import com.twosigma.beaker.chart.serializer.XYChartSerializer;
import com.twosigma.beaker.chart.serializer.YAxisSerializer;
import com.twosigma.beaker.chart.xychart.CombinedPlot;
import com.twosigma.beaker.chart.xychart.XYChart;
import com.twosigma.beaker.chart.xychart.plotitem.Area;
import com.twosigma.beaker.chart.xychart.plotitem.Bars;
import com.twosigma.beaker.chart.xychart.plotitem.Crosshair;
import com.twosigma.beaker.chart.xychart.plotitem.Line;
import com.twosigma.beaker.chart.xychart.plotitem.Points;
import com.twosigma.beaker.chart.xychart.plotitem.Stems;
import com.twosigma.beaker.chart.xychart.plotitem.Text;
import com.twosigma.beaker.chart.xychart.plotitem.YAxis;
import com.twosigma.beaker.easyform.EasyForm;
import com.twosigma.beaker.easyform.EasyFormObjectManager;
import com.twosigma.beaker.easyform.formitem.ButtonComponent;
import com.twosigma.beaker.easyform.formitem.CheckBox;
import com.twosigma.beaker.easyform.formitem.CheckBoxGroup;
import com.twosigma.beaker.easyform.formitem.ComboBox;
import com.twosigma.beaker.easyform.formitem.DatePickerComponent;
import com.twosigma.beaker.easyform.formitem.ListComponent;
import com.twosigma.beaker.easyform.formitem.LoadValuesButton;
import com.twosigma.beaker.easyform.formitem.RadioButtonComponent;
import com.twosigma.beaker.easyform.formitem.SaveValuesButton;
import com.twosigma.beaker.easyform.formitem.TextArea;
import com.twosigma.beaker.easyform.formitem.TextField;
import com.twosigma.beaker.easyform.serializer.ButtonComponentSerializer;
import com.twosigma.beaker.easyform.serializer.CheckBoxGroupSerializer;
import com.twosigma.beaker.easyform.serializer.CheckBoxSerializer;
import com.twosigma.beaker.easyform.serializer.ComboBoxSerializer;
import com.twosigma.beaker.easyform.serializer.DatePickerComponentSerializer;
import com.twosigma.beaker.easyform.serializer.EasyFormSerializer;
import com.twosigma.beaker.easyform.serializer.ListComponentSerializer;
import com.twosigma.beaker.easyform.serializer.LoadValuesButtonSerializer;
import com.twosigma.beaker.easyform.serializer.RadioButtonSerializer;
import com.twosigma.beaker.easyform.serializer.SaveValuesButtonSerializer;
import com.twosigma.beaker.easyform.serializer.TextAreaSerializer;
import com.twosigma.beaker.easyform.serializer.TextFieldSerializer;
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
import com.twosigma.beaker.shared.NamespaceBinding;
import com.twosigma.beaker.shared.json.serializer.StringObject;
import org.codehaus.jackson.Version;
import org.codehaus.jackson.jaxrs.JacksonJsonProvider;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.map.SerializationConfig;
import org.codehaus.jackson.map.module.SimpleModule;
import org.cometd.bayeux.server.BayeuxServer;

import javax.swing.ImageIcon;
import java.awt.image.BufferedImage;
import java.util.Date;
import java.util.logging.Level;
import java.util.logging.Logger;

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
    bind(EasyFormObjectManager.class);
    bind(EasyFormSerializer.class);
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
      module.addSerializer(LegendPosition.class, injector.getInstance(LegendPositionSerializer.class));
      module.addSerializer(Text.class, injector.getInstance(TextSerializer.class));

      module.addSerializer(EasyForm.class, injector.getInstance(EasyFormSerializer.class));
      module.addSerializer(TextField.class, injector.getInstance(TextFieldSerializer.class));
      module.addSerializer(TextArea.class, injector.getInstance(TextAreaSerializer.class));
      module.addSerializer(CheckBox.class, injector.getInstance(CheckBoxSerializer.class));
      module.addSerializer(ComboBox.class, injector.getInstance(ComboBoxSerializer.class));
      module.addSerializer(ListComponent.class, injector.getInstance(ListComponentSerializer.class));
      module.addSerializer(RadioButtonComponent.class, injector.getInstance(RadioButtonSerializer.class));
      module.addSerializer(CheckBoxGroup.class, injector.getInstance(CheckBoxGroupSerializer.class));
      module.addSerializer(DatePickerComponent.class, injector.getInstance(DatePickerComponentSerializer.class));
      module.addSerializer(ButtonComponent.class, injector.getInstance(ButtonComponentSerializer.class));
      module.addSerializer(LoadValuesButton.class, injector.getInstance(LoadValuesButtonSerializer.class));
      module.addSerializer(SaveValuesButton.class, injector.getInstance(SaveValuesButtonSerializer.class));

      module.addSerializer(CategoryBars.class, injector.getInstance(CategoryBarsSerializer.class));
      module.addSerializer(CategoryStems.class, injector.getInstance(CategoryStemsSerializer.class));
      module.addSerializer(CategoryPoints.class, injector.getInstance(CategoryPointsSerializer.class));
      module.addSerializer(CategoryLines.class, injector.getInstance(CategoryLinesSerializer.class));
      module.addSerializer(CategoryPlot.class, injector.getInstance(CategoryPlotSerializer.class));

      module.addSerializer(Histogram.class, injector.getInstance(HistogramSerializer.class));

      module.addSerializer(HeatMap.class, injector.getInstance(HeatMapSerializer.class));

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
