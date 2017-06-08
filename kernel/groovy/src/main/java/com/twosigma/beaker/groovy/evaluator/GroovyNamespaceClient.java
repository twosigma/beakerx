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
package com.twosigma.beaker.groovy.evaluator;

import com.twosigma.beaker.NamespaceClient;

public class GroovyNamespaceClient {

  private NamespaceClient namespaceClient;

  public GroovyNamespaceClient(NamespaceClient namespaceClient) {
    this.namespaceClient = namespaceClient;
  }

  public Object get(final String name) {
    return this.namespaceClient.fromJson(this.namespaceClient.get(name));
  }

  public Object set(String name, Object value) {
    return this.namespaceClient.set(name, this.namespaceClient.getJson(value));
  }

  public synchronized void showProgressUpdate(String message, int progress) {
    this.namespaceClient.showProgressUpdate(message, progress);
  }

}
