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

package com.twosigma.beakerx.jvm.classloader;

import org.assertj.core.api.Assertions;
import org.junit.Before;
import org.junit.Test;

import java.io.InputStream;
import java.net.URL;
import java.util.Enumeration;

public class DynamicClassLoaderSimpleTest {

  private DynamicClassLoaderSimple loader;
  private static String className =
      "com.twosigma.beakerx.jvm.classloader.DynamicClassLoaderSimpleTest";
  private static String fileName =
      "com/twosigma/beakerx/jvm/classloader/DynamicClassLoaderSimpleTest.class";

  @Before
  public void setUp() throws Exception {
    loader = new DynamicClassLoaderSimple(DynamicClassLoaderSimpleTest.class.getClassLoader());
  }

  @Test
  public void loadClassWithNameParam_returnClass() throws Exception {
    //when
    Class clazz = loader.loadClass(className);
    //then
    Assertions.assertThat(clazz).isNotNull();
  }

  @Test
  public void getResourceWithNameParam_returnURL() throws Exception {
    //when
    URL url = loader.getResource(fileName);
    //then
    Assertions.assertThat(url).isNotNull();
  }

  @Test
  public void getResourceAsStreamWithNameParam_returnInputStream() throws Exception {
    //when
    InputStream is = loader.getResourceAsStream(fileName);
    //then
    Assertions.assertThat(is).isNotNull();
  }

  @Test
  public void getResourcesWithNameParam_returnURLs() throws Exception {
    //when
    Enumeration<URL> urls = loader.getResources(fileName);
    //then
    Assertions.assertThat(urls).isNotNull();
  }

}
