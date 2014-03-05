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

import com.google.inject.Injector;
import com.twosigma.beaker.shared.module.config.BeakerConfig;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.List;
import java.util.ArrayList;
import java.util.Map.Entry;

/*
 * Find and Start the Rserver, and begin managing its IO.
 */
public class StartRPlugin {

  public static void StartRserve(Injector injector)
          throws IOException {

    String beakerCoreDir = injector.getInstance(BeakerConfig.class).getInstallDirectory();

    String[] command = {
      "Rscript",
      beakerCoreDir + "/src/main/r/Rserve"
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
  }
}
