package org.lappsgrid.jupyter.groovy.handler;

import static com.twosigma.beaker.jupyter.msg.JupyterMessages.COMPLETE_REPLY;

import java.io.Serializable;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.Map;

import com.twosigma.beaker.groovy.autocomplete.AutocompleteResult;
import com.twosigma.beaker.groovy.evaluator.GroovyEvaluatorManager;
import org.lappsgrid.jupyter.groovy.GroovyKernelFunctionality;
import org.lappsgrid.jupyter.groovy.msg.Header;
import org.lappsgrid.jupyter.groovy.msg.Message;
import org.slf4j.LoggerFactory;

/**
 * The code completion handler. The CompleteHandler is called by Jupyter to
 * determine if the line of code just entered should be executed immediately or
 * if more input is required. It also compiles the code to ensure that it is
 * valid.
 *
 * @author Keith Suderman
 */
public class CompleteHandler extends AbstractHandler<Message> {

  public static final String STATUS = "status";
  public static final String MATCHES = "matches";
  public static final String CURSOR_END = "cursor_end";
  public static final String CURSOR_START = "cursor_start";
  public static final String CODE = "code";
  public static final String CURSOR_POS = "cursor_pos";

  private GroovyEvaluatorManager evaluatorManager;

  public CompleteHandler(GroovyKernelFunctionality kernel) {
    super(kernel);
    logger = LoggerFactory.getLogger(CompleteHandler.class);
    evaluatorManager = new GroovyEvaluatorManager(kernel);
  }

  @Override
  public void handle(Message message) throws NoSuchAlgorithmException {
    String code = ((String) message.getContent().get(CODE)).trim();
    int cursorPos = ((int) message.getContent().get(CURSOR_POS));

    AutocompleteResult autocomplete = evaluatorManager.autocomplete(code, cursorPos);

    Message reply = new Message();
    reply.setHeader(new Header(COMPLETE_REPLY, message.getHeader().getSession()));
    reply.setIdentities(message.getIdentities());
    reply.setParentHeader(message.getHeader());
    Map<String, Serializable> content = new HashMap<String, Serializable>();
    content.put(STATUS, "ok");
    content.put(MATCHES, autocomplete.getMatches().toArray());
    content.put(CURSOR_END, cursorPos);
    content.put(CURSOR_START, autocomplete.getStartIndex());

    reply.setContent(content);
    send(reply);
  }
}