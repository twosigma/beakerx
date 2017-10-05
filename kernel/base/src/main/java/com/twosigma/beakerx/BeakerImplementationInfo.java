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
package com.twosigma.beakerx;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URISyntaxException;
import java.util.stream.Collectors;

public class BeakerImplementationInfo {

  public final static String IMPLEMENTATION_VERSION = info();

  private static String info() {
    try {
      String version = resource("version");
      String hash = resource("hash");
      String build_time = resource("build_time");
      String info = "BeakerX " + version + "\n";
      info += "%s %s\n" ;
      info += "hash " + hash + "\n";
      info += "build time " + build_time;
      return info;
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }

  private static String resource(String name) throws IOException, URISyntaxException {
    InputStream resourceAsStream = BeakerImplementationInfo.class.getClassLoader().getResourceAsStream(name);
    return new BufferedReader(new InputStreamReader(resourceAsStream)).lines().collect(Collectors.joining("\n"));
  }

}
