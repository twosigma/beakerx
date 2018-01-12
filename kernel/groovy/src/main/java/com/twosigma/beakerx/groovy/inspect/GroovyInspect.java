package com.twosigma.beakerx.groovy.inspect;

import com.twosigma.beakerx.inspect.InspectResult;
import com.twosigma.beakerx.kernel.Imports;
import groovy.lang.GroovyClassLoader;

import static com.twosigma.beakerx.autocomplete.AutocompleteCandidate.EMPTY_NODE;

public class GroovyInspect {
    public InspectResult DoInspect(String code, int caretPosition, GroovyClassLoader groovyClassLoader, Imports imports) {



        return new InspectResult("", caretPosition);
    }


}
