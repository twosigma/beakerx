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
package com.twosigma.beaker.core.module.elfinder.service;

import com.twosigma.beaker.core.module.elfinder.impl.FsItemEx;

import java.io.IOException;

public interface FsService {
  FsItem fromHash(String hash) throws IOException;

  String getHash(FsItem item) throws IOException;

  FsSecurityChecker getSecurityChecker();

  String getVolumeId(FsVolume volume);

  FsVolume[] getVolumes();

  FsServiceConfig getServiceConfig();

  /**
   * find files by name pattern, this provides a simple recursively iteration based method
   * lucene engines can be introduced to improve it!
   * This searches across all volumes.
   *
   * @param filter The filter to apply to select files.
   * @return A collection of files that match  the filter and gave the root as a parent.
   */
  FsItemEx[] find(FsItemFilter filter);
}