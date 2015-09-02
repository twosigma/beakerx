package com.twosigma.beaker.easyform;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.Observable;
import java.util.Set;

public abstract class ObservableMap<K, V> extends Observable implements Map<K, V> {

  protected HashMap<K, V> mapInstance = new HashMap<>();

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
