/*
 *  Copyright 2018 TWO SIGMA OPEN SOURCE, LLC
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
package com.twosigma.beakerx.util;

import org.junit.Test;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;

import static com.twosigma.beakerx.fileloader.CSVTest.getOsAppropriatePath;
import static org.junit.Assert.assertArrayEquals;

/**
 * Tests {@link Images}.
 */
public class ImagesTest {

  @Test
  public void testRoundTrip() throws Exception {
    //given
    String osAppropriatePath = getOsAppropriatePath(getClass().getClassLoader(), "widgetArch.png");
    BufferedImage widget = ImageIO.read(new File(osAppropriatePath));
    byte[] encode = Images.encode(widget);
    //when
    BufferedImage decode = Images.decode(encode);
    byte[] reencoded = Images.encode(decode);
    //then
    assertArrayEquals(encode, reencoded);
  }
}
