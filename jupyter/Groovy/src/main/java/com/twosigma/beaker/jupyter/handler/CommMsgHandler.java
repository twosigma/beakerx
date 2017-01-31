package com.twosigma.beaker.jupyter.handler;

import static com.twosigma.beaker.jupyter.msg.JupyterMessages.COMM_MSG;

import java.io.Serializable;
import java.security.NoSuchAlgorithmException;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import org.lappsgrid.jupyter.groovy.GroovyKernel;
import org.lappsgrid.jupyter.groovy.handler.AbstractHandler;
import org.lappsgrid.jupyter.groovy.msg.Header;
import org.lappsgrid.jupyter.groovy.msg.Message;
import org.slf4j.LoggerFactory;

import com.twosigma.beaker.jupyter.Comm;

public class CommMsgHandler extends AbstractHandler<Message> {

  public static final String COMM_ID = "comm_id";
  public static final String TARGET_NAME = "target_name";
  public static final String DATA = "data";
  public static final String TARGET_MODULE = "target_module";

  public CommMsgHandler(GroovyKernel kernel) {
    super(kernel);
    logger = LoggerFactory.getLogger(CommMsgHandler.class);
  }

  // TODO remove System.out.println
  public void handle(Message message) throws NoSuchAlgorithmException {
    Map<String, Serializable> commMap = message.getContent();

    Comm comm = kernel.getComm(getString(commMap, COMM_ID));
    comm.setData((HashMap<?,?> )commMap.get(DATA));
    if (comm.getData() != null) {
      hangleData(comm.getData());
    } else {
      logger.info("Comm message contend is null");
    }
    publish(createReplayMessage(message)); //TODO remove : it is a test
    //static/notebook/js/services/kernels/kernel.js
  }
  
  private Message createReplayMessage(Message message){
    Message ret = null;
    if(message != null){
      ret = new Message();
      Map<String, Serializable> commMap = message.getContent();
      ret.setHeader(new Header(COMM_MSG, message.getHeader().getSession()));
      HashMap<String, Serializable> map = new HashMap<>(6);
      map.put(COMM_ID, getString(commMap, COMM_ID));
      HashMap<String,String> data = new HashMap<>();
      data.put("abc", "HELL0!!!");
      map.put(DATA, data);
      ret.setContent(map);
    }
    return ret;
  }

  public static String getString(Map<String, Serializable> map, String name) {
    String ret = null;
    if (map != null && name != null && map.containsKey(name)) {
      ret = (String) map.get(name);
    }
    return ret;
  }

  // TODO read and handle comm message
  public void hangleData(Object data) {
    logger.info("Handing comm messahe content:");
    if (data instanceof Map<?, ?>) {
      logger.info("Comm content is map, key list:");
      for (Object key : ((Map<?, ?>) data).keySet()) {
        logger.info(key.toString());
      }
    } else if (data instanceof Collection<?>) {
      System.out.println("Comm content is Collection, content is:");
      for (Object value : ((Collection<?>) data)) {
        logger.info(value.toString());
      }
    } else {
      logger.info("Comm mesage content Class is:");
      logger.info(data.getClass().getName());
      logger.info("Comm mesage content value toString():");
      logger.info(data.toString());
    }
    logger.info("Handing comm messahe content END");
  }

}