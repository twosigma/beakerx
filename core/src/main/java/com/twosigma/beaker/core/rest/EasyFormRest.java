package com.twosigma.beaker.core.rest;

import com.google.inject.Inject;
import com.google.inject.Singleton;

import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import java.io.IOException;

@Path("easyform")
@Produces(MediaType.APPLICATION_JSON)
@Singleton
public class EasyFormRest {

    private static final String legalNamePattern = "[a-zA-Z_][a-zA-Z0-9_]*";

    @Inject
    private EasyFormService easyformService;

    @GET
    @Path("get")
    public Object get(@QueryParam("session") String session, @QueryParam("name") String name)
            throws Exception {
        return this.easyformService.get(session, name);
    }

    @POST
    @Path("set")
    public String set(@FormParam("session") String session, @FormParam("name") String name,
                      @FormParam("value") String value, @FormParam("publish") Boolean publish)
            throws IOException, InterruptedException {
        if (!name.matches(legalNamePattern)) {
            return ("name is illegal for notebook namespace: \'" + name + "\'");
        }
        this.easyformService.set(session, name, value, publish);
        return "ok";
    }
}
