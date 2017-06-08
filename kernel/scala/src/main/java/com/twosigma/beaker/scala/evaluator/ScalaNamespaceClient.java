/*
 *  Copyright 2017 TWO SIGMA OPEN SOURCE, LLC
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
package com.twosigma.beaker.scala.evaluator;

import com.twosigma.beaker.NamespaceClient;


public class ScalaNamespaceClient  {

  public synchronized static NamespaceClient getBeaker(String session) {
    NamespaceClient beaker = NamespaceClient.getBeaker(session);
    beaker.setClientJsonMapper(new NamespaceClient.ClientJsonMapper() {
      @Override
      public String getJson(Object value) {
        return ScalaJsonMapper.toJson(value);
      }

      @Override
      public Object fromJson(String value) {
        return ScalaJsonMapper.fromJson(value);
      }
    });
    return beaker;
  }



}
