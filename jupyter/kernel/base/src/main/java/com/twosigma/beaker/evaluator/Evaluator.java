package com.twosigma.beaker.evaluator;

import com.twosigma.beaker.autocomplete.AutocompleteResult;
import com.twosigma.beaker.jvm.object.SimpleEvaluationObject;

import java.io.IOException;

public interface Evaluator {

	void setShellOptions(String cp, String in, String od) throws IOException;
	AutocompleteResult autocomplete(String code, int caretPosition);
	void killAllThreads();
	void evaluate(SimpleEvaluationObject seo, String code);
	void startWorker();
	void exit();
	
}