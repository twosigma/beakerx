package com.twosigma.beaker.groovy;

public class ConsoleOutput {

  private boolean error;
  private String text;
  private boolean printed;

  public ConsoleOutput(boolean error, String text){
    this.error = error;
    this.text = text;
  }
  
  public boolean isError() {
    return error;
  }

  public String getText() {
    return text;
  }

  public boolean isPrinted() {
    return printed;
  }

  public void setPrinted(boolean printed) {
    this.printed = printed;
  }

}