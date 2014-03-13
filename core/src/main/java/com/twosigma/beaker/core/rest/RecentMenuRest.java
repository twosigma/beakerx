/*
 *  Copyright 2014 TWO SIGMA INVESTMENTS, LLC
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
package com.twosigma.beaker.core.rest;

import com.google.inject.Inject;
import com.google.inject.Singleton;
import com.twosigma.beaker.core.module.config.BeakerConfig;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.util.ArrayList;
import java.util.List;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import org.apache.commons.collections.list.UnmodifiableList;

/**
 * Implementation of recent file manager that offers a RESTful API
 */
@Singleton
@Produces(MediaType.APPLICATION_JSON)
@Path("recent-menu")
@SuppressWarnings("unchecked")
public class RecentMenuRest {

  private final File recentDocumentsFile;
  private final List<String> recentDocuments;
  private final List<String> immutableRecentDocuments;

  @Inject
  public RecentMenuRest(BeakerConfig bkConfig) {
    this.recentDocumentsFile = new File(bkConfig.getRecentNotebooksFileUrl());
    this.recentDocuments = new ArrayList<>();
    this.immutableRecentDocuments = UnmodifiableList.decorate(this.recentDocuments);

    // read from file -> _recentDocuments
    if (this.recentDocumentsFile.exists()) {
      BufferedReader bufferedReader;
      try {
        bufferedReader = new BufferedReader(new InputStreamReader(
                new FileInputStream(this.recentDocumentsFile)));
      } catch (FileNotFoundException ex) {
        return;
      }
      try {
        String line = bufferedReader.readLine();
        while (line != null && !line.trim().equals("")) {
          addRecentDocument(transformUrl(line.trim()));
          line = bufferedReader.readLine();
        }
      } catch (IOException ex) {
      } finally {
        try {
          bufferedReader.close();
        } catch (IOException ex) {
        }
      }
    }
  }

  private List<String> getRecentDocuments() {
    return this.immutableRecentDocuments;
  }

  private void addRecentDocument(String docName) {
    if (this.recentDocuments.contains(docName)) {
      this.recentDocuments.remove(docName);
    }
    this.recentDocuments.add(0, transformUrl(docName));
  }

  private void recordToFile() throws IOException {
    try (Writer writer = new OutputStreamWriter(new FileOutputStream(this.recentDocumentsFile))) {
      for (int i = this.recentDocuments.size() - 1; i >= 0; --i) {
        writer.write(this.recentDocuments.get(i));
        writer.write("\n");
      }
    }
  }

  private static String transformUrl(String input) {
    String ret;
    if (input.contains(":/") || input.startsWith("file:")) {
      ret = input;
    } else {
      ret = "file:" + input;
    }
    return ret;
  }

  @GET
  @Path("getItems")
  public List<String> getItems() {
    return getRecentDocuments();
  }

  @POST
  @Path("addItem")
  public void addItem(@FormParam("item") String item) throws IOException {
    addRecentDocument(item);
    recordToFile();
  }

  @POST
  @Path("clear")
  public void clear() throws IOException {
    this.recentDocuments.clear();
    recordToFile();
  }
}
