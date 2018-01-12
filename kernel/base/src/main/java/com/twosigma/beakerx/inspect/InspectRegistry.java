/*
 *  Copyright 2017 TWO SIGMA OPEN SOURCE, LLC
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
 */package com.twosigma.beakerx.inspect;

import java.util.ArrayList;
import java.util.List;

public class InspectRegistry {
    class AutocompleteRegistryForType {
        private List<InspectCandidate> children;

        AutocompleteRegistryForType() {
            children = new ArrayList<>();
        }

        void add(InspectCandidate c) {
            for (InspectCandidate c1 : children) {
                if (c1.getKey().equals(c.getKey())) {
                    c1.addChildrens(c.getChildrens());
                    return;
                }
            }
            children.add(c);
        }

        void searchCandidates(List<String> ret, InspectCandidate a) {
            for (InspectCandidate c1 : children) {
                c1.searchCandidates(ret, a);
            }
        }
    }

    private AutocompleteRegistryForType[] registry;

    public InspectRegistry(int numt) {
        registry = new AutocompleteRegistryForType[numt];
        for (int i = 0; i < numt; i++)
            registry[i] = new AutocompleteRegistryForType();
    }

    public void addCandidate(InspectCandidate c) {
        registry[c.getType()].add(c);
    }

    public List<String> searchCandidates(List<InspectCandidate> cands) {
        List<String> ret = new ArrayList<>();
        for (InspectCandidate a : cands) {
            if (a != null)
                registry[a.getType()].searchCandidates(ret, a);
        }
        return ret;
    }
}
