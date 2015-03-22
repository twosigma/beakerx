/*
 *  Copyright 2015 Michael Pymm
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
package com.twosigma.beaker.kdb.rest;

import com.google.inject.Inject;
import com.google.inject.Provider;
import com.google.inject.Singleton;
import com.twosigma.beaker.jvm.object.SimpleEvaluationObject;
import com.twosigma.beaker.jvm.serialization.BeakerObjectConverter;
import com.twosigma.beaker.kdb.KdbShell;

import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.logging.Logger;

/**
 * REST calls for the kdb plugin.
 *
 * TODO I'm assuming this is only called from one thread, so there's no synchronization. Is this right?
 */
@Path("kdb")
@Produces(MediaType.APPLICATION_JSON)
@Singleton
public class KdbRest {

    private int corePort;
    private final Map<String, KdbShell> shells = new HashMap<>();
    private final Provider<BeakerObjectConverter> objectSerializerProvider;

    @Inject
    public KdbRest(Provider<BeakerObjectConverter> objectSerializerProvider) {
        this.objectSerializerProvider = objectSerializerProvider;
    }

    /**
     * Set the port used for communication with the core beaker server.
     */
    public void setCorePort(int corePort) throws IOException {
        this.corePort = corePort;
    }

    @POST
    @Path("getShell")
    @Produces(MediaType.TEXT_PLAIN)
    public String getShell(
        @FormParam("shellid")   String shellId,
        @FormParam("sessionId") String sessionId
    )
        throws Exception
    {
        // Create a shell if necessary. Querying for an unknown shell creates a new one.
        if (shellId.isEmpty() || !shells.containsKey(shellId)) {
            shellId = UUID.randomUUID().toString();
            try {
                KdbShell shell = new KdbShell(shellId, sessionId, corePort, objectSerializerProvider.get());
                shells.put(shellId, shell);
            } catch (Exception e) {
                throw new Exception("Could not start kdb", e);
            }
        }
        return shellId;
    }

    @POST
    @Path("evaluate")
    public SimpleEvaluationObject evaluate(
        @FormParam("shellID") String shellId,
        @FormParam("code")    String code
    )
        throws InterruptedException
    {
        SimpleEvaluationObject obj = new SimpleEvaluationObject(code);
        obj.started();
        if (shells.containsKey(shellId)) {
            shells.get(shellId).evaluate(obj, code);
        } else {
            obj.error("Cannot find shell");
        }
        return obj;
    }

    @POST
    @Path("autocomplete")
    public List<String> autocomplete(
            @FormParam("shellID")       String shellId,
            @FormParam("code")          String code,
            @FormParam("caretPosition") int caretPosition
    )
        throws InterruptedException
    {
        KdbShell shell = shells.get(shellId);
        if (shell == null) {
            return null;
        } else {
            return shell.autocomplete(code, caretPosition);
        }
    }

    @POST
    @Path("interrupt")
    public void interrupt(@FormParam("shellID") String shellId) {
        KdbShell shell = shells.get(shellId);
        if (shell != null) {
            shell.cancelExecution();
        }
    }

    @POST
    @Path("exit")
    public void exit(@FormParam("shellID") String shellId) {
        KdbShell shell = shells.remove(shellId);
        if (shell != null) {
            shell.exit();
        }
    }
}
