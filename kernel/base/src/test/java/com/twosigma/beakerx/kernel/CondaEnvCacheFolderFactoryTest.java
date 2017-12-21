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

import org.junit.Test;

import java.nio.file.Path;

import static com.twosigma.beakerx.kernel.EnvCacheFolderFactory.getTmpDir;
import static java.util.Collections.singletonList;
import static org.assertj.core.api.Assertions.assertThat;

public class CondaEnvCacheFolderFactoryTest {

  @Test
  public void shouldReturnTmpFolderWhenCONDA_PREFIXisNull() throws Exception {
    shouldReturnTmpFolder(() -> null);
  }

  @Test
  public void shouldReturnTmpFolderWhenCONDA_PREFIXisEmpty() throws Exception {
    //given
    shouldReturnTmpFolder(() -> "");
  }

  private void shouldReturnTmpFolder(EnvCacheFolderFactory.EnvPrefix prefix) {
    //given
    EnvCacheFolderFactory factory = new EnvCacheFolderFactory(singletonList(prefix));
    //when
    Path cache = factory.getCache();
    //then
    assertThat(cache.toString()).contains(getTmpDir());
  }

  @Test
  public void shouldReturnPathToCache() throws Exception {
    //given
    final String condaPrefixPath = "condaPrefixPath";
    EnvCacheFolderFactory factory = new EnvCacheFolderFactory(singletonList(() -> condaPrefixPath));
    //when
    Path cache = factory.getCache();
    //then
    assertThat(cache.toString()).contains(condaPrefixPath);
  }
}