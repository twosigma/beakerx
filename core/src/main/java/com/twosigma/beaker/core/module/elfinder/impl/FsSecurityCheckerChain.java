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

import com.twosigma.beaker.core.module.elfinder.service.FsItem;
import com.twosigma.beaker.core.module.elfinder.service.FsSecurityChecker;
import com.twosigma.beaker.core.module.elfinder.service.FsService;

import java.io.IOException;
import java.util.List;

public class FsSecurityCheckerChain implements FsSecurityChecker {
  private static final FsSecurityChecker DEFAULT_SECURITY_CHECKER = new FsSecurityCheckForAll();

  private List<FsSecurityCheckFilterMapping> filterMappings;

  private FsSecurityChecker getChecker(FsService fsService, FsItem fsi) throws IOException {
    String hash = fsService.getHash(fsi);
    for (FsSecurityCheckFilterMapping mapping : filterMappings) {
      if (mapping.matches(hash)) {
        return mapping.getChecker();
      }
    }

    return DEFAULT_SECURITY_CHECKER;
  }

  public List<FsSecurityCheckFilterMapping> getFilterMappings() {
    return filterMappings;
  }

  @Override
  public boolean isLocked(FsService fsService, FsItem fsi) throws IOException {
    return getChecker(fsService, fsi).isLocked(fsService, fsi);
  }

  @Override
  public boolean isReadable(FsService fsService, FsItem fsi) throws IOException {
    return getChecker(fsService, fsi).isReadable(fsService, fsi);
  }

  @Override
  public boolean isWritable(FsService fsService, FsItem fsi) throws IOException {
    return getChecker(fsService, fsi).isWritable(fsService, fsi);
  }

  public void setFilterMappings(List<FsSecurityCheckFilterMapping> filterMappings) {
    this.filterMappings = filterMappings;
  }
}
