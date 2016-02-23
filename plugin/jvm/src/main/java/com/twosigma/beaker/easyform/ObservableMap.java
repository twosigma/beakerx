/*
 *  Copyright 2015 TWO SIGMA OPEN SOURCE, LLC
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
package com.twosigma.beaker.easyform;

import java.util.Collection;
import java.util.LinkedHashMap;
import java.util.HashMap;
import java.util.Map;
import java.util.Observable;
import java.util.Set;

public abstract class ObservableMap<K, V> extends Observable implements Map<K, V> {

  protected LinkedHashMap<K, V> mapInstance = new LinkedHashMap<>();

  @Override
  public int size() {
    return mapInstance.size();
  }

  @Override
  public boolean isEmpty() {
    return mapInstance.isEmpty();
  }

  @Override
  public boolean containsKey(Object key) {
    return mapInstance.containsKey(key);
  }

  @Override
  public boolean containsValue(Object value) {
    return mapInstance.containsValue(value);
  }

  @Override
  public V get(Object key) {
    return mapInstance.get(key);
  }

  @Override
  public V put(K key, V value) {
    return mapInstance.put(key, value);
  }

  @Override
  public V remove(Object key) {
    return mapInstance.remove(key);
  }

  @Override
  public void putAll(Map<? extends K, ? extends V> m) {
    mapInstance.putAll(m);
  }

  @Override
  public void clear() {
    mapInstance.clear();
  }

  @Override
  public Set<K> keySet() {
    return mapInstance.keySet();
  }

  @Override
  public Collection<V> values() {
    return mapInstance.values();
  }

  @Override
  public Set<Entry<K, V>> entrySet() {
    return mapInstance.entrySet();
  }
}
