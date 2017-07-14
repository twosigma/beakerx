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
package com.twosigma.beakerx.kotlin.handler;

import static org.jetbrains.kotlin.config.KotlinCompilerVersion.VERSION;

import com.twosigma.beakerx.KernelInfoHandler;
import com.twosigma.beakerx.kernel.KernelFunctionality;

import java.io.Serializable;
import java.util.HashMap;

public class KotlinKernelInfoHandler extends KernelInfoHandler {

  public KotlinKernelInfoHandler(KernelFunctionality kernel) {
    super(kernel);
  }

  @Override
  protected HashMap<String, Serializable> doLanguageInfo(HashMap<String, Serializable> languageInfo) {
    languageInfo.put("name", "Kotlin");
    languageInfo.put("version", VERSION);
    languageInfo.put("mimetype", "");
    languageInfo.put("file_extension", ".kt");
    languageInfo.put("codemirror_mode", "kt");
    languageInfo.put("nbconverter_exporter", "");
    return languageInfo;
  }

  @Override
  protected HashMap<String, Serializable> doContent(HashMap<String, Serializable> content) {
    content.put("implementation", "kotlin");
    content.put("banner", "BeakerX kernel for Kotlin");
    return content;
  }

}
