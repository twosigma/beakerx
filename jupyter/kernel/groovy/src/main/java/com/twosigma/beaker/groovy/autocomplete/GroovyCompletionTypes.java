/*
 *  Copyright 2014 TWO SIGMA OPEN SOURCE, LLC
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

package com.twosigma.beaker.groovy.autocomplete;

import com.twosigma.beaker.autocomplete.GenericCompletionTypes;

public class GroovyCompletionTypes extends GenericCompletionTypes {
	public static final int
	TYPE=GenericCompletionTypes.NUM_TYPES+0,
	FQ_TYPE=GenericCompletionTypes.NUM_TYPES+1,
	CUSTOM_TYPE=GenericCompletionTypes.NUM_TYPES+2,
	INITIAL=GenericCompletionTypes.NUM_TYPES+3,
	TOPLEVEL=GenericCompletionTypes.NUM_TYPES+4,
	STDFUNCS=GenericCompletionTypes.NUM_TYPES+5,
	MEMBERDELC=GenericCompletionTypes.NUM_TYPES+6,
	CLASSLEVEL=GenericCompletionTypes.NUM_TYPES+7,
	NEW=GenericCompletionTypes.NUM_TYPES+8,
	NUM_TYPES=GenericCompletionTypes.NUM_TYPES+9;
	
	public static final boolean debug = false;
}
