package com.twosigma.beaker.jupyter.msg;

import org.lappsgrid.jupyter.groovy.msg.Message;
import com.twosigma.beaker.jupyter.SocketEnum;

public class MessageHolder {

  private Message message;
  private SocketEnum socketType;
  
  public MessageHolder(SocketEnum socketType, Message message) {
    super();
    this.message = message;
    this.socketType = socketType;
  }

  public Message getMessage() {
    return message;
  }

  public SocketEnum getSocketType() {
    return socketType;
  }
  
  @Override
  public String toString() {
    return "sendType = " + socketType + " Message: " + message;
  }

}