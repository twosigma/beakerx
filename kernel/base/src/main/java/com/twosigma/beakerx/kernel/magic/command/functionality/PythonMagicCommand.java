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
package com.twosigma.beakerx.kernel.magic.command.functionality;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.twosigma.beakerx.kernel.KernelFunctionality;
import com.twosigma.beakerx.kernel.PythonEntryPoint;
import com.twosigma.beakerx.kernel.magic.command.MagicCommandExecutionParam;
import com.twosigma.beakerx.kernel.magic.command.MagicCommandFunctionality;
import com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutcomeItem;
import com.twosigma.beakerx.kernel.magic.command.outcome.MagicKernelResponse;
import com.twosigma.beakerx.message.Header;
import com.twosigma.beakerx.message.Message;
import py4j.ClientServer;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class PythonMagicCommand implements MagicCommandFunctionality {

    public static final String PYTHON = "%%python";
    private KernelFunctionality kernel;

    public PythonMagicCommand(KernelFunctionality kernel) {
        this.kernel = kernel;
    }

    @Override
    public MagicCommandOutcomeItem execute(MagicCommandExecutionParam param) {
        PythonEntryPoint pep = getPythonEntryPoint(kernel);
        String codeBlock = param.getCommandCodeBlock();
        pep.evaluate(codeBlock);
        pep.getShellMsg();
        String msg = "";
        List<Message> messages = new ArrayList<>();
        while (!msg.equals("None")){
            msg = pep.getIopubMsg();
            try {
                Message message = parseMessage(msg);
                messages.add(message);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return new MagicKernelResponse(MagicCommandOutcomeItem.Status.OK, messages);
    }

    public Message parseMessage(String stringJson) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        if (!stringJson.equals("None")) {
            stringJson = stringJson.replaceAll("None", "null");
            stringJson = stringJson.replaceAll("False", "false");
            stringJson = stringJson.replaceAll("True", "true");
        }
        JsonNode json = mapper.readTree(stringJson.replace('\'','\"'));
        Message msg = new Message();
        msg.setContent(mapper.convertValue(json.get("content"), Map.class));
        msg.setMetadata(mapper.convertValue(json.get("metadata"), Map.class));
        msg.setBuffers(mapper.convertValue(json.get("buffers"), List.class));
        List<byte[]> identities = mapper.convertValue(json.get("comm_id"), List.class);
        msg.setIdentities(identities == null ? new ArrayList<>() : identities);
        msg.setHeader(mapper.convertValue(json.get("header"), Header.class));
        return msg;
    }

    private PythonEntryPoint getPythonEntryPoint(KernelFunctionality kernel) {
        ClientServer cs = kernel.getPythonMagicCS();
        return (PythonEntryPoint) cs.getPythonServerEntryPoint(new Class[] {PythonEntryPoint.class});
    }

    @Override
    public String getMagicCommandName() {
        return PYTHON;
    }
}
