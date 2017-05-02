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
package com.twosigma.beaker.chart;

public abstract class ItemLabelBuilder {

  public Object call(Object value) {
    return null;
  }

  public Object call(Object value, Object base) {
    return null;
  }

  public Object call(Object value, Object base, Object series) {
    return null;
  }

  public Object call(Object value, Object base, Object series, Object category) {
    return null;
  }

  public Object call(Object value, Object base, Object series, Object category, Object row) {
    return null;
  }

  public Object call(Object value,
                     Object base,
                     Object series,
                     Object category,
                     Object row,
                     Object column) {
    return null;
  }

  public abstract int getMaximumNumberOfParameters();
}


