package com.twosigma.beaker.widgets.floats;

import java.io.Serializable;
import java.util.HashMap;

/**
 *   Displays a float value within a textbox. Value must be within the range specified.
 *   For a textbox in which the value doesn't need to be within a specific range, use FloatText.
 *   Parameters
 *   ----------
 *   value : float
 *       value displayed
 *   min : float
 *       minimal value of the range of possible values displayed
 *   max : float
 *       maximal value of the range of possible values displayed
 *   description : str
 *       description displayed next to the textbox
 *   color : str Unicode color code (eg. '#C13535')
 *       color of the value displayed
 * 
 * @author konst
 */
public class BoundedFloatText extends BoundedFloatWidget{
  
  public static final String VIEW_NAME_VALUE = "FloatTextView";
  public static final String MODEL_NAME_VALUE = "FloatTextModel";
      
  public BoundedFloatText() {
    super();
    init();
  }

  @Override
  protected HashMap<String, Serializable> content(HashMap<String, Serializable> content) {
    super.content(content);
    content.put(MODEL_NAME, MODEL_NAME_VALUE);
    content.put(VIEW_NAME, VIEW_NAME_VALUE);
    return content;
  }

}