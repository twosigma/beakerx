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

public class FsSecurityCheckForAll implements FsSecurityChecker {
  private boolean locked   = false;
  private boolean readable = true;
  private boolean writable = true;

  public boolean isLocked() {
    return locked;
  }

  @Override
  public boolean isLocked(FsService fsService, FsItem fsi) {
    return locked;
  }

  public boolean isReadable() {
    return readable;
  }

  @Override
  public boolean isReadable(FsService fsService, FsItem fsi) {
    return readable;
  }

  public boolean isWritable() {
    return writable;
  }

  @Override
  public boolean isWritable(FsService fsService, FsItem fsi) {
    return writable;
  }

  public void setLocked(boolean locked) {
    this.locked = locked;
  }

  public void setReadable(boolean readable) {
    this.readable = readable;
  }

  public void setWritable(boolean writable) {
    this.writable = writable;
  }

}
