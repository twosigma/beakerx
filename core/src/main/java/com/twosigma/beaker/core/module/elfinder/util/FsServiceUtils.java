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
package com.twosigma.beaker.core.module.elfinder.util;

import com.twosigma.beaker.core.module.elfinder.impl.FsItemEx;
import com.twosigma.beaker.core.module.elfinder.service.FsItem;
import com.twosigma.beaker.core.module.elfinder.service.FsService;

import java.io.IOException;

public abstract class FsServiceUtils {
  public static FsItemEx findItem(FsService fsService, String hash) throws IOException {
    FsItem fsi = fsService.fromHash(hash);
    if (fsi == null) {
      return null;
    }

    return new FsItemEx(fsi, fsService);
  }
}
