/*
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
package com.twosigma.beakerx.groovy.evaluator.autocomplete;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.Test;

import com.twosigma.beakerx.groovy.autocomplete.GroovyReflectionCompletion;

import groovy.lang.Binding;

public class GroovyReflectionCompletionTest {
	
	public static class A {
		String b;

		public String getB() {
			return b;
		}

		public void setB(String b) {
			this.b = b;
		}
	}
	
	public static class House {

		String cubby;

		public String getCubby() {
			return cubby;
		}

		public void setCubby(String b) {
			this.cubby = b;
		}
	}
	
	public static class Tree {

		House house = new House();

		public House getHouse() {
			return house;
		}

		public void setHouse(House house) {
			this.house = house;
		}
	}
	
	@Test
	public void testExtractExpression() {
		Binding binding = new Binding();
		GroovyReflectionCompletion grc = new GroovyReflectionCompletion(binding);

		assert grc.resolveExpression("hello", 3).equals("hello");
	}
	

	@Test
	public void testCompletePropertyNames() {
		
		Binding binding = new Binding();
		
		binding.setVariable("x", new A());
		
		GroovyReflectionCompletion grc = new GroovyReflectionCompletion(binding);
		
		List<String> result = grc.autocomplete("x.", 1);
		
		assert result.get(0).equals("b");
	}
	
	@Test
	public void testNestedObjectProperty() {
		
		Binding binding = new Binding();
		
		binding.setVariable("tree", new Tree());
		
		GroovyReflectionCompletion grc = new GroovyReflectionCompletion(binding);
			
		List result = grc.autocomplete("tree.h", 5);
		
		assert result.size() == 1;

		assert result.stream().filter(x -> x.equals("house")).count()>0;
	}
	
	@Test
	public void testMapLiteral() {
		
		Binding binding = new Binding();
		
		Map m = new HashMap();
		m.put("cat", 5);
		m.put("dog", 10);
		m.put("tree", 15);
		
		
		binding.setVariable("blah", m);
		
		GroovyReflectionCompletion grc = new GroovyReflectionCompletion(binding);
			
		List result = grc.autocomplete("blah.c", 5);
		
		assert result.stream().filter(x -> x.equals("cat")).count()>0;
		assert !result.contains("dog");
		assert !result.contains("size()");
	}
	
	@Test
	public void testIterable() {
		
		Binding binding = new Binding();
		
		
		binding.setVariable("blah", Arrays.asList("super","cat","dog","tree"));
		
		GroovyReflectionCompletion grc = new GroovyReflectionCompletion(binding);
			
		List result = grc.autocomplete("blah.s", 5);
		
		assert !result.contains("dog");
		assert result.contains("size()");
	}

}
