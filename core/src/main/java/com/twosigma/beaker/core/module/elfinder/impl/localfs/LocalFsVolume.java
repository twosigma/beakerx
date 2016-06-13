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

import java.io.File;
import java.io.FileFilter;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.FileVisitResult;
import java.nio.file.Path;
import java.nio.file.SimpleFileVisitor;
import java.nio.file.attribute.BasicFileAttributes;
import java.util.ArrayList;
import java.util.List;

public class LocalFsVolume implements FsVolume {

  private String name;
  private File   rootDir;
  private String csscls;

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
    String fullPath     = asFile(fsi).getCanonicalPath();
    String rootPath     = rootDir.getCanonicalPath();
    String relativePath = fullPath.substring(rootPath.length());
    return relativePath.replace('\\', '/');
  }

  @Override
  public String getFullPath(FsItem fsi) throws IOException {
    String fullPath     = asFile(fsi).getCanonicalPath();
    return fullPath.replace('\\', '/');
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
    File file = asFile(fsi);
    File[] listFiles = file.listFiles(new FileFilter() {

      @Override
      public boolean accept(File arg0) {
        return arg0.isDirectory();
      }
    });
    return file.isDirectory()
      && listFiles != null && listFiles.length > 0;
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
    File[]       cs   = asFile(fsi).listFiles();
    if (cs == null) {
      return new FsItem[0];
    }

    for (File c : cs) {
      list.add(fromFile(c));
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
}
