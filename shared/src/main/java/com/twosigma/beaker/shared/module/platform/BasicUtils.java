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
package com.twosigma.beaker.shared.module.platform;

import com.google.inject.Singleton;
import java.io.IOException;

/**
 * BasicUtils
 *
 */
@Singleton
public class BasicUtils {

  public void openUrl(String url) {
    boolean onMac = System.getProperty("os.name").equals("Mac OS X");
    String[] cmd = {onMac ? "open" : "xdg-open", url};
    try {
      Runtime.getRuntime().exec(cmd);
    } catch (IOException e) {
      System.err.println("error opening url: " + e);
    }
  }
}
