/*
 *  Copyright 2018 TWO SIGMA OPEN SOURCE, LLC
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
package com.twosigma.beakerx.kernel.comm;

import java.util.ArrayList;
import java.util.List;

import static java.util.Collections.EMPTY_LIST;

public class Buffer {
  public final static Buffer EMPTY = new Buffer(EMPTY_LIST, new ArrayList<>());

  private List<byte[]> buffers;
  private ArrayList<List<String>> bufferPaths;

  public Buffer(List<byte[]> buffers, ArrayList<List<String>> bufferPaths) {
    this.buffers = buffers;
    this.bufferPaths = bufferPaths;
  }

  public List<byte[]> getBuffers() {
    return buffers;
  }

  public ArrayList<List<String>> getBufferPaths() {
    return bufferPaths;
  }

  public boolean isEmpty() {
    return buffers.isEmpty();
  }
}
