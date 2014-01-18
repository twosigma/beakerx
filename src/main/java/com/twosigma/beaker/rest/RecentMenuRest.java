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

package com.twosigma.beaker.rest;

import com.google.inject.Singleton;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
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
 * @author alee
 */
@Singleton
@Produces(MediaType.APPLICATION_JSON)
@Path("recent")
@SuppressWarnings("unchecked")
public class RecentMenuRest {
    private static String BEAKR_DIRECTORY_NAME = ".beaker";
    private static String CONFIGURATION_DIRECTORY_NAME = "conf";
    private static String RECENT_DOCUMENTS_FILE_NAME = "recentDocuments";
    private static File _recentDocumentsDirectory;
    private final File _recentDocumentsFile;
    private final List<String> _recentDocuments;
    private final List<String> _immutableRecentDocuments;

    public RecentMenuRest() {
        File homeDirectory = new File(System.getProperty("user.home"));
        _recentDocumentsDirectory = new File(
                homeDirectory,
                BEAKR_DIRECTORY_NAME + "/" + CONFIGURATION_DIRECTORY_NAME);
        _recentDocumentsDirectory.mkdir();
        _recentDocumentsFile = new File(
                _recentDocumentsDirectory,
                RECENT_DOCUMENTS_FILE_NAME);
        _recentDocuments = new ArrayList<String>();
        _immutableRecentDocuments = UnmodifiableList.decorate(_recentDocuments);

        // read from file -> _recentDocuments
        if (_recentDocumentsFile.exists()) {
            BufferedReader bufferedReader;
            try {
                bufferedReader = new BufferedReader(new InputStreamReader(
                    new FileInputStream(_recentDocumentsFile)));
            } catch (IOException ex) {
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
        return _immutableRecentDocuments;
    }

    private void addRecentDocument(String docName) {
        if (_recentDocuments.contains(docName)) {
            _recentDocuments.remove(docName);
        }
        _recentDocuments.add(0, transformUrl(docName));
    }

    private void recordToFile()
            throws IOException
    {
        Writer writer = new OutputStreamWriter(
            new FileOutputStream(_recentDocumentsFile));
        try {
            for (int i = _recentDocuments.size() - 1; i >= 0; --i) {
                writer.write(_recentDocuments.get(i));
                writer.write("\n");
            }
        } finally {
            writer.close();
        }
    }
    private static String transformUrl(String input) {
        String ret;
        if (input.contains(":/")) {
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
    public void addItem(@FormParam("item") String item)
            throws IOException
    {
        addRecentDocument(item);
        recordToFile();
    }

    @POST
    @Path("clear")
    public void clear()
            throws IOException
    {
        _recentDocuments.clear();
        recordToFile();
    }
}
