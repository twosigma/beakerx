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

package com.twosigma.beaker;

import java.io.IOException;

import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.JsonSerializer;
import org.codehaus.jackson.map.SerializerProvider;

public class BeakerProgressUpdate {

  public final String message;
  public final int progressBar;
  public final Object payload;
  
  public BeakerProgressUpdate()
  {
    message = "";
    progressBar = -1;
    payload = null;
  }

  public BeakerProgressUpdate(String m)
  {
    message = m;
    progressBar = -1;
    payload = null;
  }

  public BeakerProgressUpdate(int pb)
  {
    message = "";
    progressBar = pb>=0 && pb<=100 ? pb : pb%100;
    payload = null;
  }

  public BeakerProgressUpdate(String m, int pb)
  {
    message = m;
    progressBar = pb>=0 && pb<=100 ? pb : pb%100;
    payload = null;
  }

  public BeakerProgressUpdate(Object p)
  {
    message = "";
    progressBar = -1;
    payload = p;
  }

  public BeakerProgressUpdate(String m, Object p)
  {
    message = m;
    progressBar = -1;
    payload = p;
  }

  public BeakerProgressUpdate(int pb, Object p)
  {
    message = "";
    progressBar = pb>=0 && pb<=100 ? pb : pb%100;
    payload = p;
  }

  public BeakerProgressUpdate(String m, int pb, Object p)
  {
    message = m;
    progressBar = pb>=0 && pb<=100 ? pb : pb%100;
    payload = p;
  }

  public static class Serializer extends JsonSerializer<BeakerProgressUpdate> {

    @Override
    public void serialize(BeakerProgressUpdate value,
        JsonGenerator jgen,
        SerializerProvider provider)
        throws IOException, JsonProcessingException {

      synchronized (value) {
        jgen.writeStartObject();
        jgen.writeObjectField("message", value.message);
        jgen.writeObjectField("progressBar", value.progressBar);
        if (value.payload!=null) {
          try {
            jgen.writeObjectField("payload", value.payload);
          } catch(Throwable e) {
            jgen.writeObjectField("payload", value.payload.toString());
          }
        }
        jgen.writeEndObject();
      }
    }
  }

}
