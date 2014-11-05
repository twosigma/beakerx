package com.twosigma.beaker.autocomplete;

import java.util.ArrayList;
import java.util.List;

public class AutocompleteRegistry {
	class AutocompleteRegistryForType {
		private List<AutocompleteCandidate> children;
		
		AutocompleteRegistryForType() {
			children = new ArrayList<AutocompleteCandidate>();
		}
		
		void clear() {
			children.clear();
		}

		void add(AutocompleteCandidate c) {
			for (AutocompleteCandidate c1 : children) {
				if(c1.getKey().equals(c.getKey())) {
					c1.addChildrens(c.getChildrens());
					return;
				}
			}
			children.add(c);			
		}

		void searchCandidates(List<String> ret, AutocompleteCandidate a) {
			for (AutocompleteCandidate c1 : children) {
				c1.searchCandidates(ret, a);
			}
		}
	}
	
	private AutocompleteRegistryForType [] registry;
	
	public AutocompleteRegistry(int numt) {
		registry = new AutocompleteRegistryForType[numt];
		for(int i=0; i<numt; i++)
			registry[i] = new AutocompleteRegistryForType();
	}
	
	public void clearForType(int t) { registry[t].clear(); }

	public void addCandidate(AutocompleteCandidate c) { registry[c.getType()].add(c); }
	
	public List<String> searchCandidates(List<AutocompleteCandidate> cands) {
		List<String> ret = new ArrayList<String>();
		for(AutocompleteCandidate a : cands) {
			registry[a.getType()].searchCandidates(ret, a);
		}
		return ret;
	}
}
