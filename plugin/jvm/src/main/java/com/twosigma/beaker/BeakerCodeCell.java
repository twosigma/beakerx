package com.twosigma.beaker;

import org.codehaus.jackson.annotate.JsonAutoDetect;

@JsonAutoDetect
public class BeakerCodeCell {
  private String cellId;
  private String evaluatorId;
  private String code;
  private String outputtype;
  private String output;
  
  public BeakerCodeCell() { }

  public String getcellId() { return cellId; }
  public String getevaluatorId() { return evaluatorId; }
  public String getcode() { return code; }
  public String getoutputtype() { return outputtype; }
  public String getoutput() { return output; }

  public void setcellId(String s) { cellId = s; }
  public void setevaluatorId(String s) { evaluatorId = s; }
  public void setcode(String s) { code = s; }
  public void setoutputtype(String s) { outputtype = s; }
  public void setoutput(String s) { output = s; }
  
}
