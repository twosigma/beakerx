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
import com.twosigma.beaker.core.module.elfinder.service.FsItemFilter;
import com.twosigma.beaker.core.module.elfinder.service.FsSecurityChecker;
import com.twosigma.beaker.core.module.elfinder.service.FsService;
import com.twosigma.beaker.core.module.elfinder.service.FsServiceConfig;
import com.twosigma.beaker.core.module.elfinder.service.FsVolume;
import org.apache.commons.codec.binary.Base64;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.logging.Logger;

public class DefaultFsService implements FsService {

  private FsSecurityChecker securityChecker;
  private FsServiceConfig   serviceConfig;
  private Map<String, FsVolume> volumeMap = new HashMap<>();

  // special characters should be encoded, avoid to be processed as a part of
  // URL
  String[][] escapes = {{"+", "_P"}, {"-", "_M"}, {"/", "_S"},
                        {".", "_D"}, {"=", "_E"}};

  @Override
  /**
   * find files by name pattern, this provides a simple recursively iteration based method
   * lucene engines can be introduced to improve it!
   * This searches across all volumes.
   *
   * @param filter The filter to apply to select files.
   * @return A collection of files that match  the filter and gave the root as a parent.
   */
  public FsItemEx[] find(FsItemFilter filter) {
    List<FsItemEx> results = new ArrayList<FsItemEx>();
    for (FsVolume vol : volumeMap.values()) {
      FsItem root = vol.getRoot();
      results.addAll(findRecursively(filter, root));
    }

    return results.toArray(new FsItemEx[results.size()]);
  }

  /**
   * find files recursively in specific folder
   *
   * @param filter The filter to apply to select files.
   * @param root   The location in the hierarchy to search from.
   * @return A collection of files that match the filter and have the root as
   * a parent.
   */
  private Collection<FsItemEx> findRecursively(FsItemFilter filter,
                                               FsItem root) {
    List<FsItemEx> results = new ArrayList<FsItemEx>();
    FsVolume       vol     = root.getVolume();
    for (FsItem child : vol.listChildren(root)) {
      if (vol.isFolder(child)) {
        results.addAll(findRecursively(filter, child));
      } else {
        FsItemEx item = new FsItemEx(child, this);
        if (filter.accepts(item))
          results.add(item);
      }
    }

    return results;
  }

  @Override
  public FsItem fromHash(String hash) {
    for (FsVolume v : volumeMap.values()) {
      String prefix = getVolumeId(v) + "_";

      if (hash.equals(prefix)) {
        return v.getRoot();
      }

      if (hash.startsWith(prefix)) {
        String localHash = hash.substring(prefix.length());

        for (String[] pair : escapes) {
          localHash = localHash.replace(pair[1], pair[0]);
        }

        String relativePath = new String(Base64.decodeBase64(localHash));
        return v.fromPath(relativePath);
      }
    }

    return null;
  }

  @Override
  public String getHash(FsItem item) throws IOException {
    String relativePath = item.getVolume().getPath(item);
    String base         = new String(Base64.encodeBase64(relativePath.getBytes()));

    for (String[] pair : escapes) {
      base = base.replace(pair[0], pair[1]);
    }

    return getVolumeId(item.getVolume()) + "_" + base;
  }

  public FsSecurityChecker getSecurityChecker() {
    return securityChecker;
  }

  public FsServiceConfig getServiceConfig() {
    return serviceConfig;
  }

  @Override
  public String getVolumeId(FsVolume volume) {
    for (Entry<String, FsVolume> en : volumeMap.entrySet()) {
      if (en.getValue() == volume)
        return en.getKey();
    }

    return null;
  }

  public Map<String, FsVolume> getVolumeMap() {
    return volumeMap;
  }

  public FsVolume[] getVolumes() {
    Collection<FsVolume> values = volumeMap.values();
    return values.toArray(new FsVolume[values.size()]);
  }

  public void setSecurityChecker(FsSecurityChecker securityChecker) {
    this.securityChecker = securityChecker;
  }

  public void setServiceConfig(FsServiceConfig serviceConfig) {
    this.serviceConfig = serviceConfig;
  }

  public void setVolumeMap(Map<String, FsVolume> volumeMap) {
    for (Entry<String, FsVolume> en : volumeMap.entrySet()) {
      addVolume(en.getKey(), en.getValue());
    }
  }

  /**
   * @param volumes The volumes available.
   * @throws IOException If there is a problem with using one of the volumes.
   * @deprecated {@link #setVolumeMap(Map)}
   */
  public void setVolumes(FsVolume[] volumes) throws IOException {
    Logger.getLogger(this.getClass().getName()).warning(
      "calling setVolumes() is deprecated, please use setVolumeMap() to specify volume id explicitly");
    char vid = 'A';
    for (FsVolume volume : volumes) {
      volumeMap.put("" + vid, volume);
      Logger.getLogger(this.getClass().getName()).info(
        String.format("mounted %s: %s", "" + vid, volume));
      vid++;
    }
  }

  public void addVolume(String name, FsVolume fsVolume) {
    volumeMap.put(name, fsVolume);
    Logger.getLogger(this.getClass().getName()).info(
      String.format("mounted %s: %s", name, fsVolume));
  }
}
