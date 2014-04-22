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
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

public class ROutputHandler extends Thread {

  private final InputStream stream;
  private String captured;
  private boolean recording;
  private SimpleEvaluationObject dest;
  private final String beginMagic;
  private final String endMagic;

  public ROutputHandler(InputStream stream, String beginMagic, String endMagic) {
    this.stream = stream;
    this.recording = false;
    this.captured = null;
    this.beginMagic = beginMagic;
    this.endMagic = endMagic;
  }

  public void reset(SimpleEvaluationObject dest) {
    this.dest = dest;
  }

  @Override
  public void run() {

    try (BufferedReader br = new BufferedReader(new InputStreamReader(this.stream))) {
      String line = null;
      while ((line = br.readLine()) != null) {
        if (line.indexOf(this.beginMagic) >= 0) {
          this.recording = true;
        } else if (line.indexOf(this.endMagic) >= 0) {
          this.dest.finished(this.captured);
          this.dest = null;
          this.captured = null;
          this.recording = false;
        } else if (this.recording) {
          if (null == this.captured) {
            this.captured = line;
          } else {
            this.captured = this.captured + "\n" + line;
          }
        } else {
          System.out.println(line);
        }
      }
    } catch (IOException ioe) {
      ioe.printStackTrace();
    }
  }
}
