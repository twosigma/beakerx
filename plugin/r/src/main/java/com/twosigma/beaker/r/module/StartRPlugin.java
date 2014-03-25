/*
 *  Copyright 2014 TWO SIGMA INVESTMENTS, LLC
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
package com.twosigma.beaker.r.module;

import com.twosigma.beaker.r.rest.RShellRest;
import com.google.inject.Injector;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.List;
import java.util.ArrayList;
import java.util.Map.Entry;
import org.apache.http.client.fluent.Request;
import org.apache.http.client.ClientProtocolException;

/*
 * Find and Start the Rserver, and begin managing its IO.
 */
public class StartRPlugin {

  static int getPortFromCore(int portCore)
    throws IOException, ClientProtocolException
  {
    String response = Request.Get("http://127.0.0.1:" + portCore + "/rest/plugin-services/getAvailablePort")
      .execute().returnContent().asString();
    return Integer.parseInt(response);
  }

  static String writeRserveScript(int port)
    throws IOException
  {
    File temp = File.createTempFile("BeakerRserveScript", ".r");
    String location = temp.getAbsolutePath();
    BufferedWriter bw = new BufferedWriter(new FileWriter(location));
    bw.write("library(Rserve)\n");
    bw.write("run.Rserve(port=" + port + ")\n");
    bw.close();
    return location;
  }

  public static void StartRserve(Injector injector, int portCore)
    throws IOException
  {
    int port = getPortFromCore(portCore);
    String pluginInstallDir = System.getProperty("user.dir");
    String[] command = {
      "Rscript",
      writeRserveScript(port)
    };

    // Need to clear out some environment variables in order for a
    // new Java process to work correctly.
    List<String> environmentList = new ArrayList<>();
    for (Entry<String, String> entry : System.getenv().entrySet()) {
      if (!("CLASSPATH".equals(entry.getKey()))) {
        environmentList.add(entry.getKey() + "=" + entry.getValue());
      }
    }
    String[] environmentArray = new String[environmentList.size()];
    environmentList.toArray(environmentArray);

    Process rServe = Runtime.getRuntime().exec(command, environmentArray);
    BufferedReader rServeOutput = new BufferedReader(new InputStreamReader(rServe.getInputStream()));
    String line = null;
    while ((line = rServeOutput.readLine()) != null) {
      if (line.indexOf("(This session will block until Rserve is shut down)") >= 0) {
        break;
      } else {
        System.out.println("Rserve>" + line);
      }
    }
    ErrorGobbler errorGobbler = new ErrorGobbler(rServe.getErrorStream());
    errorGobbler.start();

    RShellRest rrest = injector.getInstance(RShellRest.class);
    rrest.setOutput(rServe.getInputStream());
    rrest.setPort(port);
  }
}
