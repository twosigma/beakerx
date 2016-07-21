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

import java.net.URI;
import java.net.URISyntaxException;

import static org.apache.commons.lang3.StringUtils.EMPTY;

public class UrlUtils {
  public static String getPath(String url) {
    String urlWithoutSchema = url.replaceFirst("https?\\:\\/\\/", "");
    int endOfDomain = urlWithoutSchema.indexOf("/");
    if (endOfDomain >= 0) {
      return urlWithoutSchema.substring(endOfDomain);
    }
    return EMPTY;
  }

  public static String replacePort(String url, int port) {
    try {
      return setUriPort(new URI(url), port).toString();
    } catch (URISyntaxException e) {
      e.printStackTrace();
      return url;
    }
  }

  private static URI setUriPort(URI uri, int port)
  {
    try {
      URI newUri = new URI(uri.getScheme(), uri.getUserInfo(), uri.getHost(), port, uri.getPath(), uri.getQuery(), uri.getFragment());
      return newUri;
    } catch (URISyntaxException e) {
      e.printStackTrace();
      return uri;
    }
  }
}
