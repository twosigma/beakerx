/*
 *  Copyright 2014 TWO SIGMA OPEN SOURCE, LLC
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
package com.twosigma.beaker.core.module.elfinder.impl;

import com.twosigma.beaker.core.module.elfinder.service.FsService;
import com.twosigma.beaker.core.module.elfinder.service.FsServiceFactory;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;


public class StaticFsServiceFactory implements FsServiceFactory {
  private FsService fsService;

  @Override
  public FsService getFileService(HttpServletRequest request, ServletContext servletContext) {
    return fsService;
  }

  public FsService getFsService() {
    return fsService;
  }

  public void setFsService(FsService fsService) {
    this.fsService = fsService;
  }
}
