package org.lappsgrid.jupyter.groovy.handler;

import static com.twosigma.jupyter.groovy.msg.Type.COMPLETE_REPLY;

import java.io.Serializable;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.Map;

import org.codehaus.groovy.runtime.StringGroovyMethods;
import org.lappsgrid.jupyter.groovy.GroovyKernel;
import org.lappsgrid.jupyter.groovy.msg.Header;
import org.lappsgrid.jupyter.groovy.msg.Message;
import org.slf4j.LoggerFactory;

import groovy.lang.GroovyClassLoader;

/**
 * The code completion handler. The CompleteHandler is called by Jupyter to
 * determine if the line of code just entered should be executed immediately or
 * if more input is required. It also compiles the code to ensure that it is
 * valid.
 *
 * @author Keith Suderman
 */
public class CompleteHandler extends AbstractHandler {

  private GroovyClassLoader compiler;
  private static final String COMPLETE_CHARS = "\"\'};])";
  private static final String INCOMPLETE_CHARS = "([:=";
  private String waitingFor = null;

  public CompleteHandler(GroovyKernel kernel) {
    super(kernel);
    logger = LoggerFactory.getLogger(CompleteHandler.class);
    compiler = new GroovyClassLoader();
  }

  public void handle(Message message) throws NoSuchAlgorithmException {
    String code = ((String) message.getContent().get("code")).trim();
    logger.debug("Checking code: {}", code);

    // One of 'complete', 'incomplete', 'invalid', 'unknown'
    String status = "unknown";
    String ch = StringGroovyMethods.getAt(code, -1);
    if (ch.equals("{")) {
      waitingFor = "}";
      status = "incomplete";
    } else if (StringGroovyMethods.asBoolean(waitingFor)) {
      if (ch.equals(waitingFor)) {
        status = "complete";
        waitingFor = null;
      } else {
        status = "incomplete";
      }

    } else if (INCOMPLETE_CHARS.contains(ch)) {
      logger.trace("Incomplete due to char {}", ch);
      status = "incomplete";
    } else if (COMPLETE_CHARS.contains(ch)) {
      logger.trace("Complete due to char {}", ch);
      status = "complete";
    } else {
      try {
        logger.trace("Attempting to compile code.");
        compiler.parseClass(code);
        logger.trace("Complete");
        status = "complete";
      } catch (Exception e) {
        logger.debug("Invalid: {}", e.getMessage());
      }

    }

    Message reply = new Message();
    reply.setHeader(new Header(COMPLETE_REPLY, message.getHeader().getSession()));
    reply.setIdentities(message.getIdentities());
    reply.setParentHeader(message.getHeader());
    Map<String, Serializable> map = new HashMap<String, Serializable>();
    map.put("status", status);
    reply.setContent(map);
    send(reply);
  }

}