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

import com.twosigma.beakerx.jvm.classloader.BeakerxUrlClassLoader;
import org.junit.Before;
import org.junit.Test;

import java.util.ArrayList;

import static org.assertj.core.api.Assertions.assertThat;

public class ImportsTest {

  private Imports imports;
  private BeakerxUrlClassLoader urlClassLoader;

  @Before
  public void setUp() throws Exception {
    imports = new Imports(new ArrayList<>());
    urlClassLoader = new BeakerxUrlClassLoader();
  }

  @Test
  public void shouldNotHaveDuplications() throws Exception {
    //given
    ImportPath anImport = new ImportPath("com.twosigma.beakerx.widgets.integers.IntSlider");
    //when
    assertThat(imports.add(anImport, urlClassLoader)).isEqualTo(AddImportStatus.ADDED);
    assertThat(imports.add(anImport, urlClassLoader)).isEqualTo(AddImportStatus.EXISTS);
    //then
    assertThat(imports.getImportPaths()).containsExactly(new ImportPath("com.twosigma.beakerx.widgets.integers.IntSlider"));
  }
}