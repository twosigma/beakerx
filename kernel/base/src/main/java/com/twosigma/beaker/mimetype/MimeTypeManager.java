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
package com.twosigma.beaker.mimetype;

import java.util.HashMap;
import java.util.Map;

public class MimeTypeManager {
  public static final String TEXT_PLAIN = "text/plain";
  public static final String TEXT_HTML = "text/html";
  public static final String TEXT_LATEX = "text/latex";

  public static Map<String, String> HTML(String code) {
    return addMimeType(TEXT_HTML, code);
  }

  public static Map<String, String> Latex(String code) {
    return addMimeType(TEXT_LATEX, code);
  }

  public static Map<String, String> Text(String code) {
    return addMimeType(TEXT_PLAIN, code);
  }

  public static Map<String, String> addMimeType(String mime, String code) {
    Map<String, String> mimeToData = new HashMap<>();
    mimeToData.put(mime, code);
    return mimeToData;
  }

}
