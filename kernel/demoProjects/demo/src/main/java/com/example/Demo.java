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
package com.example;

public class Demo {
  public static final String OBJECT_TEST_123 = "Demo_test_123";
  public static final String STATIC_TEST_123 = "Demo_static_test_123";

  public Demo() {
  }

  public static String staticTest() {
    return "Demo_static_test_123";
  }

  public String getObjectTest() {
    return "Demo_test_123";
  }
}