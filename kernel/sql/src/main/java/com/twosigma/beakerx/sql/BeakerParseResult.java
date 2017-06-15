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
package com.twosigma.beakerx.sql;

import java.util.ArrayList;
import java.util.List;

public class BeakerParseResult {
  boolean selectInto;
  String resultQuery;
  String selectIntoVar;
  List<BeakerInputVar> inputVars = new ArrayList<>();

  public BeakerParseResult(String resultQuery) {
    this.resultQuery = resultQuery;
  }

  public String getResultQuery() {
    return resultQuery;
  }

  public void setResultQuery(String resultQuery) {
    this.resultQuery = resultQuery;
  }

  public String getSelectIntoVar() {
    return selectIntoVar;
  }

  public void setSelectIntoVar(String selectIntoVar) {
    this.selectIntoVar = selectIntoVar;
  }

  public boolean isSelectInto() {
    return selectInto;
  }

  public void setSelectInto(boolean selectInto) {
    this.selectInto = selectInto;
  }

  public List<BeakerInputVar> getInputVars() {
    return inputVars;
  }

  public void setInputVars(List<BeakerInputVar> inputVars) {
    this.inputVars = inputVars;
  }
}
