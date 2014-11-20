package com.twosigma.beaker;

import java.io.IOException;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.JsonSerializer;
import org.codehaus.jackson.map.SerializerProvider;

public class BeakerProgressUpdate {

  public final String message;
  public final int progressBar;
  
  public BeakerProgressUpdate()
  {
    message = "";
    progressBar = -1;
  }

  public BeakerProgressUpdate(String m)
  {
    message = m;
    progressBar = -1;
  }

  public BeakerProgressUpdate(int pb)
  {
    message = "";
    progressBar = pb>=0 && pb<=100 ? pb : pb%100;
  }

  public BeakerProgressUpdate(String m, int pb)
  {
    message = m;
    progressBar = pb>=0 && pb<=100 ? pb : pb%100;
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
        jgen.writeEndObject();
      }
    }
  }

}
