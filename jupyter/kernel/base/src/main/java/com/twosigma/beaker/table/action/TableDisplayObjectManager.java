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
package com.twosigma.beaker.table.action;

import com.google.inject.Singleton;
import com.twosigma.beaker.table.ObservableTableDisplay;

import java.util.HashMap;
import java.util.Map;

@Singleton
public class TableDisplayObjectManager {
  /* table id -> table object */
  private final Map<String, ObservableTableDisplay> tables = new HashMap<>();

  public void registerTableDisplay(final String id, final ObservableTableDisplay chart) {
    tables.put(id, chart);
  }

  public ObservableTableDisplay getTableDisplay(final String id) {
    return tables.get(id);
  }

}
