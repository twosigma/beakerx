/*
 *  Copyright 2017 TWO SIGMA OPEN SOURCE, LLC
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
package com.twosigma.beakerx.mimetype;


import java.io.File;

public class FileLinkContainer extends MIMEContainer {

  public FileLinkContainer(String mime, String code) {
    super(mime, code);
  }

  public static MIMEContainer FileLink(String filePath) {
    File f = new File(filePath);
    if (f.isDirectory()) {
      return addMimeType(MIME.TEXT_PLAIN, "Cannot display a directory using FileLink.");
    }
    if (!f.exists()) {
      return addMimeType(MIME.TEXT_HTML, "Path (<tt>" + f.getAbsolutePath() + "</tt>) doesn't exist. " +
          "It may still be in the process of " +
          "being generated, or you may have the " +
          "incorrect path.");
    }

    String htmlLink = String.format("<a href='%1$s' target='_blank'>%1$s</a><br/>", filePath);
    return addMimeType(MIME.TEXT_HTML, htmlLink);
  }

  public static MIMEContainer FileLinks(String dirPath) {
    File f = new File(dirPath);
    String result = "";
    if (!f.isDirectory()) {
      return addMimeType(MIME.TEXT_PLAIN, "Cannot display a file using FileLinks.\nUse FileLink to display " + dirPath);
    }
    return addMimeType(MIME.TEXT_HTML, listFilesForFolder(f, result));
  }

  private static String listFilesForFolder(File folder, String result) {
    File[] fileList = folder.listFiles();
    if (fileList == null) {
      return null;
    }

    for (final File fileEntry : fileList) {
      if (fileEntry.isDirectory()) {
        result += (String.format("%1$s <br/>", fileEntry.getName()));
        listFilesForFolder(fileEntry, result);
      } else {
        result += String.format("<a href='%1$s' target='_blank'>%1$s</a><br/>", fileEntry.getPath());
      }
    }
    return result;
  }
}
