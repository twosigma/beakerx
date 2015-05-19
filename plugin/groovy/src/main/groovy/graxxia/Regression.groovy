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

import org.apache.commons.math3.stat.regression.OLSMultipleLinearRegression;
import org.codehaus.groovy.runtime.NullObject;

class RegressionCategory {
    static RegressionVariable bitwiseNegate(RegressionVariable x)     {
        x.model.predictors = [x]
        return x
    }
    static List<RegressionVariable> bitwiseNegate(List<RegressionVariable> values)     {
        values[0].model.predictors = values
        return values
    }
}

class RegressionVariable {
    
    Regression model 
    
    String name
    
    Closure operator
    
    RegressionVariable bitwiseNegate(RegressionVariable other) {
        model.response = this
        model.predictors  = [other]
        return other
    }
    
    List<RegressionVariable> bitwiseNegate(List<RegressionVariable> variables) {
        model.predictors  = variables
        return variables
    }
    
    List<RegressionVariable> plus(RegressionVariable other) {
        other.operator = { arg1, arg2 -> arg1 + arg2 }
        [this, other]
    }
    
    String toString() {
        name
    }
}

class Regression {
    
    RegressionVariable response
    
    List<RegressionVariable> predictors
    
    @Delegate
    OLSMultipleLinearRegression model = new OLSMultipleLinearRegression()

    public Regression() {
    }
    
    void model(Closure c) {
        c.delegate = this
        c.resolveStrategy = Closure.DELEGATE_FIRST
        use(RegressionCategory) {
            c()
        }
    }
    
    def propertyMissing(String name) {
        println "Creating regression variable $name"
        new RegressionVariable(name:name, model: this)
    }
    
    def methodMissing(String name, args) {
        this.response = new RegressionVariable(name:name)
        this.predictors  = args[0] instanceof List ? args.flatten() : [args[0]]
    }
    
    void run(def response, Matrix data) {
        def columns = data.getColumns(predictors.collect {it .name})
        def predictorData = new Matrix(columns)
        model.newSampleData(response as double[], predictorData.transpose().dataRef)
    }
    
    String toString() {
        "Regression of $response.name on ${predictors*.name.join(',')}"
    }
}
