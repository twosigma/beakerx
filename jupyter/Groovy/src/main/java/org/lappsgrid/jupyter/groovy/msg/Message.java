package org.lappsgrid.jupyter.groovy.msg;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import org.lappsgrid.jupyter.groovy.GroovyKernel;
import org.lappsgrid.jupyter.groovy.json.Serializer;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Defines the wire protocol used for messages exchanged with Jupyter.
 *
 * @author Keith Suderman
 */
@JsonPropertyOrder({"identities", "header", "parentHeader", "metadata", "content"})
public class Message {
	
    public Message() {
        header = new Header();
        header.setDate(GroovyKernel.timestamp());
    }
	
    public Message(String type) {
        header = new Header();
        header.setType(type);
        header.setDate(GroovyKernel.timestamp());
    }

    public String type() {
        return header.getType();
    }

    public String asJson() {
        return Serializer.toJson(this);
    }

    public List<byte[]> getIdentities() {
        return identities;
    }

    public void setIdentities(List<byte[]> identities) {
        this.identities = identities;
    }

    public Header getHeader() {
        return header;
    }

    public void setHeader(Header header) {
        this.header = header;
    }

    public Header getParentHeader() {
        return parentHeader;
    }

    public void setParentHeader(Header parentHeader) {
        this.parentHeader = parentHeader;
    }

    public Map<String,Serializable> getMetadata() {
        return metadata;
    }

    public void setMetadata(Map<String,Serializable> metadata) {
        this.metadata = metadata;
    }

    public Map<String, Serializable> getContent() {
        return content;
    }

    public void setContent(Map<String, Serializable> content) {
        this.content = content;
    }

    private List<byte[]> identities = new ArrayList<byte[]> ();
    private Header header;
    @JsonProperty("parent_header")
    private Header parentHeader;
    private Map<String,Serializable> metadata;
    private Map<String,Serializable> content;

    /**
     * Definitions of the strings used as message type values.
     */
    public static class Type {
        public static final String KERNEL_INFO_REQUEST = "kernel_info_request";
        public static final String KERNEL_INFO_REPLY = "kernel_info_reply";
        public static final String EXECUTE_REQUEST = "execute_request";
        public static final String EXECUTE_INPUT = "execute_input";
        public static final String EXECUTE_RESULT = "execute_result";
        public static final String EXECUTE_REPLY = "execute_reply";
        public static final String COMPLETE_REQUEST = "is_complete_request";
        public static final String COMPLETE_REPLY = "is_complete_reply";
        public static final String HISTORY_REQUEST = "history_request";
        public static final String HISTORY_REPLY = "history_reply";
        public static final String STATUS = "status";
        public static final String STREAM = "stream";
        public static final String SHUTDOWN_REQUEST = "shutdown_request";
        public static final String SHUTDOWN_REPLY = "shutdown_reply";
        public static final String UNDEFINED = "undefined";
    }
}
