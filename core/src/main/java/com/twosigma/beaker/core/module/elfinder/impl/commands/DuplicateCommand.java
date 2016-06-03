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
import org.apache.commons.io.FilenameUtils;
import org.json.JSONObject;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

public class DuplicateCommand extends AbstractJsonCommand implements Command {
  @Override
  public void execute(FsService fsService, HttpServletRequest request, ServletContext servletContext, JSONObject json)
    throws Exception {
    String[] targets = request.getParameterValues("targets[]");

    List<FsItemEx> added = new ArrayList<FsItemEx>();

    for (String target : targets) {
      FsItemEx fsi       = super.findItem(fsService, target);
      String   name      = fsi.getName();
      String   baseName  = FilenameUtils.getBaseName(name);
      String   extension = FilenameUtils.getExtension(name);

      int      i       = 1;
      FsItemEx newFile = null;
      baseName = baseName.replaceAll("\\(\\d+\\)$", "");

      while (true) {
        String newName = String.format("%s(%d)%s", baseName, i, (extension == null || extension.isEmpty() ? ""
          : "." + extension));
        newFile = new FsItemEx(fsi.getParent(), newName);
        if (!newFile.exists()) {
          break;
        }
        i++;
      }

      createAndCopy(fsi, newFile);
      added.add(newFile);
    }

    json.put("added", files2JsonArray(request, added));
  }

}
