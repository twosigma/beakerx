/*
 *  Copyright 2015 TWO SIGMA OPEN SOURCE, LLC
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

package com.twosigma.beaker.easyform.formitem;

import com.twosigma.beaker.easyform.EasyFormComponent;

import java.util.Collection;

public class CheckBoxGroup extends EasyFormComponent {
  private Boolean horizontal;
  private Collection<String> values;

  public Boolean getHorizontal() {
    return horizontal;
  }

  public void setHorizontal(final Boolean horizontal) {
    this.horizontal = horizontal;
  }

  public Collection<String> getValues() {
    return values;
  }

  public void setValues(final Collection<String> values) {
    this.values = values;
  }
}
