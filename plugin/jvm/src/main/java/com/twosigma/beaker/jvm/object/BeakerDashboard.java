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
package com.twosigma.beaker.jvm.object;

import java.util.ArrayList;
import java.util.List;
import java.util.Observable;
import java.io.IOException;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.JsonSerializer;
import org.codehaus.jackson.map.SerializerProvider;

import com.google.inject.Inject;
import com.google.inject.Provider;
import com.twosigma.beaker.jvm.serialization.BeakerObjectConverter;
import com.twosigma.beaker.jvm.updater.UpdateManager;

public class BeakerDashboard extends Observable {

  private String theStyle;
  private String theClass;
  
  public class dashRow {
    private final List<dashColumn> payload;
    private String theClass;
    private String theStyle;

    protected dashRow() {
      payload = new ArrayList<dashColumn>();
    }

    public List<dashColumn> getColumns() { return payload; }

    public String getTheClass() {
      return theClass;
    }
    public void setTheClass(String c) {
      theClass = c;
    }

    public String getTheStyle() {
      return theStyle;
    }
    public void setTheStyle(String s) {
      theStyle = s;
    }

    public void addColumn(dashColumn o)  {
      payload.add(o);
    }

    public void serialize(JsonGenerator jgen, BeakerObjectConverter boc) throws JsonGenerationException, IOException {
      jgen.writeStartObject();
      if (theStyle!=null) jgen.writeStringField("thestyle", theStyle);
      if (theClass!=null) jgen.writeStringField("theclass", theClass);
      jgen.writeArrayFieldStart("cols");
      for (dashColumn r : payload)
        r.serialize(jgen, boc);
      jgen.writeEndArray();
      jgen.writeEndObject();
    }
  }

  public class dashColumn {
    private final List<Object> payload;
    private String theClass;
    private String theStyle;
    private int w;

    protected dashColumn(int _w) {
      payload = new ArrayList<Object>();
      w = _w;
    }

    public void serialize(JsonGenerator jgen, BeakerObjectConverter boc) throws JsonGenerationException, IOException {
      jgen.writeStartObject();
      jgen.writeNumberField("width", w);
      if (theStyle!=null) jgen.writeStringField("thestyle", theStyle);
      if (theClass!=null) jgen.writeStringField("theclass", theClass);

      jgen.writeArrayFieldStart("payload");
      for (Object o : payload) {
        if ( o instanceof dashRow ) {
          ((dashRow) o).serialize(jgen, boc);
        } else if (!boc.writeObject(o, jgen, true))
          jgen.writeObject(o.toString());
      }
      jgen.writeEndArray();
      jgen.writeEndObject();
    }

    public List<Object> getPayload() { return payload; }

    public String getTheClass() {
      return theClass;
    }
    public void setTheClass(String c) {
      theClass = c;
    }

    public String getTheStyle() {
      return theStyle;
    }
    public void setTheStyle(String s) {
      theStyle = s;
    }
    public int getWidth() {
      return w;
    }
    public void setWidth(int _w) {
      w = _w;
    }

    public void addItem(Object o) throws Exception {
      if ( o instanceof dashColumn )
        throw new Exception("ERROR: cannot add a column inside a column");
      payload.add(o);
    }
  }

  public final List<dashRow> content;

  public BeakerDashboard() {
    content = new ArrayList<dashRow>();
  }

  public String getTheStyle() { return theStyle; }
  public String getTheClass() { return theClass; }
  public void setTheStyle(String s) { theStyle = s; }
  public void setTheClass(String s) { theClass = s; }

  public List<dashRow> getRows() { return content; }

  public void addRow(dashRow o) {
    content.add(o);
  }

  public dashRow newRow() { return new dashRow(); }
  public dashColumn newColumn(int w) { return new dashColumn(w); }

  public void clear() { content.clear();}

  public void redraw() { setChanged(); notifyObservers(); }

  public static class Serializer extends JsonSerializer<BeakerDashboard> {
    private final Provider<UpdateManager> updateManagerProvider;
    private final Provider<BeakerObjectConverter> objectSerializerProvider;

    @Inject
    private Serializer(Provider<UpdateManager> ump, Provider<BeakerObjectConverter> osp) {
      this.updateManagerProvider = ump;
      this.objectSerializerProvider = osp;
    }

    private UpdateManager getUpdateManager() {
      return this.updateManagerProvider.get();
    }

    private BeakerObjectConverter getObjectSerializer() {
      return objectSerializerProvider.get();
    }

    @Override
    public void serialize(BeakerDashboard value, JsonGenerator jgen, SerializerProvider provider)
        throws IOException, JsonProcessingException
    {
      UpdateManager um = getUpdateManager();
      synchronized(value) {
        String id = um.register(value);
        jgen.writeStartObject();
        jgen.writeObjectField("update_id", id);
        jgen.writeObjectField("update_time", System.currentTimeMillis());
        jgen.writeObjectField("type", value.getClass().getSimpleName());

        if (value.getTheStyle()!=null) jgen.writeStringField("thestyle", value.getTheStyle());
        if (value.getTheClass()!=null) jgen.writeStringField("theclass", value.getTheClass());

        jgen.writeArrayFieldStart("rows");
        for (dashRow r : value.getRows())
          r.serialize(jgen,getObjectSerializer());
        jgen.writeEndArray();
        jgen.writeEndObject();
      }
    }
  }

}
