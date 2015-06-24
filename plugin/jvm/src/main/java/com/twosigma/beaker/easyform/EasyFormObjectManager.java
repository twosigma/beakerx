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

import com.google.inject.Inject;
import com.google.inject.Provider;
import com.google.inject.Singleton;
import com.twosigma.beaker.jvm.updater.UpdateManager;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Singleton
public class EasyFormObjectManager {
  private final Map<String, EasyForm> _forms;
  private final Map<String, String> _shellToId;

  private final Provider<UpdateManager> _updateManagerProvider;

  @Inject
  public EasyFormObjectManager(final Provider<UpdateManager> ump) {
    this._forms = new HashMap<>();
    this._shellToId = new HashMap<>();
    this._updateManagerProvider = ump;
  }

  public void registerForm(final String id, final EasyForm form) {
    _forms.put(id, form);
  }

  public EasyForm getForm(final String id) {
    return _forms.get(id);
  }

  public void unregisterForm(final String id) {
    _forms.remove(id);
  }

  public void associate(final String id, final String shellId) {
    _shellToId.put(id, shellId);
  }

  public void dropAll(final String shellId) {
    List<String> keys = new ArrayList<String>(_shellToId.keySet());
    for (String s : keys) {
      if (_shellToId.get(s).equals(shellId)) {
        _shellToId.remove(s);
        _forms.remove(s);
        _updateManagerProvider.get().unregister(s);
      }
    }
  }
}
