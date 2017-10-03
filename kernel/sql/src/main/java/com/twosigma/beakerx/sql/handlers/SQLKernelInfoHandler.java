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
package com.twosigma.beakerx.sql.handlers;

import com.twosigma.beakerx.BeakerImplementationInfo;
import com.twosigma.beakerx.KernelInfoHandler;
import com.twosigma.beakerx.kernel.KernelFunctionality;

import java.io.Serializable;
import java.util.HashMap;

public class SQLKernelInfoHandler extends KernelInfoHandler {

  public SQLKernelInfoHandler(KernelFunctionality kernel) {
    super(kernel);
  }

  @Override
  protected HashMap<String, Serializable> doLanguageInfo(HashMap<String, Serializable> languageInfo) {
    languageInfo.put("name", "SQL");
    languageInfo.put("version", "");
    languageInfo.put("mimetype", "");
    languageInfo.put("file_extension", ".sql");
    languageInfo.put("codemirror_mode", "sql");
    languageInfo.put("nbconverter_exporter", "");
    return languageInfo;
  }

  @Override
  protected HashMap<String, Serializable> doContent(HashMap<String, Serializable> content) {
    content.put("implementation", "sql");
    content.put("banner", String.format(BeakerImplementationInfo.IMPLEMENTATION_VERSION, "SQL", ""));
    return content;
  }

}
