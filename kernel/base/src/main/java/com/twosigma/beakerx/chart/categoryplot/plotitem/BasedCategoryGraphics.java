/*
 * Copyright 2017 TWO SIGMA OPEN SOURCE, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.twosigma.beakerx.chart.categoryplot.plotitem;

import java.util.List;
import java.util.function.Predicate;

public abstract class BasedCategoryGraphics extends CategoryGraphics {
  private Number baseBase = 0.0d;
  private List<Object> bases;

  public void setBase(Number base) {
    this.baseBase = base.floatValue();
  }

  public void setBase(List<Object> base) {
    Predicate<Object> number = o -> o instanceof Number;
    Predicate<Object> listOfNumber = o -> o instanceof List<?> &&
        ((List<?>)o).stream().allMatch(number);
    if (base.stream().allMatch(number.or(listOfNumber))) {
      setBases(base);
    } else {
      throw new IllegalArgumentException("List of bases must consist of Numbers or Lists of Numbers");
    }
  }

  private void setBases(List<Object> bases) {
    this.bases = bases;
  }

  public Number getBase() {
    return this.baseBase;
  }

  public List<Object> getBases() {
    return this.bases;
  }
}
