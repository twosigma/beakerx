package com.twosigma.beaker.widgets.link;

import com.twosigma.beaker.widgets.Widget;

import java.io.Serializable;
import java.util.HashMap;

/**
 * 
 * Link Widget
 *   source: a (Widget, 'trait_name') tuple for the source trait
 *   target: a (Widget, 'trait_name') tuple that should be updated
 * 
 * @author konst
 *
 */
public class Link extends Widget{
  
  public static final String IPY_MODEL = "IPY_MODEL_";
  public static final String TARGET = "target";
  public static final String SOURCE = "source";
  public static final String MODEL_NAME_VALUE = "LinkModel";
  
  private Widget source;
  private String source_key;
  private Widget target;
  private String target_key;


  public Link(Widget source, String source_key, Widget target, String target_key) {
    super();
    this.source = source;
    this.source_key = source_key;
    this.target = target;
    this.target_key = target_key;
    openComm();
  }

  
  @Override
  public String getModelNameValue() {
    return MODEL_NAME_VALUE;
  }

  @Override
  public String getViewNameValue() {
    return null;
  }
  

  @Override
  protected void addValueChangeMsgCallback() {
  }

  @Override
  protected HashMap<String, Serializable> content(HashMap<String, Serializable> content) {
    String [] target = { IPY_MODEL + this.target.getComm().getCommId(), target_key};
    content.put(TARGET, target);
    String [] source = { IPY_MODEL + this.source.getComm().getCommId(), source_key};
    content.put(SOURCE, source);
    return content;
  }

  public void unlink(){
    this.getComm().close();
  }
  
  public static Link jslink(Widget source, String source_key, Widget target, String target_key){
    return new Link(source, source_key, target, target_key);
  }
  
}