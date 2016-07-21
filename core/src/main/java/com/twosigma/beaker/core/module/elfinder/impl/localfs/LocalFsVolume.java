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
package com.twosigma.beaker.core.module.elfinder.impl.localfs;

import com.twosigma.beaker.core.module.elfinder.service.FsItem;
import com.twosigma.beaker.core.module.elfinder.service.FsVolume;
import com.twosigma.beaker.core.module.elfinder.util.MimeTypesUtils;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.io.IOUtils;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

public class LocalFsVolume implements FsVolume {
  private final static Logger logger = Logger.getLogger(LocalFsVolume.class.getName());
  private static final int MAX_TIME_TO_COLLECT_FOLDER_STRUCTURE = 2000;

  private String name;
  private File   rootDir;
  private String csscls;
  private static final boolean isWindows = System.getProperty("os.name").contains("Windows");

  private File asFile(FsItem fsi) {
    return ((LocalFsItem) fsi).getFile();
  }

  @Override
  public void createFile(FsItem fsi) throws IOException {
    asFile(fsi).createNewFile();
  }

  @Override
  public void createFolder(FsItem fsi) throws IOException {
    asFile(fsi).mkdirs();
  }

  @Override
  public void deleteFile(FsItem fsi) throws IOException {
    File file = asFile(fsi);
    if (!file.isDirectory()) {
      file.delete();
    }
  }

  @Override
  public void deleteFolder(FsItem fsi) throws IOException {
    File file = asFile(fsi);
    if (file.isDirectory()) {
      FileUtils.deleteDirectory(file);
    }
  }

  @Override
  public boolean exists(FsItem newFile) {
    return asFile(newFile).exists();
  }

  private LocalFsItem fromFile(File file) {
    return new LocalFsItem(this, file);
  }

  @Override
  public FsItem fromPath(String relativePath) {
    return fromFile(new File(rootDir, relativePath));
  }

  @Override
  public String getDimensions(FsItem fsi) {
    return null;
  }

  @Override
  public long getLastModified(FsItem fsi) {
    return asFile(fsi).lastModified();
  }

  @Override
  public String getMimeType(FsItem fsi) {
    File file = asFile(fsi);
    if (file.isDirectory())
      return "directory";

    String ext = FilenameUtils.getExtension(file.getName());
    if (!ext.isEmpty()) {
      String mimeType = MimeTypesUtils.getMimeType(ext);
      return mimeType == null ? MimeTypesUtils.UNKNOWN_MIME_TYPE
        : mimeType;
    }

    return MimeTypesUtils.UNKNOWN_MIME_TYPE;
  }

  @Override
  public boolean isHidden(FsItem fsi) {
    return asFile(fsi).isHidden();
  }

  public String getName() {
    return name;
  }

  @Override
  public String getName(FsItem fsi) {
    return asFile(fsi).getName();
  }

  @Override
  public FsItem getParent(FsItem fsi) {
    return fromFile(asFile(fsi).getParentFile());
  }

  @Override
  public String getPath(FsItem fsi) throws IOException {
    String fullPath = getFullPath(fsi);
    String rootPath     = rootDir.getAbsolutePath();
    String relativePath = fullPath.substring(rootPath.length());
    return relativePath.replace('\\', '/');
  }

  @Override
  public String getFullPath(FsItem fsi) throws IOException {
    return asFile(fsi).getAbsolutePath();
  }

  @Override
  public FsItem getRoot() {
    return fromFile(rootDir);
  }

  public File getRootDir() {
    return rootDir;
  }

  @Override
  public long getSize(FsItem fsi) throws IOException {
    if (isFolder(fsi)) {
      return 0;
    } else {
      return asFile(fsi).length();
    }
  }

  @Override
  public String getThumbnailFileName(FsItem fsi) {
    return null;
  }

  @Override
  public String getURL(FsItem f) {
    // We are just happy to not supply a custom URL.
    return null;
  }


  @Override
  public boolean hasChildFolder(FsItem fsi) {
    return fsi.isFolder();
  }

  @Override
  public boolean isFolder(FsItem fsi) {
    return asFile(fsi).isDirectory();
  }

  @Override
  public boolean isRoot(FsItem fsi) {
    return rootDir.equals(asFile(fsi));
  }

  @Override
  public FsItem[] listChildren(FsItem fsi) {
    List<FsItem> list = new ArrayList<FsItem>();
    File file = asFile(fsi);
    String absolutePath = file.getAbsolutePath();
    File[]       cs   = file.listFiles();
    if (cs == null) {
      return new FsItem[0];
    }

    List<String> pathes = null;

    if (!isWindows) {
      pathes = collectFolderStructure(absolutePath);
    }

    for (File c : cs) {
      LocalFsItem item = fromFile(c);

      if (!isWindows && c.isDirectory()) {
        item.setHasChildFolders(pathes == null || isHasChildFolders(pathes, c));
        // "pathes == null" means that collecting of folder structure took too much time and was interrupted,
        // so we just assume every folder has subfolders
      }

      list.add(item);
    }

    return list.toArray(new FsItem[list.size()]);
  }

  @Override
  public InputStream openInputStream(FsItem fsi) throws IOException {
    return new FileInputStream(asFile(fsi));
  }

  @Override
  public void rename(FsItem src, FsItem dst) throws IOException {
    asFile(src).renameTo(asFile(dst));
  }

  public void setName(String name) {
    this.name = name;
  }

  public void setRootDir(File rootDir) {
    if (!rootDir.exists()) {
      rootDir.mkdirs();
    }

    this.rootDir = rootDir;
  }

  @Override
  public String toString() {
    return "LocalFsVolume [" + rootDir + "]";
  }

  @Override
  public void writeStream(FsItem fsi, InputStream is) throws IOException {
    OutputStream os = null;
    try {
      os = new FileOutputStream(asFile(fsi));
      IOUtils.copy(is, os);
    } finally {
      if (is != null) {
        is.close();
      }
      if (os != null) {
        os.close();
      }
    }
  }

  @Override
  public String getCssCls() {
    return csscls;
  }

  @Override
  public void setCssCls(String csscls) {
    this.csscls = csscls;
  }

  private boolean isHasChildFolders(List<String> pathes, File c) {
    String eachPath = c.getAbsolutePath();
    if (eachPath.endsWith("/")) {
      eachPath += "/";
    }
    int index = Collections.binarySearch(pathes, eachPath);
    return index >= 0 && index + 1 < pathes.size() && pathes.get(index + 1).startsWith(eachPath);
  }

  private List<String> collectFolderStructure(String absolutePath) {
    List<String> pathes = new ArrayList<>();
    long startTime = System.currentTimeMillis();

    try {
      Process findProcess = Runtime.getRuntime().exec(new String[]{"find", absolutePath, "-type", "d", "-maxdepth", "2"});
      try (BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(findProcess.getInputStream()))) {
        String path;
        while ((path = bufferedReader.readLine()) != null) {
          pathes.add(path);

          if (System.currentTimeMillis() - startTime > MAX_TIME_TO_COLLECT_FOLDER_STRUCTURE) {
            // Collecting of folder structure takes too much time, interrupted
            return null;
          }
        }
        Collections.sort(pathes);
      }
    } catch (IOException e) {
      logger.log(Level.SEVERE, "Error getting folder structure", e);
      return null;
    }

    return pathes;
  }
}

