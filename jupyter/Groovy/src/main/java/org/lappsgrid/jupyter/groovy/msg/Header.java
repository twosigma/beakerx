package org.lappsgrid.jupyter.groovy.msg;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import org.lappsgrid.jupyter.groovy.GroovyKernel;
import org.lappsgrid.jupyter.groovy.json.Serializer;

import java.util.Map;

/**
 * The ZMQ header included with each message.
 *
 * @author Keith Suderman
 */
@JsonPropertyOrder({"id", "username", "session", "date", "type", "version"})
public class Header {
    public Header() {
    }

    public Header(Header header) {
        this.id = header.id;
        this.date = header.date;
        this.username = header.username;
        this.session = header.session;
        this.type = header.type;
        this.version = header.version;
    }

    public Header(Map<String, String> header) {
        this.id = header.get("id");
        this.date = header.get("date");
        this.username = header.get("username");
        this.session = header.get("session");
        this.type = header.get("type");
        this.version = header.get("version") != null ? header.get("version") : "5.0";
    }

    @Deprecated
    public Header(String type, Message message) {
        this(type, message.getHeader().session);
    }

    public Header(String type, String session) {
        date = GroovyKernel.timestamp();
        id = GroovyKernel.uuid();
        username = "kernel";
        this.type = type;
        this.session = session;
        this.version = "5.0";
    }

    public String asJson() {
        return Serializer.toJson(this);
    }

    public String prettyPrint() {
        return Serializer.toPrettyJson(this);
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getSession() {
        return session;
    }

    public void setSession(String session) {
        this.session = session;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    private String date;
    @JsonProperty("msg_id")
    private String id;
    private String username;
    private String session;
    @JsonProperty("msg_type")
    private String type;
    private String version;
}
