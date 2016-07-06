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
package com.twosigma.beaker.core.module.elfinder.impl.localfs;

import com.twosigma.beaker.core.module.elfinder.service.FsItem;
import com.twosigma.beaker.core.module.elfinder.service.FsVolume;

import java.io.File;

public class LocalFsItem implements FsItem {
  private File     file;
  private FsVolume volume;

  public LocalFsItem(LocalFsVolume volume, File file) {
    super();
    this.volume = volume;
    this.file = file;
  }

  public File getFile() {
    return file;
  }

  public FsVolume getVolume() {
    return volume;
  }

  @Override
  public String getName() {
    return null;
  }

  @Override
  public boolean isFolder() {
    return false;
  }

  @Override
  public String getMimeType() {
    return volume.getMimeType(this);
  }

  @Override
  public boolean isHidden() {
    return volume.isHidden(this);
  }

  public void setFile(File file) {
    this.file = file;
  }

  public void setVolume(FsVolume volume) {
    this.volume = volume;
  }
}
