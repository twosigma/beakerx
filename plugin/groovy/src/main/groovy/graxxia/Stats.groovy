/*
 *  Graxxia - Groovy Maths Utilities
 *
 *  Copyright (C) 2014 Simon Sadedin, ssadedin<at>gmail.com and contributors.
 *
 *  This file is licensed under the Apache Software License Version 2.0.
 *  For the avoidance of doubt, it may be alternatively licensed under GPLv2.0
 *  and GPLv3.0. Please see LICENSE.txt in your distribution directory for
 *  further details.
 */
package graxxia
import groovy.transform.CompileStatic;
import java.text.ParseException;

import org.apache.commons.math3.stat.descriptive.DescriptiveStatistics;
import org.apache.commons.math3.stat.descriptive.SummaryStatistics;

/**
 * A Groovy wrapper for Commons-Math DescriptiveStatistcs, combined
 * with numerous convenience methods that return SummaryStatistics.
 * <p>
 * The summary static methods are used to easily create summary statistics
 * for various collections and iterables. A special class of methods supports efficient
 * creation of statistics for defined ranges of integers (eg: Coverage Depth values). The 
 * motivation of it is to be able to calculate the median of coverage depth values efficiently
 * without storing the entire set in memory. See {@link IntegerStats} for more information.
 * <p>
 * The most basic method takes any Iterable and turns it into a SummaryStatistics object:
 * <pre>
 * x = [1,4,5,6]
 * assert Stats.summary(x).mean == 4
 * </pre>
 * As an alternative, a second method accepts a closure, which is called repeatedly 
 * until an exception occurs such as ArrayIndexOutOfBounds, NoSuchElementException, etc.
 * This allows an inversion of control, and thus, effectively, a streaming model for objects
 * that aren't necessarily iterable:
 * <pre>
 * int i = 0
 * assert Stats.summary {  x[i++] }.mean == 4
 * </pre>
 * The {@link Stats} class links well with the {@link Matrix} class to allow easy and efficient 
 * calculation of statistics for matrix columns and rows:
 * <pre>
 * Matrix m = new Matrix(2,2,[1,2,3,4])
 * assert Stats.from(m[][1]).mean == 3
 * </pre>
 * 
 * @author simon.sadedin@mcri.edu.au
 */
class Stats extends DescriptiveStatistics {

    public Stats() {
    }
    
    public Stats(int windowSize) {
        super(windowSize)
    }
     
    /**
     * Convenience function to add sample value to statistics
     * 
     * @param value
     */
    void leftShift(value) {
        this.addValue(value)
    }
    
    static Stats from(double [] values) {
        from(values,null)    
    }
    
    /**
     * A concrete implementation of {@link #from(Iterable, Closure)} specialised
     * for arrays of double[] values. 
     * 
     * @param values    values to calculate statistics for
     * @param c         Closure to filter or transform results
     * @return          {@link Stats} object containing stastitics about the given values
     */
    @CompileStatic
    static Stats from(double [] values, Closure c) {
        Stats s = new Stats()
        boolean withIndex = (c != null) && c.maximumNumberOfParameters > 1
        for(int i=0; i<values.size();++i) {
            double value = values[i];
            if(c == null) {
                s.addValue(value)
            }
            else {
                def result = withIndex ? c(value, i) : c(value)
                if(result != false) {
                    if(result == true)
                        s.addValue((double)value)
                    else
                        s.addValue(((Number)result).toDouble())
                }
            }
        }
        return s
    }
    
    /**
     * A flexible method to generate statistics from any iterable object.
     * Values can be streamed from any source that can
     * generate numeric values and behave as an iterator.
     * <p>
     * An optional closure can be supplied that has dual functionality:
     * <li>It can filter the values
     * <li>It can transform the values
     * If the result of the closure is a boolean, it is treated as a filter:
     * <pre>
     * x = [2,3,4,5,6]
     * assert Stats.from(x) { it % 2 == 0 }.mean == 4 // mean of 2,4,6
     * </pre>
     * Alternatively if the value returned is numeric, it is treated as a transformation:
     * <pre>
     * x = [2,3,4,5,6]
     * assert Stats.from(x) { it % 2 }.mean == 1.6 // (3+5)/5
     * </pre>
     * Of course, any {@link Iterable} could be easily transformed using standard 
     * Groovy collection operations to achieve the same effect:
     * <pre>
     * x = [2,3,4,5,6]
     * assert Stats.from(x.collect { it % 2 }).mean == 1.6 // (3+5)/5
     * </pre>
     * However the latter requires a complete copy of the transformed data be 
     * temporarily created in memory, while the former can potentially stream
     * any number of values in while never consuming anything more than trivial 
     * memory overhead.
     * 
     * @param values    Iterable object supplying values that can be parsed as numeric
     * @param c 
     * @return
     */
    @CompileStatic
    static Stats from(Iterable values, Closure c=null) {
        Stats s = new Stats()
        boolean withIndex = c != null && c.maximumNumberOfParameters > 1
        values.eachWithIndex { rawValue, index ->
              if(c == null) {
                  double value = (double) (rawValue instanceof Number ? rawValue : Double.parseDouble(String.valueOf(rawValue)))
                  s.addValue(value)
              }
              else {
                  def value = withIndex ? c(rawValue, index) : c(rawValue)
                  if(value != false) {
                      if(value == true)
                          s.addValue((double)rawValue)
                      else
                          s.addValue(((Number)value).toDouble())
                  }
              } 
        }
        return s
    }
    
    /**
     * Compute statistcs from values read from the given input stream. The 
     * values are expected to  be numeric. This is especially useful for piping 
     * input in from standard input, eg. in Bash:
     * <pre>
     * cut -f 6 coverage.txt | groovy -e 'println(Stats.from())'
     * </pre>
     * If a closure is provided then the caller can transorm the values before
     * they are added. If the closure returns false then the value is not included,
     * which gives the caller the opportunity to filter out values they might
     * not be interested in.
     * 
     * @param values
     * @return
     */
    static Stats read(InputStream values = System.in, Closure c=null) {
        Stats s = new Stats()
        values.eachLine { line ->
              def value = Double.parseDouble(line.trim())
              if(c == null) {
                  s.addValue(value)
              }
              else {
                  value = c(value)
                  if(value != false)
                      s.addValue(value)
              }
        }
        return s
    }
    
    @CompileStatic
    static mean() {
        SummaryStatistics s = new SummaryStatistics()
        int errorCount = 0;
        System.in.eachLine { String line ->
            try {
                s.addValue(Double.parseDouble(line.trim()))
            }
            catch(ParseException e) {
                ++errorCount
            }
        }
        if(errorCount>0)
            System.err.println "WARNING: $errorCount lines could not be parsed as numbers"
            
        return s.mean
    }
    
    static Double mean(Iterable iterable) {
        return summary(iterable.iterator()).mean
    }
    
    static Double mean(Iterator i) {
        return summary(i).mean
    }
     
    static SummaryStatistics summary(Iterable iterable) {
        summary(iterable.iterator())
    }
    
    static summary(Iterator i) {
        summary { i.next() }
    }
    
    static Double mean(double... values) {
        summary(values).mean
    }
	
     static Double mean(Closure c) {
        summary(c).mean
    }
    
    @CompileStatic
    static SummaryStatistics summary(double... values) {
        int i=0;
        summary { values[(int)(i++)] }
    }
    
    /**
     * Convenience method for returning the median of values read from stdin
     * using a default maximum value of 10,000.
     * 
     * @return
     */
    static median() {
        percentile().getPercentile(50)
    }
    
     static median(int max, Closure c) {
        percentile(max,c).getPercentile(50)
    }
    
    static median(Closure c) {
        percentile(10000,c).getPercentile(50)
    }
    
     static percentile(int max) {
        percentile(max, System.in)
    }
    
    static percentile() {
        percentile(10000, System.in)
    }
     
    /**
     * Return a IntegerStats object by reading lines from the
     * given input stream until no more lines are left.
     * 
     * @param max   See #percentile(max,Closure)
     * @param i     input stream
     * @return  a IntegerStats object
     */
    @CompileStatic
    static percentile(int max, InputStream i) {
        i.withReader { Reader r ->
            percentile(10000) {
                r.readLine()?.trim()
            }
        }
    }
    
    /**
     * Calculate Percentile object by accepting values from
     * the given closure until it either:
     * 
     * <li>returns null
     * <li>throws NoSuchElementException
     * <li>throws ArrayIndexOutOfBounds exception
     * 
     * @param max   An estimate of the maximum possible value that the percentile
     *              values that are requested will have. If the actual value is 
     *              above this level then an exception will be thrown when the
     *              value is requested
     * @param c
     * @return
     */
    @CompileStatic
    static percentile(int max, Closure c) {
        IntegerStats p = new IntegerStats(max)
        def value = c()
        try {
            while(value != null) {
                if(value instanceof Integer) {
                    p.addValue(value)
                }
                else
                if(value instanceof Double) {
                    p.addValue(((Double)value).toInteger())
                }
                else
                if(value instanceof Float) {
                    p.addValue(((Float)value).toInteger())
                }
                else
                if(value instanceof String) {
                    p.addValue(((String)value).toInteger())
                }
                else {
                    p.addValue(String.valueOf(value).toInteger())
                }
                value = c()
            }
        }
        catch(NoSuchElementException e) {
            // Do nothing!
        }
        catch(ArrayIndexOutOfBoundsException e) {
            // Do nothing!
        }
        return p
    }
    
    static SummaryStatistics summary(Closure c) {
        summary(c,null)
    }
    
    /**
     * Return a SummaryStatistics object obtained by executing the
     * given closure repeatedly until it either 
     * 
     * <li>returns null
     * <li>throws NoSuchElementException
     * <li>throws ArrayIndexOutOfBounds exception
     * 
     * @param c1 the closure that returns values
     * @param c2 an optional closure that filters the results. 
     *           If it accepts a single parameter then only the 
     *           value is passed, if it accepts 2 parameters then
     *           the index of the value is passed as well
     * 
     * @return {@link SummaryStatistics} object
     */
    @CompileStatic
    static SummaryStatistics summary(Closure c1, Closure c2) {
        SummaryStatistics s = new SummaryStatistics()
        int i=0
        try {
            def value = c1()
            while(value != null) {
                if(c2 == null || c2(value,i)) {
                    if(value instanceof Double) {
                        s.addValue((Double)value)
                    }
                    else
                    if(value instanceof Float) {
                        s.addValue(((Float)value).toDouble())
                    }            
                    else
                    if(value instanceof Integer) {
                        s.addValue(((Integer)value).toDouble())
                    }                    
                    else
                    if(value instanceof String) {
                        s.addValue(((String)value).toDouble())
                    }
                    else {
                        s.addValue(String.valueOf(value).toDouble())
                    }
                }
                value = c1()
                ++i
            }
        }
        catch(NoSuchElementException e) {
            // Do nothing!
        }
        catch(ArrayIndexOutOfBoundsException e) {
            // Do nothing!
        }
        return s
    }
}