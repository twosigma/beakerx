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

import static com.twosigma.beakerx.kernel.EnvCacheFolderFactory.PLEASE_SWITCH_TO_CONDA_ENV_OR_VIRTUAL_ENV;
import static java.util.Collections.singletonList;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.fail;

public class CondaEnvCacheFolderFactoryTest {

  @Test
  public void shouldThrowErrorWhenCONDA_PREFIXisNull() throws Exception {
    shouldThrowError(() -> null);

  }

  @Test
  public void shouldThrowErrorWhenCONDA_PREFIXisEmpty() throws Exception {
    //given
    shouldThrowError(() -> "");
  }

  private void shouldThrowError(EnvCacheFolderFactory.EnvPrefix condaPrefix) {
    //given
    EnvCacheFolderFactory factory = new EnvCacheFolderFactory(singletonList(condaPrefix));
    //when
    try {
      factory.getCache();
      fail("Should throw an error when CONDA_PREFIX is not set");
    } catch (Exception e) {
      //then
      assertThat(e.getMessage()).isEqualTo(PLEASE_SWITCH_TO_CONDA_ENV_OR_VIRTUAL_ENV);
    }
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