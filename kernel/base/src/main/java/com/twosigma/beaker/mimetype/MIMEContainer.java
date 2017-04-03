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
package com.twosigma.beaker.mimetype;

import com.google.common.io.ByteStreams;
import com.google.common.io.Files;
import org.apache.commons.lang3.StringUtils;

import java.io.File;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.io.IOException;
import java.io.FileNotFoundException;
import java.net.URL;

public class MIMEContainer {

  protected static final String TEXT_PLAIN = "text/plain";
  protected static final String TEXT_HTML = "text/html";
  private static final String TEXT_LATEX = "text/latex";
  private static final String TEXT_MARKDOWN = "text/markdown";
  private static final String APPLICATION_JAVASCRIPT = "application/javascript";
  protected static final String IMAGE_PNG = "image/png";
  protected static final String IMAGE_JPEG = "image/jpeg";
  protected static final String IMAGE_SVG = "image/svg+xml";


  private String mime;
  private String code;

  public MIMEContainer() {

  }

  public MIMEContainer(String mime, String code) {
    this.mime = mime;
    this.code = code;
  }

  public String getMime() {
    return mime;
  }

  public String getCode() {
    return code;
  }

  public static MIMEContainer HTML(Object code) {
    return addMimeType(TEXT_HTML, code);
  }

  public static MIMEContainer Latex(Object code) {
    return addMimeType(TEXT_LATEX, code);
  }

  public static MIMEContainer Text(Object code) {
    return addMimeType(TEXT_PLAIN, code);
  }

  public static MIMEContainer Markdown(Object code) {
    return addMimeType(TEXT_MARKDOWN, code);
  }

  public static MIMEContainer Math(String code) {
    code = StringUtils.strip(code, "$");
    return addMimeType(TEXT_LATEX, "$$" + code + "$$");
  }

  public static MIMEContainer Javascript(Object code) {
    return addMimeType(APPLICATION_JAVASCRIPT, code);
  }

  public static MIMEContainer IFrame(String src, Object width, int height) {
    String code = String.format("<iframe width = '%1$s' height= '%2$d' src = '%3$s' frameborder='0' allowfullscreen> </iframe>",
        width.toString(), height, src);
    return addMimeType(TEXT_HTML, code);
  }

  public static MIMEContainer VimeoVideo(String id, Object width, int height) {
    String src = String.format("https://player.vimeo.com/video/%1$s", id);
    return IFrame(src, width, height);
  }

  public static MIMEContainer ScribdDocument(String id, Object width, int height) {
    String src = String.format("https://www.scribd.com/embeds/%1$s/content", id);
    return IFrame(src, width, height);
  }

  public static MIMEContainer YoutubeVideo(String id) {
    String src = String.format("https://www.youtube.com/embed/%1$s", id);
    return IFrame(src, 400, 300);
  }

  public static MIMEContainer Video(String src) {
    String output = String.format("<video src='%1$s' controls> Your browser does not support the <code>video</code> element. </video>", src);
    return addMimeType(TEXT_HTML, output);
  }

  protected static MIMEContainer addMimeType(String mime, Object code) {
    return new MIMEContainer(mime, code.toString());
  }

  protected static String exceptionToString(Exception e) {
    StringWriter w = new StringWriter();
    PrintWriter printWriter = new PrintWriter(w);
    e.printStackTrace(printWriter);
    printWriter.flush();
    return w.toString();
  }

  protected static boolean exists(String data) {
    File f = new File(data);
    return (f.exists() && !f.isDirectory());
  }

  protected static boolean isValidURL(String urlString) {
    try {
      URL url = new URL(urlString);
      url.toURI();
      return true;
    } catch (Exception exception) {
      return false;
    }
  }

  protected static byte[] getBytes(Object data) throws IOException {
    byte[] bytes;
    if (isValidURL(data.toString())) {
      bytes = ByteStreams.toByteArray((new URL(data.toString()).openStream()));
    } else if (exists(data.toString())) {
      File imgFile = new File(data.toString());
      bytes = Files.toByteArray(imgFile);
    } else {
      throw new FileNotFoundException(data.toString() + " doesn't exist. ");
    }
    return bytes;
  }

  @Override
  public String toString() {
    return this.getMime() + " CODE = " + this.getCode();
  }
}
