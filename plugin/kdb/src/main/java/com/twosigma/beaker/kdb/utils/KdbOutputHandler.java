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
package com.twosigma.beaker.kdb.utils;

import com.twosigma.beaker.jvm.object.SimpleEvaluationObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.logging.Logger;

public class KdbOutputHandler extends Thread {

  private final InputStream stream;
  private SimpleEvaluationObject dest;
  private final static Logger logger = Logger.getLogger(KdbOutputHandler.class.getName());
  
  public KdbOutputHandler(InputStream stream) {
    this.stream = stream;
  }

  public void reset(SimpleEvaluationObject dest) {
    this.dest = dest;
  }
  
  @Override
  public void run() {

    try (BufferedReader br = new BufferedReader(new InputStreamReader(this.stream, "UTF-8"))) {
      String line = null;
      while ((line = br.readLine()) != null) {
        if (this.dest!= null) {
          this.dest.appendOutput(line+"\n");
        } else  if(!line.isEmpty()) {
          logger.info("Output line not captured: '"+line+"'");
        }
      }
    } catch (IOException ioe) {
    }
  }
}
