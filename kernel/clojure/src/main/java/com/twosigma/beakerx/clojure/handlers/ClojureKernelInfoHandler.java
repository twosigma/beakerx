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
package com.twosigma.beakerx.clojure.handlers;

import clojure.java.api.Clojure;
import clojure.lang.IFn;
import com.twosigma.beakerx.BeakerImplementationInfo;
import com.twosigma.beakerx.KernelInfoHandler;
import com.twosigma.beakerx.kernel.KernelFunctionality;

import java.io.Serializable;
import java.util.HashMap;

public class ClojureKernelInfoHandler extends KernelInfoHandler {

  public static final String CLOJURE_VERSION = getVersion();

  public ClojureKernelInfoHandler(KernelFunctionality kernel) {
    super(kernel);
  }

  @Override
  protected HashMap<String, Serializable> doLanguageInfo(HashMap<String, Serializable> languageInfo) {
    languageInfo.put("name", "Clojure");
    languageInfo.put("version", CLOJURE_VERSION);
    languageInfo.put("mimetype", "text/x-clojure");
    languageInfo.put("file_extension", ".clj");
    languageInfo.put("codemirror_mode", "Clojure");
    languageInfo.put("nbconverter_exporter", "");
    return languageInfo;
  }

  @Override
  protected HashMap<String, Serializable> doContent(HashMap<String, Serializable> content) {
    content.put("implementation", "clojure");
    content.put("banner", String.format(BeakerImplementationInfo.IMPLEMENTATION_VERSION, "Clojure", CLOJURE_VERSION));
    return content;
  }

  private static String getVersion() {
    IFn println = Clojure.var("clojure.core", "clojure-version");
    return (String) println.invoke();
  }
}
