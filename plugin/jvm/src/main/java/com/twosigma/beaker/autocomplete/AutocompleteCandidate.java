package com.twosigma.beaker.autocomplete;

import java.util.ArrayList;
import java.util.List;

public class AutocompleteCandidate {
	private int type;
	private String key;
	private List<AutocompleteCandidate> children;
	
	public AutocompleteCandidate(int t, String k) {
		type = t;
		key = k;
	}

	public AutocompleteCandidate(int t, String [] k) {
		type = t;
		key = k[0];
		AutocompleteCandidate p = this;
		for(int i=1; i<k.length; i++) {
			AutocompleteCandidate n = new AutocompleteCandidate(t,k[i]);
			p.addChildren(n);
			p=n;
		}
	}

	public AutocompleteCandidate(int t, String[] k, int max) {
		type = t;
		key = k[0];
		AutocompleteCandidate p = this;
		for(int i=1; i<max; i++) {
			AutocompleteCandidate n = new AutocompleteCandidate(t,k[i]);
			p.addChildren(n);
			p=n;
		}
	}

	public AutocompleteCandidate clone() {
		AutocompleteCandidate n = new AutocompleteCandidate(type,key);
		for ( AutocompleteCandidate c1 : children) {
			n.addChildren(c1.clone());
		}
		return n;
	}
	
	public void addChildren(AutocompleteCandidate a) {
		if(children==null)
			children = new ArrayList<AutocompleteCandidate>();
		
		for (AutocompleteCandidate c1 : children) {
			if(c1.getKey().equals(a.getKey())) {
				c1.addChildrens(a.getChildrens());
				return;
			}
		}
		children.add(a);
	}
	
	public int getType()   { return type; }
	public String getKey() { return key; }
	public boolean hasChildren() { return children!=null && children.size()>0; }

	public List<AutocompleteCandidate> getChildrens() { return children; }

	public void addChildrens(List<AutocompleteCandidate> chs) {
		if(chs==null) return;
		for(AutocompleteCandidate c : chs) {
			addChildren(c);
		}
	}

	public void searchCandidates(List<String> ret, AutocompleteCandidate a) {
		if(a.hasChildren()) {
			if(!key.equals(a.getKey()))
				return;
			if(children!=null) {
				for (AutocompleteCandidate c1 : children) {
					c1.searchCandidates(ret, a.getChildrens().get(0));
				}
			}
			return;
		}
		if(key.startsWith(a.key) && !ret.contains(key))
			ret.add(key);
	}
	
	public AutocompleteCandidate findLeaf() {
		if(children!=null && children.size()>0)
			return children.get(0).findLeaf();
		return this;
	}
}
