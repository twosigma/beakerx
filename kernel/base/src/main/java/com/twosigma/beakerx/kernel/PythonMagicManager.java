/*
 *  Copyright 2017 TWO SIGMA OPEN SOURCE, LLC
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *import static org.assertj.core.api.Assertions.assertThat;
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
package com.twosigma.beakerx.kernel;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.twosigma.beakerx.message.Header;
import com.twosigma.beakerx.message.Message;
import py4j.ClientServer;
import py4j.Py4JException;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class PythonMagicManager {

    private static String PY4J_SCRIPT_NAME = "/beakerx_magics/python_magic.py";
    private static String PYTHON = "python3";

    ClientServer clientServer = null;
    PythonEntryPoint pep = null;
    Process pythonProcess = null;

    public PythonMagicManager() {
        String home = System.getenv("BEAKERX_HOME");
        if (home != null) {
            try {
                String pyScriptPath = new File(home).getParentFile().toString();
                String[] cmd = {PYTHON, pyScriptPath + PY4J_SCRIPT_NAME};
                this.pythonProcess = new ProcessBuilder(cmd).start();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    public void exit() {
        if (pep != null) {
            pep.shutdownKernel();
        }
        if (clientServer != null) {
            this.clientServer.shutdown();
        }
        if (pythonProcess != null) {
            pythonProcess.destroy();
        }
    }

    public PythonEntryPoint getPythonEntryPoint() {
        if (pep == null) {
            this.pep = initPythonEntryPoint();
        }
        return pep;
    }

    private PythonEntryPoint initPythonEntryPoint() {
        if (this.clientServer == null) {
            initClientServer();
        }
        return (PythonEntryPoint) clientServer.getPythonServerEntryPoint(new Class[] {PythonEntryPoint.class});
    }

    private void initClientServer() {
        this.clientServer = new ClientServer(null);
    }

    private String createJson(Message message) {
        return message.toString();
    }

    public List<Message> getIopubMessages() throws IOException {
        List<Message> messages = new ArrayList<>();
        while (true) {
            String iopubMsg = pep.getIopubMsg();
            if (iopubMsg.equals("null")) break;
            messages.add(parseMessage(iopubMsg));
        }
        return messages;
    }

    public Message parseMessage(String stringJson) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        Message msg = new Message();
        JsonNode json = mapper.readTree(stringJson);
        msg.setContent(mapper.convertValue(json.get("content"), Map.class));
        msg.setMetadata(mapper.convertValue(json.get("metadata"), Map.class));
        msg.setBuffers(mapper.convertValue(json.get("buffers"), List.class));
        List<byte[]> identities = mapper.convertValue(json.get("comm_id"), List.class);
        msg.setIdentities(identities == null ? new ArrayList<>() : identities);
        msg.setHeader(mapper.convertValue(json.get("header"), Header.class));
        return msg;
    }
}
