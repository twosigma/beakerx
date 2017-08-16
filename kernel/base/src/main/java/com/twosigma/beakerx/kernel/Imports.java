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
package com.twosigma.beakerx.kernel;

import java.util.ArrayList;
import java.util.List;

import static com.google.common.base.Preconditions.checkNotNull;

public class Imports {

  private List<ImportPath> imports = new ArrayList<>();

  public List<ImportPath> getImportPaths() {
    return imports;
  }

  public boolean add(ImportPath anImport) {
    checkNotNull(anImport);
    if (!this.imports.contains(anImport)) {
      return this.imports.add(anImport);
    }
    return false;
  }

  public boolean remove(ImportPath anImport) {
    checkNotNull(anImport);
    if (this.imports.contains(anImport)) {
      return this.imports.remove(anImport);
    }
    return false;
  }

  public boolean isEmpty() {
    return imports.isEmpty();
  }

  public List<String> toListOfStrings() {
    List<String> importsAsStrings = new ArrayList<>();
    for (ImportPath st : getImportPaths()) {
      importsAsStrings.add(st.asString());
    }
    return importsAsStrings;
  }
}
