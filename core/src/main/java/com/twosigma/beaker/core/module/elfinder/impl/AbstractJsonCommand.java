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

import com.twosigma.beaker.core.module.elfinder.util.exceptions.ErrorException;
import com.twosigma.beaker.core.module.elfinder.service.FsService;
import org.json.JSONArray;
import org.json.JSONObject;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;

public abstract class AbstractJsonCommand extends AbstractCommand {
  @Override
  final public void execute(FsService fsService, HttpServletRequest request, HttpServletResponse response,
                            ServletContext servletContext) throws Exception {
    JSONObject json = new JSONObject();
    try {
      execute(fsService, request, servletContext, json);
    } catch (ErrorException e) {
      if (e.getArgs() == null || e.getArgs().length == 0) {
        json.put("error", e.getError());
      } else {
        JSONArray errors = new JSONArray();
        errors.put(e.getError());
        for (String arg : e.getArgs()) {
          errors.put(arg);
        }
        json.put("error", errors);
      }
    } catch (Exception e) {
      e.printStackTrace();
      json.put("error", e.getMessage());
    } finally {
      response.setContentType("text/html; charset=UTF-8");

      PrintWriter writer = response.getWriter();
      json.write(writer);
      writer.flush();
      writer.close();
    }
  }

  protected abstract void execute(FsService fsService,
                                  HttpServletRequest request,
                                  ServletContext servletContext,
                                  JSONObject json) throws Exception;

}