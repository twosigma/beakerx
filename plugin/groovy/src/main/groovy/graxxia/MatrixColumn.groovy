/*
 *  Graxxia - Groovy Maths Utililities
 *
 *  Copyright (C) 2014 Simon Sadedin, ssadedin<at>gmail.com and contributors.
 *
 *  This file is licensed under the Apache Software License Version 2.0.
 *  For the avoidance of doubt, it may be alternatively licensed under GPLv2.0
 *  and GPLv3.0. Please see LICENSE.txt in your distribution directory for
 *  further details.
 */
package graxxia;

import java.util.Iterator;

import groovy.transform.CompileStatic;

/**
 * A proxy object representing a column in a matrix.
 * <p>
 * The data in a {@link Matrix} is stored natively in row format. That is,
 * each row is stored as a native Java array of double values. This makes
 * accessing data by row very efficient, but doesn't give you an easy way to
 * pass around or treat a column of values as a collection without
 * first copying them to another data structure. This class wraps
 * an {@link Iterable} interface around a column of values without actually copying
 * the data. It does this keeps a reference to the underlying matrix and
 * implements iteration and random access (via square bracket notation)
 * by reflecting values into the appropriate column of the underlying
 * Matrix.
 *
 * @author simon.sadedin@mcri.edu.au
 */
class MatrixColumn implements Iterable {
    
    int columnIndex
    
    Matrix sourceMatrix
    
    MatrixColumn() {
        name = "C"+columnIndex
    }
    
    String name
    
    Object getAt(Object index) {
        if(index instanceof Integer)
            sourceMatrix.dataRef[index][columnIndex]
        else
        if(index instanceof List)
            sourceMatrix.dataRef[index].collect { it[columnIndex] }
    }
    
    @CompileStatic
    double getDoubleAt(int index) {
        return sourceMatrix.matrix.dataRef[index][columnIndex]
    }
    
    int size() {
        sourceMatrix.matrix.rowDimension
    }
    
    Object asType(Class c) {
        if(c == List) {
            return sourceMatrix.matrix.getColumn(columnIndex) as List
        }
        else
        if(c == double[]) {
            return sourceMatrix.matrix.getColumn(columnIndex)
        }
        else {
            return super.asType(c)
        }
    }
    
    Iterator iterator() {
        return new MatrixColumnIterator(this.sourceMatrix.matrix.dataRef, this.columnIndex)
    }
    
    boolean equals(Object o) {
        int i = 0
        return (o.every { it == this[i++] })
    }
    
    String toString() {
        "[" + this.collect {it}.join(",") + "]"
    }
}