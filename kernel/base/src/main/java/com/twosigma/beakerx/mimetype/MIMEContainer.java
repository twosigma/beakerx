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

import com.google.common.io.ByteStreams;
import com.google.common.io.Files;
import org.apache.commons.lang3.StringUtils;

import java.io.File;
import java.io.IOException;
import java.io.FileNotFoundException;
import java.net.URL;
import java.util.HashMap;

import static org.apache.commons.lang3.builder.EqualsBuilder.reflectionEquals;
import static org.apache.commons.lang3.builder.HashCodeBuilder.reflectionHashCode;
import static org.apache.commons.lang3.builder.ToStringBuilder.reflectionToString;

public class MIMEContainer {

  public static final MIMEContainer HIDDEN = addMimeType(MIME.HIDDEN);

  public static class MIME {
    public static final String TEXT_PLAIN = "text/plain";
    public static final String TEXT_HTML = "text/html";
    public static final String TEXT_LATEX = "text/latex";
    public static final String TEXT_MARKDOWN = "text/markdown";
    public static final String APPLICATION_JAVASCRIPT = "application/javascript";
    public static final String IMAGE_PNG = "image/png";
    public static final String IMAGE_JPEG = "image/jpeg";
    public static final String IMAGE_SVG = "image/svg+xml";
    public static final String HIDDEN = "x-beakerx/empty";
    private String mime;

    public MIME(String mime) {
      this.mime = mime;
    }

    public String asString() {
      return mime;
    }

    @Override
    public boolean equals(Object o) {
      return reflectionEquals(this, o);
    }

    @Override
    public int hashCode() {
      return reflectionHashCode(this);
    }

    @Override
    public String toString() {
      return reflectionToString(this);
    }
  }

  private MIME mime;
  private Object data = "";

  private MIMEContainer(MIME mime) {
    this.mime = mime;
  }

  public MIMEContainer(String mime, Object code) {
    this.mime = new MIME(mime);
    this.data = code;
  }

  public MIME getMime() {
    return mime;
  }

  public Object getData() {
    return data;
  }


  public static MIMEContainer JavaScript(Object data) {
    return addMimeType(MIME.APPLICATION_JAVASCRIPT, data);
  }

  public static MIMEContainer HTML(Object data) {
    return addMimeType(MIME.TEXT_HTML, data);
  }

  public static MIMEContainer Latex(Object data) {
    return addMimeType(MIME.TEXT_LATEX, data);
  }

  public static MIMEContainer Text(Object data) {
    return addMimeType(MIME.TEXT_PLAIN, data);
  }

  public static MIMEContainer Markdown(Object data) {
    return addMimeType(MIME.TEXT_MARKDOWN, data);
  }

  public static MIMEContainer Math(String data) {
    data = StringUtils.strip(data, "$");
    return addMimeType(MIME.TEXT_LATEX, "$$" + data + "$$");
  }

  public static MIMEContainer Javascript(Object data) {
    return addMimeType(MIME.APPLICATION_JAVASCRIPT, data);
  }

  public static MIMEContainer IFrame(String src, Object width, int height) {
    String code = String.format("<iframe width = '%1$s' height= '%2$d' src = '%3$s' frameborder='0' allowfullscreen> </iframe>", width.toString(), height, src);
    return addMimeType(MIME.TEXT_HTML, code);
  }

  public static MIMEContainer VimeoVideo(String id) {
    return VimeoVideo(id, 400,300);
  }

  public static MIMEContainer VimeoVideo(String id, Object width, int height) {
    String src = String.format("https://player.vimeo.com/video/%1$s", id);
    return IFrame(src, width, height);
  }

  public static MIMEContainer ScribdDocument(String id, String ... params) {
    return ScribdDocument(id, 400,300, params);
  }

  public static MIMEContainer ScribdDocument(String id, Object width, int height, String ... params) {
    HashMap paramsMap = paramsToMap(params);
    String src = String.format("https://www.scribd.com/embeds/%1$s/content%2$s", id, parseParams(paramsMap));
    return IFrame(src, paramsMap.getOrDefault("width", width),
            Integer.parseInt(paramsMap.getOrDefault("height", height).toString()));
  }

  public static MIMEContainer YoutubeVideo(String id, String ... params) {
    return YoutubeVideo(id, 400, 300, params);
  }

  public static MIMEContainer YoutubeVideo(String id, Object width, int height, String ... params) {
    HashMap paramsMap = paramsToMap(params);
    String src = String.format("https://www.youtube.com/embed/%1$s%2$s", id, parseParams(paramsMap));
    return IFrame(src, paramsMap.getOrDefault("width", width),
            Integer.parseInt(paramsMap.getOrDefault("height", height).toString()));
  }

  public static MIMEContainer Video(String src) {
    String output = String.format("<video src='%1$s' controls> Your browser does not support the <data>video</data> element. </video>", src);
    return addMimeType(MIME.TEXT_HTML, output);
  }

  private static MIMEContainer addMimeType(String mime) {
    return new MIMEContainer(new MIME(mime));
  }

  protected static MIMEContainer addMimeType(String mime, Object data) {
    return new MIMEContainer(mime, data.toString());
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
    return this.getMime() + " CODE = " + this.getData();
  }

  @Override
  public boolean equals(Object o) {
    return reflectionEquals(this, o);
  }

  @Override
  public int hashCode() {
    return reflectionHashCode(this);
  }

  private static HashMap<String, Object> paramsToMap(String ... params) {
    HashMap<String, Object> paramsMap = new HashMap<>();
    for (String param : params) {
      String parts[] = param.split("=");
      if (parts.length == 2){
        paramsMap.put(parts[0], parts[1]);
      }
    }
    return paramsMap;
  }

  private static String parseParams(HashMap paramsMap) {
    StringBuilder sb = new StringBuilder();
    for (Object key : paramsMap.keySet()){
      if (key.equals("width") || key.equals("height")) {
        continue;
      }
      sb.append("&").append(key.toString()).append("=").append(paramsMap.get(key).toString());
    }
    String result = sb.toString().replaceFirst("&", "?");
    return result.length() > 0 ? result : "";
  }

}