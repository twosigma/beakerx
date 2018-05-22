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
package com.twosigma.beakerx.kernel.magic.command.functionality.kernelMagic;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.twosigma.beakerx.kernel.KernelFunctionality;
import com.twosigma.beakerx.kernel.NoSuchKernelException;
import com.twosigma.beakerx.kernel.PythonEntryPoint;
import com.twosigma.beakerx.kernel.magic.command.MagicCommandExecutionParam;
import com.twosigma.beakerx.kernel.magic.command.MagicCommandFunctionality;
import com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutcomeItem;
import com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutput;
import com.twosigma.beakerx.kernel.magic.command.outcome.MagicKernelResponse;
import com.twosigma.beakerx.message.Header;
import com.twosigma.beakerx.message.Message;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class KernelMagicCommand implements MagicCommandFunctionality {

    public static final String KERNEL = "%%kernel";
    public static final String KERNEL_MAGIC_FORMAT_ERROR =
            "Wrong command format, should be " + KERNEL + " [kernel name]\n"
            + " code";
    private KernelFunctionality kernel;

    public KernelMagicCommand(KernelFunctionality kernel) {
        this.kernel = kernel;
    }

    @Override
    public MagicCommandOutcomeItem execute(MagicCommandExecutionParam param) {
        PythonEntryPoint pep;
        if (!validateCommandFormat(param)) {
            return new MagicCommandOutput(MagicCommandOutput.Status.ERROR, getFormatErrorMessage());
        }
        String kernelName = getKernelName(param);
        try {
            pep = kernel.getPythonEntryPoint(kernelName);
        } catch (NoSuchKernelException e) {
            return new MagicCommandOutput(MagicCommandOutput.Status.ERROR, String.format("Kernel %s is not available!", e.getMessage()));
        }
        String codeBlock = param.getCommandCodeBlock();
        pep.evaluate(codeBlock);
        pep.getShellMsg();
        List<Message> messages = new ArrayList<>();
        //until there are messages on iopub channel available collect them into response
        while (true) {
            String iopubMsg = pep.getIopubMsg();
            if (iopubMsg.equals("null")) break;
            try {
                Message msg = parseMessage(iopubMsg);
                messages.add(msg);
                String commId = (String) msg.getContent().get("comm_id");
                if (commId != null) {
                    kernel.addCommIdManagerMapping(commId, kernelName);
                }
            } catch (IOException e) {
                return new MagicKernelResponse(MagicCommandOutcomeItem.Status.ERROR, messages);
            }
        }
        return new MagicKernelResponse(MagicCommandOutcomeItem.Status.OK, messages);
    }

    protected String getKernelName(MagicCommandExecutionParam param) {
        return param.getCommand().split(" ")[1].trim();
    }

    protected String getFormatErrorMessage() {
        return KERNEL_MAGIC_FORMAT_ERROR;
    }

    protected boolean validateCommandFormat(MagicCommandExecutionParam param) {
        String [] magicArgs = param.getCommand().split(" ");
        return !(magicArgs.length != 2 || param.getCommandCodeBlock().trim().isEmpty());
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

    @Override
    public String getMagicCommandName() {
        return KERNEL;
    }
}
