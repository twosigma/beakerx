package com.twosigma.beaker.jvm.serialization;

import java.util.List;

import com.twosigma.beaker.BeakerCodeCell;

/*
 * This class is used as fake root object when accessing the notebook code cells
 */
public class BeakerCodeCellList {
  public List<BeakerCodeCell> theList;
}