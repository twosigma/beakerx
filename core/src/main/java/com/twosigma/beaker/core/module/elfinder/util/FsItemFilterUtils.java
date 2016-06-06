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
import com.twosigma.beaker.core.module.elfinder.service.FsItemFilter;

import java.util.ArrayList;
import java.util.List;

public abstract class FsItemFilterUtils {
  public static FsItemFilter FILTER_ALL = new FsItemFilter() {
    @Override
    public boolean accepts(FsItem item) {
      return false;
    }
  };

  public static FsItemFilter FILTER_FOLDER = new FsItemFilter() {
    @Override
    public boolean accepts(FsItem item) {
      return item.isFolder();
    }
  };

  public static FsItemFilter createFileNameKeywordFilter(final String keyword) {
    return new FsItemFilter() {
      @Override
      public boolean accepts(FsItem item) {
        return item.getName().contains(keyword);
      }
    };
  }

  public static FsItemEx[] filterFiles(FsItemEx[] sourceFiles,
                                       FsItemFilter filter) {
    List<FsItemEx> filtered = new ArrayList<>();
    for (FsItemEx file : sourceFiles) {
      if (filter.accepts(file))
        filtered.add(file);
    }

    return filtered.toArray(new FsItemEx[filtered.size()]);
  }

  /**
   * returns a FsItemFilter according to given mimeFilters
   *
   * @param mimeFilters An array of MIME types, if <code>null</code> no filtering is done
   * @return A filter that only accepts the supplied MIME types.
   */
  public static FsItemFilter createMimeFilter(final String[] mimeFilters) {
    if (mimeFilters == null || mimeFilters.length == 0)
      return FILTER_ALL;

    return new FsItemFilter() {
      @Override
      public boolean accepts(FsItem item) {
        String mimeType = item.getMimeType().toUpperCase();

        for (String mf : mimeFilters) {
          mf = mf.toUpperCase();
          if (mimeType.startsWith(mf + "/") || mimeType.equals(mf))
            return true;
        }
        return false;
      }
    };
  }

}
