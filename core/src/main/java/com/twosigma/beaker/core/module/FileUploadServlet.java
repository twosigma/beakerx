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
package com.twosigma.beaker.core.module;

import com.google.inject.Singleton;
import java.io.IOException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import javax.servlet.MultipartConfigElement;
import org.eclipse.jetty.server.Request;

@Singleton 
public class FileUploadServlet extends HttpServlet {
  private static final MultipartConfigElement MULTI_PART_CONFIG =
    new MultipartConfigElement((String)null);

  public void doPost(HttpServletRequest request, HttpServletResponse response) {
    // For some reason @MultipartConfig annotation on this servlet
    // does not work, possibly because our jetty config is dynamic.
    // This is the workaround.
    if (request.getContentType() != null &&
        request.getContentType().startsWith("multipart/form-data")) {
      request.setAttribute(Request.__MULTIPART_CONFIG_ELEMENT, MULTI_PART_CONFIG);
    }
    try {
      // Should confirm there is exactly one part.
      for (Part part : request.getParts()) {
        byte[] contents = new byte[(int) part.getSize()];
        // Should stream from input to output instead of buffering it
        // all into RAM.
        part.getInputStream().read(contents);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().print(new String(contents, "UTF-8"));
      }
    } catch (Exception e) {
      e.printStackTrace();
    }
  }
}
