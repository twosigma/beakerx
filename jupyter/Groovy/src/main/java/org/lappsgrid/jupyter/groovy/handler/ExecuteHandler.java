package org.lappsgrid.jupyter.groovy.handler;

import com.twosigma.beaker.SerializeToString;
import groovy.lang.Binding;
import groovy.lang.GroovyShell;
import groovy.lang.Script;
import org.codehaus.groovy.control.CompilerConfiguration;
import org.codehaus.groovy.runtime.DefaultGroovyMethods;
import org.lappsgrid.jupyter.groovy.GroovyKernel;
import org.lappsgrid.jupyter.groovy.msg.Header;
import org.lappsgrid.jupyter.groovy.msg.Message;
import org.slf4j.LoggerFactory;

import java.io.Serializable;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.Map;
import java.util.Set;

import static org.lappsgrid.jupyter.groovy.msg.Message.Type.*;

/**
 * Does the actual work of executing user code.
 *
 * @author Keith Suderman
 */
public class ExecuteHandler extends AbstractHandler {
    public ExecuteHandler(GroovyKernel kernel) {
        super(kernel);
        logger = LoggerFactory.getLogger(ExecuteHandler.class);
        executionCount = 0;
        binding = new Binding();
        CompilerConfiguration configuration = kernel.getContext().getCompilerConfiguration();
        compiler = new GroovyShell(this.getClass().getClassLoader(), binding, configuration);
    }

    public void handle(Message message) throws NoSuchAlgorithmException {
        logger.info("Processing execute request");
        Message reply = new Message();
        Map<String, Serializable> map = new HashMap<String, Serializable>(1);
        map.put("execution_state", "busy");
        reply.setContent(map);
        reply.setHeader(new Header(STATUS, message));
        reply.setParentHeader(message.getHeader());
        reply.setIdentities(message.getIdentities());
        publish(reply);

        // Get the code to be executed from the message.
        String code = ((String)message.getContent().get("code")).trim();

        // Announce that we have the code.
        reply.setHeader(new Header(EXECUTE_INPUT, message));
        Map<String, Serializable> map1 = new HashMap<String, Serializable>(2);
        map1.put("execution_count", executionCount);
        map1.put("code", code);
        reply.setContent(map1);
        publish(reply);

        // Now try compiling and running the code.
        Exception error = null;
        try {
            logger.debug("Running: {}", code);
            Script script = compiler.parse(code);
            script.setMetaClass(kernel.getContext().getMetaClass(script.getClass()));
            logger.trace("code compiled");
            Object result = script.run();
            logger.trace("Ran script");
            if (!DefaultGroovyMethods.asBoolean(result)) {
                result = "Cell returned null.";
            }

            executionCount = ++executionCount;
            logger.debug("Result is {}", result);

            // Publish the result of the execution.
            reply.setHeader(new Header(EXECUTE_RESULT, message));
            String resultString = SerializeToString.doit(result);
            
            Boolean resultHtml = resultString.startsWith("<html>") && resultString.endsWith("</html>");
            Hashtable<String, Serializable> map2 = new Hashtable<String, Serializable>(3);
            map2.put("execution_count", executionCount);
            Hashtable<String, String> map3 = new Hashtable<String, String>(1);
            map3.put(resultHtml ? "text/html" : "text/plain", resultString);
            map2.put("data", map3);
            map2.put("metadata", new Hashtable());
            reply.setContent(map2);
            publish(reply);
        } catch (Exception e) {
            //e.printStackTrace()
            logger.error("Unable to execute code block.", e);
            error = e;
            reply.setHeader(new Header(STREAM, message));
            Hashtable<String, Serializable> map4 = new Hashtable<String, Serializable>(2);
            map4.put("name", "stderr");
            map4.put("text", e.getMessage());
            reply.setContent(map4);
            publish(reply);
        }


        // Tell Jupyter that this kernel is idle again.
        reply.setHeader(new Header(STATUS, message));
        Hashtable<String, Serializable> map5 = new Hashtable<String, Serializable>(1);
        map5.put("execution_state", "idle");
        reply.setContent(map5);
        publish(reply);

        // Send the REPLY to the original message. This is NOT the result of
        // executing the cell.  This is the equivalent of 'exit 0' or 'exit 1'
        // at the end of a shell script.
        reply.setHeader(new Header(EXECUTE_REPLY, message));
        Hashtable<String, Serializable> map6 = new Hashtable<String, Serializable>(3);
        map6.put("dependencies_met", true);
        map6.put("engine", kernel.getId());
        map6.put("started", kernel.timestamp());
        reply.setMetadata(map6);
        Hashtable<String, Serializable> map7 = new Hashtable<String, Serializable>(1);
        map7.put("execution_count", executionCount);
        reply.setContent(map7);
        if (error != null) {
            reply.getMetadata().put("status", "error");
            reply.getContent().put("status", "error");
            reply.getContent().put("ename", error.getClass().getName());
            reply.getContent().put("evalue", error.getMessage());
        } else {
            reply.getMetadata().put("status", "ok");
            reply.getContent().put("status", "ok");
            reply.getContent().put("user_expressions", new HashMap<>());
        }

        send(reply);
    }

    public int getExecutionCount() {
        return executionCount;
    }

    public void setExecutionCount(int executionCount) {
        this.executionCount = executionCount;
    }

    public Binding getBinding() {
        return binding;
    }

    public void setBinding(Binding binding) {
        this.binding = binding;
    }

    public GroovyShell getCompiler() {
        return compiler;
    }

    public void setCompiler(GroovyShell compiler) {
        this.compiler = compiler;
    }

    public Set<String> getIncluded() {
        return included;
    }

    public void setIncluded(Set<String> included) {
        this.included = included;
    }

    private int executionCount;
    private Binding binding;
    private GroovyShell compiler;
    private Set<String> included;
}
