package com.twosigma.beaker.sqlsh.utils;

import com.twosigma.beaker.NamespaceClient;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

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
public class BeakerParser
{
    public static final String DB_URI_VAR = "beakerDB";

    private List<String> vars = new ArrayList<>();
    private NamespaceClient client;
    private String dbURI;

    public BeakerParser(String script, NamespaceClient client) {
        this.client = client;
        parseVar(script);
    }

    private void parseVar(String script)
    {
        List<String> vars = new ArrayList<>();
        Scanner scanner = new Scanner(script);
        StringBuffer sb = new StringBuffer();

        while (scanner.hasNextLine())
        {
            String line = scanner.nextLine();
            line.trim();
            //ignore comments #
            int commentIndex = line.indexOf("%%");
            if (commentIndex != -1 && line.startsWith("%%"))
            {
                vars.add(line);
                if(line.indexOf(DB_URI_VAR) > 0);
                {

                }
            }
        }
    }
}
