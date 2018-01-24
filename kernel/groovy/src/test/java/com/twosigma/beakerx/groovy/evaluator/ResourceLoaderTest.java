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
package com.twosigma.beakerx.groovy.evaluator;

import com.twosigma.beakerx.fileloader.CSV;

import java.net.URI;
import java.util.List;
import java.util.Map;

public class ResourceLoaderTest {

  private static final boolean IS_WINDOWS = System.getProperty("os.name").contains("indow");

  public static List<Map<String, Object>> readAsList(String fileName) throws Exception {
    return new CSV().read(ResourceLoaderTest.getOsAppropriatePath(fileName, ResourceLoaderTest.class));
  }

  public static String getOsAppropriatePath(String fileName, Class clazz) throws Exception {
    URI uriToFile = clazz.getClassLoader().getResource(fileName).toURI();
    return IS_WINDOWS
            ? uriToFile.getSchemeSpecificPart().substring(1)
            : uriToFile.getSchemeSpecificPart();
  }

}
