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
package com.twosigma.beaker.core.module.elfinder.impl;

import com.twosigma.beaker.core.module.elfinder.service.CommandExecutionContext;
import com.twosigma.beaker.core.module.elfinder.service.Command;
import com.twosigma.beaker.core.module.elfinder.service.FsItem;
import com.twosigma.beaker.core.module.elfinder.service.FsItemFilter;
import com.twosigma.beaker.core.module.elfinder.service.FsService;
import com.twosigma.beaker.core.module.elfinder.util.FsItemFilterUtils;
import com.twosigma.beaker.core.module.elfinder.util.FsServiceUtils;
import org.apache.commons.lang3.StringUtils;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

public abstract class AbstractCommand implements Command {
  public static Logger LOGGER = Logger.getLogger(AbstractCommand.class.getName());

  protected void addChildren(Map<String, FsItemEx> map, FsItemEx fsi,
                           FsItemFilter filter) throws IOException {
    for (FsItemEx f : fsi.listChildren(filter)) {
      map.put(f.getHash(), f);
    }
  }

  protected void createAndCopy(FsItemEx src, FsItemEx dst) throws IOException {
    if (src.isFolder()) {
      createAndCopyFolder(src, dst);
    } else {
      createAndCopyFile(src, dst);
    }
  }

  protected void createAndCopyFile(FsItemEx src, FsItemEx dst)
    throws IOException {
    dst.createFile();
    InputStream is = src.openInputStream();
    dst.writeStream(is);
  }

  protected void createAndCopyFolder(FsItemEx src, FsItemEx dst)
    throws IOException {
    dst.createFolder();

    for (FsItemEx c : src.listChildren()) {
      if (c.isFolder()) {
        createAndCopyFolder(c, new FsItemEx(dst, c.getName()));
      } else {
        createAndCopyFile(c, new FsItemEx(dst, c.getName()));
      }
    }
  }

  @Override
  public void execute(CommandExecutionContext ctx) throws Exception {
    FsService fileService = ctx.getFsServiceFactory().getFileService(
      ctx.getRequest(), ctx.getServletContext());
    execute(fileService, ctx.getRequest(), ctx.getResponse(),
            ctx.getServletContext());
  }

  public abstract void execute(FsService fsService,
                               HttpServletRequest request, HttpServletResponse response,
                               ServletContext servletContext) throws Exception;

  protected Object[] files2JsonArray(HttpServletRequest request,
                                     Collection<FsItemEx> list) throws IOException {
    return files2JsonArray(request, list.toArray(new FsItemEx[list.size()]));
  }

  protected Object[] files2JsonArray(HttpServletRequest request,
                                     FsItemEx[] list) throws IOException {
    List<Map<String, Object>> los = new ArrayList<Map<String, Object>>();
    for (FsItemEx fi : list) {
      los.add(getFsItemInfo(request, fi));
    }

    return los.toArray();
  }

  protected FsItemEx findCwd(FsService fsService, String target)
    throws IOException {
    // current selected directory
    FsItemEx cwd = null;
    if (target != null) {
      cwd = findItem(fsService, target);
    }

    if (cwd == null)
      cwd = new FsItemEx(fsService.getVolumes()[0].getRoot(), fsService);

    return cwd;
  }

  protected FsItemEx findItem(FsService fsService, String hash)
    throws IOException {
    return FsServiceUtils.findItem(fsService, hash);
  }

  protected Map<String, Object> getFsItemInfo(HttpServletRequest request,
                                              FsItemEx fsi) throws IOException {
    Map<String, Object> info = new HashMap<String, Object>();
    info.put("hash", fsi.getHash());
    info.put("mime", fsi.getMimeType());
    info.put("ts", fsi.getLastModified());
    info.put("size", fsi.getSize());
    info.put("read", fsi.isReadable(fsi) ? 1 : 0);
    info.put("write", fsi.isWritable(fsi) ? 1 : 0);
    info.put("locked", fsi.isLocked(fsi) ? 1 : 0);
    info.put("fullpath", fsi.getFullPath());

    //TODO: request.getRequestURL() is not correct
//    if (fsi.getMimeType().startsWith("image")) {
//      StringBuffer qs = request.getRequestURL();
//      info.put("tmb", qs.append(String.format("?cmd=tmb&target=%s",
//                                              fsi.getHash())));
//    }

    if (fsi.isRoot()) {
      info.put("name", fsi.getVolumnName());
      info.put("volumeid", fsi.getVolumeId());
    } else {
      info.put("name", fsi.getName());
      info.put("phash", fsi.getParent().getHash());
    }
    if (fsi.isFolder()) {
      info.put("dirs", fsi.hasChildFolder() ? 1 : 0);
    }
    String url = fsi.getURL();
    if (url != null) {
      info.put("url", url);
    }
    if (!StringUtils.isEmpty(fsi.getCssCls())){
      info.put("csscls", fsi.getCssCls());
    }

    return info;
  }

  protected String getMimeDisposition(String mime) {
    String[] parts = mime.split("/");
    return ("image".equals(parts[0]) || "text".equals(parts[0]) ? "inline"
      : "attachments");
  }

  protected Map<String, Object> getOptions(HttpServletRequest request,
                                           FsItemEx cwd) throws IOException {
    Map<String, Object> map = new HashMap<String, Object>();
    map.put("path", cwd.getPath());
    map.put("disabled", new String[0]);
    map.put("separator", "/");
    map.put("copyOverwrite", 1);
    map.put("archivers", new Object[0]);
    String url = cwd.getURL();
    if (url != null) {
      map.put("url", url);
    }

    return map;
  }
}
