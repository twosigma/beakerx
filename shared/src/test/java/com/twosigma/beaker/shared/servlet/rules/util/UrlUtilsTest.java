/*
 *  Copyright 2016 TWO SIGMA OPEN SOURCE, LLC
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

package com.twosigma.beaker.shared.servlet.rules.util;

import org.junit.Test;

import static com.twosigma.beaker.shared.servlet.rules.util.UrlUtils.getPath;
import static com.twosigma.beaker.shared.servlet.rules.util.UrlUtils.replacePort;
import static org.junit.Assert.assertEquals;

public class UrlUtilsTest {

  @Test
  public void testGetPath() {
    assertEquals("", getPath("http://test.com"));
    assertEquals("/", getPath("http://test.com/"));
    assertEquals("/path/page.extension", getPath("http://test.com/path/page.extension"));
    assertEquals("/path/page.extension", getPath("www.test.com/path/page.extension"));
  }

  @Test
  public void testReplacePort() {
    assertEquals("http://google.com:80/hello", replacePort("http://google.com/hello", 80));
    assertEquals("wss://127.0.0.1:8802/hello", replacePort("wss://127.0.0.1:8800/hello", 8802));
    assertEquals("ws://127.0.0.1:8802/hello", replacePort("ws://127.0.0.1/hello", 8802));
  }
}
