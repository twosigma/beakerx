/*
 *  Copyright 2018 TWO SIGMA OPEN SOURCE, LLC
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
package com.twosigma.beakerx;

import com.twosigma.beakerx.kernel.comm.Comm;
import com.twosigma.beakerx.kernel.comm.TargetNamesEnum;

import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Stream;

public class BeakerXCommRepository implements CommRepository {

  private Map<String, Comm> commMap;
  private Comm autotranslationComm;

  public BeakerXCommRepository() {
    this.commMap = new ConcurrentHashMap<>();
  }

  @Override
  public Comm getOrCreateAutotranslationComm() {
    if (autotranslationComm == null) {
      autotranslationComm = new Comm(TargetNamesEnum.BEAKER_AUTOTRANSLATION);
      autotranslationComm.open();
    }
    return autotranslationComm;
  }

  @Override
  public Comm getCommByTargetName(String targetName) {
    Stream<Map.Entry<String, Comm>> entryStream = commMap.entrySet().stream().filter(x -> x.getValue().getTargetName().equals(targetName));
    Optional<Map.Entry<String, Comm>> first = entryStream.findFirst();
    if (first.isPresent()) {
      return first.get().getValue();
    }
    return null;
  }

  @Override
  public void closeComms() {
    this.commMap.values().forEach(Comm::close);
    if (autotranslationComm != null) {
      autotranslationComm.close();
      autotranslationComm = null;
    }
  }

  public synchronized boolean isCommPresent(String hash) {
    return commMap.containsKey(hash);
  }

  public Set<String> getCommHashSet() {
    return commMap.keySet();
  }

  public synchronized void addComm(String hash, Comm commObject) {
    if (!isCommPresent(hash)) {
      commMap.put(hash, commObject);
    }
  }

  public synchronized Comm getComm(String hash) {
    return commMap.get(hash != null ? hash : "");
  }

  public synchronized void removeComm(String hash) {
    if (hash != null && isCommPresent(hash)) {
      commMap.remove(hash);
    }
  }

}
