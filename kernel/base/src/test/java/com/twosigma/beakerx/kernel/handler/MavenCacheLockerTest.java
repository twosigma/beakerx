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
package com.twosigma.beakerx.kernel.handler;

import com.twosigma.beakerx.evaluator.EvaluatorTest;
import org.junit.Before;
import org.junit.Test;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;

import static org.assertj.core.api.Assertions.assertThat;

public class MavenCacheLockerTest {

  private Path cache;

  @Before
  public void setUp() throws Exception {
    this.cache = EvaluatorTest.getTestTempFolderFactory().createTempFolder();
  }

  @Test
  public void shouldCreateLockFile() throws Exception {
    //given
    MavenCacheLocker lockFile = createLockFile(cache);
    //when
    boolean added = lockFile.addCacheLock();
    //then
    assertThat(added).isTrue();
    assertThat(new File(cache.toString() + MavenCacheLocker.MAVEN_LOCK).exists()).isTrue();
  }

  @Test
  public void shouldRemoveLockFile() throws Exception {
    //given
    MavenCacheLocker lockFile = createLockFile(cache);
    lockFile.addCacheLock();
    //when
    lockFile.removeMavenCacheLock();
    //then
    assertThat(new File(cache.toString() + MavenCacheLocker.MAVEN_LOCK).exists()).isFalse();
  }

  @Test
  public void oneLockFileAtOneTime() throws Exception {
    //given
    MavenCacheLocker lockFile1 = createLockFile(cache);
    lockFile1.addCacheLock();
    //when
    MavenCacheLocker lockFile2 = createLockFile(cache);
    boolean addedLockFile2 = lockFile2.addCacheLock();
    //then
    assertThat(addedLockFile2).isFalse();
  }

  @Test
  public void shouldRemoveDeadLockFileAndCreateNewLockFile() throws Exception {
    //given
    createDeadLockFile();
    //when
    MavenCacheLocker lockFile = createLockFile(cache);
    boolean addedLockFile2 = lockFile.addCacheLock();
    //then
    assertThat(addedLockFile2).isTrue();
    assertThat(new File(cache.toString() + MavenCacheLocker.MAVEN_LOCK).exists()).isTrue();
  }

  private void createDeadLockFile() throws IOException {
    boolean newFile = new File(cache.toString() + MavenCacheLocker.MAVEN_LOCK).createNewFile();
    assertThat(newFile).isTrue();
  }


  private MavenCacheLocker createLockFile(Path cache) {
    return new MavenCacheLocker(cache.toFile());
  }
}