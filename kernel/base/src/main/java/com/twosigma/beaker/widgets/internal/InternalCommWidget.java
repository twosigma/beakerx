package com.twosigma.beaker.widgets.internal;

public interface InternalCommWidget extends CommWidget{

  public static final String MODEL = "model";

  default void beforeDisplay() {
    if (this.getComm() != null) {
      this.getComm().sendUpdate(MODEL, SerializeToJson.toJson(this));
    }
  }
  
}