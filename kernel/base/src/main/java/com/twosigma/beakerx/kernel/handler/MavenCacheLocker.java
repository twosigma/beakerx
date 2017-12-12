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

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Timer;
import java.util.TimerTask;

public class MavenCacheLocker {

  static final String MAVEN_LOCK = "/maven.lock";
  private static final int PERIOD = 150;

  private Timer timer;
  private File cache;
  private File lockFile;

  public MavenCacheLocker(File cache) {
    this.cache = cache;
    this.timer = new Timer();
  }

  public boolean addCacheLock() {
    try {
      lockFile = new File(cache.getCanonicalPath() + MAVEN_LOCK);
      boolean newFile = lockFile.createNewFile();
      if (newFile) {
        keepFileLockAlive();
        return true;
      } else {
        return createIfDeadLockFile();
      }
    } catch (IOException e) {
      throw new RuntimeException(e);
    }
  }

  private boolean createIfDeadLockFile() {
    boolean canRemove = canRemoveLockFile();
    if (canRemove) {
      lockFile.delete();
      return addCacheLock();
    }
    return false;
  }

  private boolean canRemoveLockFile() {
    int attempts = 10;
    long lastModified = lockFile.lastModified();
    boolean canRemove = true;
    while (attempts > 0) {
      try {
        Thread.sleep(PERIOD);
      } catch (InterruptedException e) {
        e.printStackTrace();
      }
      if (lastModified == lockFile.lastModified()) {
        attempts--;
      } else {
        canRemove = false;
        break;
      }
    }
    return canRemove;
  }

  private void keepFileLockAlive() {
    this.timer = new Timer();
    this.timer.scheduleAtFixedRate(new TimerTask() {
      @Override
      public void run() {
        lockFile.setLastModified(LocalDateTime.now().toInstant(ZoneOffset.UTC).toEpochMilli());
      }
    }, 0, PERIOD);
  }

  public void removeMavenCacheLock() {
    this.timer.cancel();
    this.lockFile.delete();
  }


}
