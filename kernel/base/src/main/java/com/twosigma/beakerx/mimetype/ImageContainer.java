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
package com.twosigma.beakerx.mimetype;


import java.util.Base64;

public class ImageContainer extends MIMEContainer {

  public ImageContainer(String mime, String code) {
    super(mime, code);
  }

  public static MIMEContainer Image(Object data) throws Exception {
    byte[] image;
    if (data instanceof String) {
      image = getBytes(data);
    } else {
      image = (byte[]) data;
    }
    return addMimeType(isJPEG(image) ? MIME.IMAGE_JPEG : MIME.IMAGE_PNG, Base64.getEncoder().encodeToString(image));
  }

  private static boolean isJPEG(byte[] image) {
    int i = 0;
    if ((image[i] & 0xFF) == 0xFF && (image[i + 1] & 0xFF) == 0xD8 && (image[image.length - 2] & 0xFF) == 0xFF
        && (image[image.length - 1] & 0xFF) == 0xD9) {
      return true;
    }
    if ((image[i] & 0x89) == 0x89 && (image[i + 1] & 0x50) == 0x50 && (image[i + 2] & 0x4e) == 0x4e
        && (image[i + 3] & 0x47) == 0x47) {
      return false;
    }
    return false;
  }
}
