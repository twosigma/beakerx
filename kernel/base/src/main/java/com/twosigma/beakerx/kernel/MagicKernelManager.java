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
import py4j.GatewayServer;

import javax.net.ServerSocketFactory;
import javax.net.SocketFactory;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.ServerSocket;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class MagicKernelManager {

    ClientServer clientServer = null;
    private PythonEntryPoint pep = null;
    private Process pythonProcess = null;

    private static String DEFAULT_PORT = "25333";
    private static String DEFAULT_PYTHON_PORT = "25334";
    private static int NO_SUCH_KERNEL_CODE = 2;
    private static String PY4J_INIT_MESSAGE = "Py4j server is running";

    private Integer port = null;
    private Integer pythonPort = null;

    private final String kernelName;

    public MagicKernelManager(String kernelName) {
        this.kernelName = kernelName;
    }

    private void initPythonProcess() throws NoSuchKernelException {
        //cleanup communication resources if already in use
        exit();

        port = findFreePort();
        pythonPort = findFreePort();

        try {
            ProcessBuilder pb = new ProcessBuilder(getPy4jCommand());
            pb.redirectError(ProcessBuilder.Redirect.INHERIT);
            pythonProcess = pb.start();
            BufferedReader br = new BufferedReader(new InputStreamReader(pythonProcess.getInputStream()));
            while (!PY4J_INIT_MESSAGE.equals(br.readLine()) && pythonProcess.isAlive()){
                //wait for python process to initialize properly
            }
            if (!pythonProcess.isAlive() && pythonProcess.exitValue() == NO_SUCH_KERNEL_CODE) {
                throw new NoSuchKernelException(kernelName);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    protected String[] getPy4jCommand() {
        return new String[] {
                "beakerx",
                "py4j_server",
                "--port", port == null ? DEFAULT_PORT : String.valueOf(port),
                "--pyport", pythonPort == null ? DEFAULT_PYTHON_PORT : String.valueOf(pythonPort),
                "--kernel", kernelName
        };
    }

    public void exit() {
        if (pep != null) {
            pep.shutdownKernel();
            pep = null;
        }
        if (clientServer != null) {
            clientServer.shutdown();
            clientServer = null;
        }
        if (pythonProcess != null) {
            pythonProcess.destroy();
            pythonProcess = null;
        }
    }

    public PythonEntryPoint getPythonEntryPoint() throws NoSuchKernelException {
        if (pythonProcess == null || !pythonProcess.isAlive() || clientServer == null) {
            initPythonProcess();
        }
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
        this.clientServer = new ClientServer(port, GatewayServer.defaultAddress(), pythonPort,
                GatewayServer.defaultAddress(), GatewayServer.DEFAULT_CONNECT_TIMEOUT,
                GatewayServer.DEFAULT_READ_TIMEOUT, ServerSocketFactory.getDefault(), SocketFactory.getDefault(), null);
    }

    private List<Message> getIopubMessages() throws IOException {
        List<Message> messages = new ArrayList<>();
        while (true) {
            String iopubMsg = pep.getIopubMsg();
            if (iopubMsg.equals("null")) break;
            messages.add(parseMessage(iopubMsg));
        }
        return messages;
    }

    private Message parseMessage(String stringJson) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        JsonNode json = mapper.readTree(stringJson);
        Message msg = new Message(mapper.convertValue(json.get("header"), Header.class));
        msg.setContent(mapper.convertValue(json.get("content"), Map.class));
        msg.setMetadata(mapper.convertValue(json.get("metadata"), Map.class));
        msg.setBuffers(mapper.convertValue(json.get("buffers"), List.class));
        List<byte[]> identities = mapper.convertValue(json.get("comm_id"), List.class);
        msg.setIdentities(identities == null ? new ArrayList<>() : identities);
        return msg;
    }

    public List<Message> handleMsg(Message message) {
        List<Message> messages = new ArrayList<>();
        try {
            getPythonEntryPoint();
        } catch (NoSuchKernelException e) {
            return messages;
        }
        pep.sendMessage(new ObjectMapper().valueToTree(message).toString());

        try {
            messages = getIopubMessages();
        } catch (IOException e) {
            e.printStackTrace();
        }

        for (Message msg : messages) {
            msg.setParentHeader(message.getHeader());
        }
        return messages;
    }

    private Integer findFreePort() {
        ServerSocket socket = null;
        try {
            socket = new ServerSocket(0);
            socket.setReuseAddress(true);
            int port = socket.getLocalPort();
            try {
                socket.close();
            } catch (IOException e) {
            }
            return port;
        } catch (IOException e) {
        } finally {
            if (socket != null) {
                try {
                    socket.close();
                } catch (IOException e) {
                }
            }
        }
        return null;
    }
}
