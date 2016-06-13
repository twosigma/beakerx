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
import com.twosigma.beaker.core.module.elfinder.service.FsService;
import com.twosigma.beaker.core.module.elfinder.service.FsVolume;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

public class FsItemEx implements FsItem {
  private FsItem    f;
  private FsService s;
  private FsVolume  v;

  public FsItemEx(FsItem fsi, FsService fsService) {
    f = fsi;
    v = fsi.getVolume();
    s = fsService;
  }

  public FsItemEx(FsItemEx parent, String name) throws IOException {
    v = parent.v;
    s = parent.s;
    // Directories may already have a trailing slash on them so we make sure
    // we don't double up
    String path = v.getPath(parent.f);
    if (path != null) {
      if (!path.endsWith("/")) {
        path = path + "/";
      }
      path = path + name;
    } else {
      path = name;
    }
    f = v.fromPath(path);
  }

  public FsItemEx createChild(String name) throws IOException {
    return new FsItemEx(this, name);
  }

  public void createFile() throws IOException {
    v.createFile(f);
  }

  public void createFolder() throws IOException {
    v.createFolder(f);
  }

  public void delete() throws IOException {
    if (v.isFolder(f)) {
      v.deleteFolder(f);
    } else {
      v.deleteFile(f);
    }
  }

  public void deleteFile() throws IOException {
    v.deleteFile(f);
  }

  public void deleteFolder() throws IOException {
    v.deleteFolder(f);
  }

  public boolean exists() {
    return v.exists(f);
  }

  public String getHash() throws IOException {
    return s.getHash(f);
  }

  public long getLastModified() {
    return v.getLastModified(f);
  }


  public FsItemEx getParent() {
    return new FsItemEx(v.getParent(f), s);
  }

  public String getPath() throws IOException {
    return v.getPath(f);
  }

  public String getFullPath() throws IOException {
    return v.getFullPath(f);
  }

  public long getSize() throws IOException {
    return v.getSize(f);
  }

  public String getVolumeId() {
    return s.getVolumeId(v);
  }

  public String getVolumnName() {
    return v.getName();
  }

  public boolean hasChildFolder() {
    return v.hasChildFolder(f);
  }

  @Override
  public boolean isFolder() {
    return v.isFolder(f);
  }

  @Override
  public FsVolume getVolume() {
    return v;
  }

  @Override
  public String getName() {
    return v.getName(f);
  }

  @Override
  public String getMimeType() {
    return v.getMimeType(f);
  }

  @Override
  public boolean isHidden() {
    return v.isHidden(f);
  }

  public boolean isLocked(FsItemEx fsi) throws IOException {
    return s.getSecurityChecker().isLocked(s, f);
  }



  public boolean isReadable(FsItemEx fsi) throws IOException {
    return s.getSecurityChecker().isReadable(s, f);
  }

  public boolean isRoot() {
    return v.isRoot(f);
  }

  public boolean isWritable(FsItemEx fsi) throws IOException {
    return s.getSecurityChecker().isWritable(s, f);
  }

  public List<FsItemEx> listChildren() {
    List<FsItemEx> list = new ArrayList<FsItemEx>();
    for (FsItem child : v.listChildren(f)) {
      list.add(new FsItemEx(child, s));
    }
    return list;
  }

  public InputStream openInputStream() throws IOException {
    return v.openInputStream(f);
  }

  public void writeStream(InputStream is) throws IOException {
    v.writeStream(f, is);
  }

  public void renameTo(FsItemEx dst) throws IOException {
    v.rename(f, dst.f);
  }

  public List<FsItemEx> listChildren(FsItemFilter filter) {
    List<FsItemEx> list = new ArrayList<>();
    for (FsItem child : v.listChildren(f)) {
      FsItemEx childEx = new FsItemEx(child, s);
      if (filter.accepts(childEx)) {
        list.add(childEx);
      }
    }
    return list;
  }

  public String getURL() {
    return v.getURL(f);
  }

  public String getCssCls() {return  isRoot() ? v.getCssCls() : null;}
}
