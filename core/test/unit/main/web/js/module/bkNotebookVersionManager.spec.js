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
describe("M_bkNotebookVersionManager", function() {
  var bkNotebookVersionManager;
  beforeEach(module("M_bkNotebookVersionManager"));
  beforeEach(inject(function(_bkNotebookVersionManager_) {
    bkNotebookVersionManager = _bkNotebookVersionManager_;
  }));

  var bkNbV1 = {
    "beaker": "1",
    "evaluators": [
      {
        "name": "Html",
        "plugin": "Html",
        "shellID": null
      },
      {
        "name": "Latex",
        "plugin": "Latex",
        "shellID": null
      },
      {
        "name": "IPython",
        "plugin": "IPython",
        "shellID": "595CD9D6B74B4CD88C073D44E5CB6DAF",
        "imports": "",
        "supplementalClassPath": ""
      },
      {
        "name": "JavaScript",
        "plugin": "JavaScript",
        "shellID": null,
        "jsSetting2": "",
        "jsSetting1": ""
      }
    ],
    "cells": [
      {
        "id": "root",
        "class": [
          "notebook",
          "container"
        ]
      },
      {
        "id": "section001",
        "class": [
          "section",
          "container"
        ],
        "title": "Hello Beaker",
        "collapsed": false
      },
      {
        "id": "code001",
        "class": [
          "code"
        ],
        "evaluator": "IPython",
        "input": {
          "body": ""
        },
        "output": {
          "selectedType": "Hidden"
        }
      }
    ],
    "tagMap": {
      "root": [
        "section001"
      ],
      "section001": [
        "code001"
      ]
    },
    "tagMap2": {
      "initialization": ["code001"],
      "IPython": [
        "code001"
      ]
    }
  };
  var bkNbV2 = {
    "beaker": "2",
    "evaluators": [
      {
        "name": "Html",
        "plugin": "Html",
        "shellID": null
      },
      {
        "name": "Latex",
        "plugin": "Latex",
        "shellID": null
      },
      {
        "name": "IPython",
        "plugin": "IPython",
        "shellID": "595CD9D6B74B4CD88C073D44E5CB6DAF",
        "imports": "",
        "supplementalClassPath": ""
      },
      {
        "name": "JavaScript",
        "plugin": "JavaScript",
        "shellID": null,
        "jsSetting2": "",
        "jsSetting1": ""
      }
    ],
    "cells": [
      {
        "id": "section001",
        "type": "section",
        "level": 1,
        "title": "Hello Beaker",
        "collapsed": false
      },
      {
        "id": "code001",
        "type": "code",
        "evaluator": "IPython",
        "input": {
          "body": ""
        },
        "output": {
          "selectedType": "Hidden"
        },
        initialization: true
      }
    ]
  };
  var emptyNotebook = {
    "beaker": "2",
    "evaluators": [],
    "cells": []
  };

  describe("bkNotebookVersionManager", function() {
    it("should open a v1 notebook", function() {
      var bkNb = bkNotebookVersionManager.open(bkNbV1);
      expect(bkNb.beaker).toBe("2");
      expect(bkNb.evaluators).toEqual(bkNbV1.evaluators);
      expect(bkNb).toEqual(bkNbV2);
    });

    it("should open a v2 notebook", function() {
      expect(bkNotebookVersionManager.open(bkNbV2)).toBe(bkNbV2);
    });

    it("should open a notebook JSON", function() {
      expect(bkNotebookVersionManager.open(angular.toJson(bkNbV2))).toEqual(bkNbV2);
      expect(bkNotebookVersionManager.open(angular.toJson(angular.toJson(bkNbV2)))).toEqual(bkNbV2);
    });

    it("should open a empty notebook", function() {
      expect(bkNotebookVersionManager.open()).toEqual(emptyNotebook);
      expect(bkNotebookVersionManager.open("")).toEqual(emptyNotebook);
      expect(bkNotebookVersionManager.open({})).toEqual(emptyNotebook);
    });

    it("should throw when version is not recognizable", function() {
      expect(function() {
        bkNotebookVersionManager.open({beaker: -1})
      })
          .toThrow("Unknown Beaker notebook version");
    });
  });
});