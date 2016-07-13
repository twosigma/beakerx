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
package com.twosigma.beaker.r.module;

/*
 * Watch the output of the R process and capture the part between
 * magic patterns and pass that back as results to a
 * SimpleEvaluationObject, otherwise just pass it on as output.
 */
import com.twosigma.beaker.jvm.object.SimpleEvaluationObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.concurrent.Semaphore;

public class ROutputHandler extends Thread {

  private final InputStream stream;
  private String captured;
  private boolean recording;
  private SimpleEvaluationObject dest;
  private final String beginMagic;
  private final String endMagic;
  private final static Logger logger = LoggerFactory.getLogger(ROutputHandler.class.getName());
  private final Semaphore capsem = new Semaphore(0);
  
  public ROutputHandler(InputStream stream, String beginMagic, String endMagic) {
    this.stream = stream;
    this.recording = false;
    this.captured = null;
    this.beginMagic = beginMagic;
    this.endMagic = endMagic;
  }

  public void reset(SimpleEvaluationObject dest) {
    this.dest     = dest;
    this.captured = null;
  }

  public String getCaptured() {
    return this.captured;
  }
  
  public void waitForCapture() {
    try {
      capsem.acquire();
    } catch (InterruptedException e) {
    }
  }
  
  @Override
  public void run() {

    try (BufferedReader br = new BufferedReader(new InputStreamReader(this.stream, "UTF-8"))) {
      String line = null;
      while ((line = br.readLine()) != null) {
        if (line.indexOf(this.beginMagic) >= 0) {
          logger.debug("begin capturing");
          this.recording = true;
        } else if ((line.indexOf(this.endMagic) >= 0) && this.dest!=null) {        
          logger.debug("end capturing: '"+this.captured+"'");
          this.recording = false;
          capsem.release();
        } else if (this.recording) {
          if (null == this.captured) {
            this.captured = line;
          } else {
            this.captured = this.captured + "\n" + line;
          }
        } else if (this.dest!= null) {
          this.dest.appendOutput(line+"\n");
        } else  if(!line.isEmpty()) {
          logger.info("Output line not captured: '"+line+"'");
        }
      }
    } catch (IOException ioe) {
    }
    capsem.release();
  }
}
