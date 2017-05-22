package com.twosigma.beaker.widgets.link;

import com.twosigma.beaker.widgets.Widget;

/**
 * A directional link
 * source: a (Widget, 'trait_name') tuple for the source trait
 * target: a (Widget, 'trait_name') tuple that should be updated
 * when the source trait changes.
 * 
 * @author konst
 *
 */
public class DirectionalLink extends Link{

  public static final String MODEL_NAME_VALUE = "DirectionalLinkModel";
  
  public DirectionalLink(Widget source, String source_key, Widget target, String target_key) {
    super(source, source_key, target, target_key);
  }

  @Override
  public String getModelNameValue() {
    return MODEL_NAME_VALUE;
  }

  
  public static DirectionalLink jsdlink(Widget source, String source_key, Widget target, String target_key){
    return new DirectionalLink(source, source_key, target, target_key);
  }
  
}