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

import java.awt.image.BufferedImage;
import java.awt.image.RenderedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

import javax.imageio.ImageIO;

/**
 * Utility methods for working with Java image objects.
 *
 * @see ImageIO
 * @see RenderedImage
 */
public final class Images {

  private Images() {
    // Prevent instantiation of utility class.
  }

  /**
   * Converts the given {@link RenderedImage} into a stream of PNG bytes.
   *
   * @param image The image to convert to a byte stream.
   * @return A stream of bytes in PNG format.
   */
  public static byte[] encode(RenderedImage image) throws IOException {
    return encode(image, "png");
  }

  /**
   * Converts the given {@link RenderedImage} into a stream of bytes.
   *
   * @param image The image to convert to a byte stream.
   * @param format The informal name of the format for the returned bytes; e.g.
   *        "png" or "jpg". See {@link ImageIO#getImageWritersByFormatName(String)}.
   * @return A stream of bytes in the requested format, or null if the
   *         image cannot be converted to the specified format.
   */
  public static byte[] encode(RenderedImage image, String format)
    throws IOException
  {
    ByteArrayOutputStream baos = new ByteArrayOutputStream();
    boolean success = ImageIO.write(image, format, baos);
    return success ? baos.toByteArray() : null;
  }

  /**
   * Converts the given byte array into a {@link BufferedImage}.
   *
   * @param data The bytes to convert to an image.
   * @return A {@link BufferedImage} of the given bytes, or null if an
   *         image cannot be decoded converted to the specified format.
   */
  public static BufferedImage decode(byte[] data)
    throws IOException
  {
    return ImageIO.read(new ByteArrayInputStream(data));
  }

}
