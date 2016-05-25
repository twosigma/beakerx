/*
 *  Copyright 2014 TWO SIGMA OPEN SOURCE, LLC
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
package com.twosigma.beaker.core.module.elfinder.impl.commands;

import com.twosigma.beaker.core.module.elfinder.impl.AbstractJsonCommand;
import com.twosigma.beaker.core.module.elfinder.service.Command;
import com.twosigma.beaker.core.module.elfinder.impl.FsItemEx;
import com.twosigma.beaker.core.module.elfinder.service.FsService;
import com.twosigma.beaker.core.module.elfinder.service.FsVolume;
import org.json.JSONObject;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import java.util.LinkedHashMap;
import java.util.Map;

public class OpenCommand extends AbstractJsonCommand implements
                                                                     Command {
  @Override
  public void execute(FsService fsService, HttpServletRequest request,
                      ServletContext servletContext, JSONObject json) throws Exception {
    boolean init   = request.getParameter("init") != null;
    boolean tree   = request.getParameter("tree") != null;
    String  target = request.getParameter("target");

    Map<String, FsItemEx> files = new LinkedHashMap<String, FsItemEx>();
    if (init) {
      json.put("api", 2.1);
      json.put("netDrivers", new Object[0]);
    }

    if (tree) {
      for (FsVolume v : fsService.getVolumes()) {
        FsItemEx root = new FsItemEx(v.getRoot(), fsService);
        files.put(root.getHash(), root);
        addSubfolders(files, root);
      }
    }

    FsItemEx cwd = findCwd(fsService, target);
    files.put(cwd.getHash(), cwd);
    String[] onlyMimes = request.getParameterValues("mimes[]");
    addChildren(files, cwd, onlyMimes);

    json.put("files", files2JsonArray(request, files.values()));
    json.put("cwd", getFsItemInfo(request, cwd));
    json.put("options", getOptions(request, cwd));
  }
}
