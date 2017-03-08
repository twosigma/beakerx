package org.lappsgrid.jupyter.json;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

/**
 * The Serializer class is a very thin wrapper around the Jackson ObjectMapper class.
 * <p>
 * The Jackson ObjectMapper class is thread-safe as long as it is initialized in a
 * single thread and never modified. Once initialized static instances can be used
 * by multiple threads without further synchronization.
 * <p>
 * The Serializer provides two static instances, one instance that pretty prints JSON and one
 * instance that removes whitespace.
 *
 * @author Keith Suderman
 */
public class Serializer {
	
    private static ObjectMapper mapper;
    private static ObjectMapper prettyPrinter;
	
    static {
        mapper = new ObjectMapper();
        mapper.disable(SerializationFeature.INDENT_OUTPUT);
        mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
        prettyPrinter = new ObjectMapper();
        prettyPrinter.enable(SerializationFeature.INDENT_OUTPUT);
        prettyPrinter.setSerializationInclusion(JsonInclude.Include.NON_NULL);
    }
	
    private Serializer() {
    }

    /**
     * Parses a JSON string and creates an instance of the specified class.
     */
    public static <T> T parse(String json, Class<T> theClass) {
        T result = null;
        try {
            result = mapper.readValue(json, theClass);
        } catch (Exception e) {
            // Ignored. We return null to indicate an error.
        }

        return result;
    }

    /**
     * Returns a JSON representation of the object.
     */
    public static String toJson(Object object) {
        try {
            return mapper.writeValueAsString(object);
        } catch (Exception e) {
            return null;
        }

    }

    /**
     * Returns a pretty-printed JSON representation of the object.
     */
    public static String toPrettyJson(Object object) {
        try {
            return prettyPrinter.writeValueAsString(object);
        } catch (Exception e) {
            return null;
        }

    }
}