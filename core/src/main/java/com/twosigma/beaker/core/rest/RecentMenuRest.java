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
import com.twosigma.beaker.shared.module.util.GeneralUtils;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import org.apache.commons.collections.list.UnmodifiableList;
import org.apache.commons.lang3.StringUtils;

/**
 * Implementation of recent file manager that offers a RESTful API
 */
@Singleton
@Produces(MediaType.APPLICATION_JSON)
@Path("recent-menu")
@SuppressWarnings("unchecked")
public class RecentMenuRest {

  private final java.nio.file.Path recentDocumentsFile;
  private final List<String> recentDocuments;
  private final List<String> immutableRecentDocuments;
  private final GeneralUtils utils;

  @Inject
  public RecentMenuRest(BeakerConfig bkConfig, GeneralUtils utils) {
    this.utils = utils;
    this.recentDocumentsFile = Paths.get(bkConfig.getRecentNotebooksFileUrl());
    this.recentDocuments = new ArrayList<>();
    this.immutableRecentDocuments = UnmodifiableList.decorate(this.recentDocuments);

    // read from file -> _recentDocuments
    List<String> lines = new ArrayList<>();
    if (Files.exists(recentDocumentsFile)) {
      try {
        lines = Files.readAllLines(recentDocumentsFile, StandardCharsets.UTF_8);
      } catch (IOException ex) {
        Logger.getLogger(RecentMenuRest.class.getName()).log(Level.WARNING,
            "Failed to get recent documents", ex);
      }
    }
    for (String line: lines) {
       addRecentDocument(transformUrl(line.trim()));
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
    this.utils.saveFile(this.recentDocumentsFile,
        StringUtils.join(reverseView(getRecentDocuments()), "\n"));
  }

  private static List<String> reverseView(List<String> input) {
    List<String> ret = new ArrayList<>(input.size());
    for (int i = input.size() - 1; i >= 0; i--) {
        ret.add(input.get(i));
    }
    return ret;
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
