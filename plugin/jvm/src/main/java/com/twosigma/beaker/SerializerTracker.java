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

package com.twosigma.beaker;

import java.util.HashSet;

public class SerializerTracker {
  static HashSet<Object> set;
  static public void add(Object o) {
    synchronized (o) {
      set.add(o);
    }
  }
  static public void remove(Object o) {
    synchronized (o) {
      set.remove(o);
    }
  }
  static public boolean contains(Object o) {
    synchronized (o) {
      return set.contains(o);
    }
  }
  static {
    set = new HashSet<>();
  }
}
