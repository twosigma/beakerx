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
package com.beaker;

public class BeakerXClasspathTest {

  public static final String staticTest = "static_123";
  public String objectTest = "object_123";

  public BeakerXClasspathTest() {
  }

  public static void main(String[] args) {
    BeakerXClasspathTest t = new BeakerXClasspathTest();
    System.out.println(t.getObjectTest());
  }

  public String getObjectTest() {
    return this.objectTest;
  }

  public void setObjectTest(String objectTest) {
    this.objectTest = objectTest;
  }
}
