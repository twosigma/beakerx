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
import com.twosigma.beaker.core.module.elfinder.service.FsItemFilter;
import com.twosigma.beaker.core.module.elfinder.service.FsService;
import com.twosigma.beaker.core.module.elfinder.util.FsItemFilterUtils;
import org.apache.commons.fileupload.FileItemStream;
import org.json.JSONObject;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

public class UploadCommand extends AbstractJsonCommand
  implements Command {
  @Override
  @SuppressWarnings("unchecked")
  public void execute(FsService fsService, HttpServletRequest request,
                      ServletContext servletContext, JSONObject json) throws Exception {
    List<FileItemStream> listFiles = (List<FileItemStream>) request
      .getAttribute(FileItemStream.class.getName());
    List<FsItemEx> added = new ArrayList<FsItemEx>();

    String   target = request.getParameter("target");
    FsItemEx dir    = super.findItem(fsService, target);

    FsItemFilter filter = FsItemFilterUtils.createFilterFromRequest(request);
    for (FileItemStream fis : listFiles) {
      java.nio.file.Path p       = java.nio.file.Paths.get(fis.getName());
      FsItemEx           newFile = new FsItemEx(dir, p.getFileName().toString());
      newFile.createFile();
      InputStream is = fis.openStream();
      newFile.writeStream(is);
      if (filter.accepts(newFile))
        added.add(newFile);
    }

    json.put("added", files2JsonArray(request, added));
  }
}
