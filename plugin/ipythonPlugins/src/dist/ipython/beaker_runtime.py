# Copyright 2014 TWO SIGMA OPEN SOURCE, LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#        http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import os, urllib, urllib2, json, pandas, yaml, numpy, IPython, datetime
from IPython.utils.traitlets import Unicode
from Finder.Finder_items import items

class OutputContainer:
    def __init__(self):
        self.items = []
    def clear(self):
        items = [ ]
    def addItem(self, obj):
        items.append(obj)
    def getItems(self):
        return items

# should be inner class to Beaker
class DataFrameEncoder(json.JSONEncoder):
    def default(self, obj):
        # similarly handle Panels.
        # make this extensible by the user to handle their own types.
        if isinstance(obj, numpy.generic):
            return obj.item()
        if isinstance(obj, numpy.ndarray) and obj.ndim == 2:
            out = {}
            out['type'] = "TableDisplay"
            out['subtype'] = "Matrix"
            cols = [ ]
            for i in range(obj.shape[1]):
                cols.append( "c" + str(i) )
            out['columnNames'] =cols
            out['values'] = obj.tolist()
            return out
        if isinstance(obj, numpy.ndarray):
            return obj.tolist()
        if type(obj) == datetime.datetime:
            out = {}
            out['type'] = "Date"
            out['value'] = obj.strftime("%b %d, %Y %I:%M:%S %p")
            return out
        if self.isListOfMaps(obj):
            # TODO
            return json.JSONEncoder.default(self, 'ListOfMaps')
        if self.isDictionary(obj):
            out = {}
            out['type'] = "TableDisplay"
            out['subtype'] = "Dictionary"
            out['columnNames'] = [ "Key", "Value" ]
            values = []
            for k,v in obj.iteritems():
                values.append( [k, v] )
            out['values'] = values
            return out
        if type(obj) == pandas.core.frame.DataFrame:
            out = {}
            out['type'] = "TableDisplay"
            out['subtype'] = "TableDisplay"
            out['columnNames'] = obj.columns.tolist()
            out['values'] = obj.values.tolist()
            ty = []
            num = len(obj.columns.tolist())
            x = 0;
            for x in range(0,num):
              	ty.append( self.convertTypeName(type(obj.values[0][x]).__name__))
            out['types'] = ty
            return out
        if type(obj) == pandas.core.series.Series:
            return obj.to_dict()
        if type(obj) == OutputContainer:
            out = {}
            out['type'] = "OutputContainer"
            out['items'] = json.JSONEncoder.default(self, obj.getItems())
            return out
        return json.JSONEncoder.default(self, obj)
    
    def convertTypeName(self, typ):
        if typ.startswith("float"):
            return "double"
        if typ.startswith("int") or typ.startswith("uint") or typ.startswith("short") or typ.startswith("ushort") or typ.startswith("long") or typ.startswith("ulong"):
            return "integer"
        if typ.startswith("bool"):
            return "boolean"
        if typ.startswith("date"):
            return "time"
        return "string"
    
    def isPrimitiveType(self, typ):
        if typ.startswith("float"):
            return True
        if typ.startswith("int") or typ.startswith("uint") or typ.startswith("short") or typ.startswith("ushort") or typ.startswith("long") or typ.startswith("ulong"):
            return True
        if typ.startswith("bool"):
            return True
        if typ.startswith("date"):
            return True
        if typ.startswith("str"):
            return True
        return False

    def isListOfMaps(self, data):
        if type(data) != list:
            return False
        for w in data:
            if type(w) != dict:
                return False
            for v in w.itervalues():
                if not self.isPrimitiveType(type(v).__name__):
                    return False
        return True

    def isDictionary(self, data):
        if type(data) != dict:
            return False
        for v in data.itervalues():
            if not self.isPrimitiveType(type(v).__name__):
                return False
        return True

class MyJSONFormatter(IPython.core.formatters.BaseFormatter):
    format_type = Unicode('application/json')
    def __call__(self, obj):
        try:
            return json.dumps(obj, cls=DataFrameEncoder)
        except:
            return None

class Beaker:
    """Runtime support for Python code in Beaker."""
    session_id = ''
    registered = False
    core_url = '127.0.0.1:' + os.environ['beaker_core_port']
    password_mgr = urllib2.HTTPPasswordMgrWithDefaultRealm()
    password_mgr.add_password(None, core_url, 'beaker',
                              os.environ['beaker_core_password'])
    urllib2.install_opener(urllib2.build_opener(urllib2.HTTPBasicAuthHandler(password_mgr)))

    def set4(self, var, val, unset, sync):
        args = {'name': var, 'session':self.session_id, 'sync':sync}
        if not unset:
          args['value'] = json.dumps(val, cls=DataFrameEncoder)
        req = urllib2.Request('http://' + self.core_url + '/rest/namespace/set',
                              urllib.urlencode(args))
        conn = urllib2.urlopen(req)
        reply = conn.read()
        if reply != 'ok':
            raise NameError(reply)
  
    def get(self, var):
        req = urllib2.Request('http://' + self.core_url + '/rest/namespace/get?' + 
                              urllib.urlencode({'name': var, 'session':self.session_id}))
        conn = urllib2.urlopen(req)
        result = yaml.load(conn.read()) # would use json.loads but it returns unicode
        if not result['defined']:
            raise NameError('name \'' + var + '\' is not defined in notebook namespace')
        return result['value']

    def set_session(self, id):
        self.session_id = id

    def register_output(self):
        if (self.registered == False):
            ip = IPython.InteractiveShell.instance()
            ip.display_formatter.formatters['application/json'] = MyJSONFormatter(parent=ip.display_formatter)
            self.registered = True

    def set(self, var, val):
        return self.set4(var, val, False, True)

    def dotest(self, obj):
        return json.dumps(obj, cls=DataFrameEncoder)
    
    def createOutputContainer(self):
        return OutputContainer()
    
    def showProgressUpdate(self):
        return "WARNING: python language plugin does not support progress updates"

    def evaluate(self,filter):
        args = {'filter': filter, 'session':self.session_id}
        req = urllib2.Request('http://' + self.core_url + '/rest/notebookctrl/evaluate',
                              urllib.urlencode(args))
        conn = urllib2.urlopen(req)
        result = yaml.load(conn.read())
        return result

    def evaluateCode(self, evaluator,code):
        args = {'evaluator': evaluator, 'code' : code, 'session':self.session_id}
        req = urllib2.Request('http://' + self.core_url + '/rest/notebookctrl/evaluateCode',
                              urllib.urlencode(args))
        conn = urllib2.urlopen(req)
        result = yaml.load(conn.read())
        return result

    def showStatus(self,msg):
        args = {'msg': msg, 'session':self.session_id}
        req = urllib2.Request('http://' + self.core_url + '/rest/notebookctrl/showStatus',
                              urllib.urlencode(args))
        conn = urllib2.urlopen(req)
        result = conn.read()
        return result=="true"

    def clearStatus(self,msg):
        args = {'msg': msg, 'session':self.session_id}
        req = urllib2.Request('http://' + self.core_url + '/rest/notebookctrl/clearStatus',
                              urllib.urlencode(args))
        conn = urllib2.urlopen(req)
        result = conn.read()
        return result=="true"

    def showTransientStatus(self,msg):
        args = {'msg': msg, 'session':self.session_id}
        req = urllib2.Request('http://' + self.core_url + '/rest/notebookctrl/showTransientStatus',
                              urllib.urlencode(args))
        conn = urllib2.urlopen(req)
        result = conn.read()
        return result=="true"

    def getEvaluators(self):
        req = urllib2.Request('http://' + self.core_url + '/rest/notebookctrl/getEvaluators?' + 
                              urllib.urlencode({'session':self.session_id}))
        conn = urllib2.urlopen(req)
        result = yaml.load(conn.read()) # would use json.loads but it returns unicode
        return result

    def getCodeCells(self,filter):
        req = urllib2.Request('http://' + self.core_url + '/rest/notebookctrl/getCodeCells?' + 
                              urllib.urlencode({'session':self.session_id, 'filter':filter}))
        conn = urllib2.urlopen(req)
        #result = yaml.load(conn.read()) # would use json.loads but it returns unicode
        result = json.loads(conn.read())
        return result

    def setCodeCellBody(self,name,body):
        args = {'name': name, 'body':body, 'session':self.session_id}
        req = urllib2.Request('http://' + self.core_url + '/rest/notebookctrl/setCodeCellBody',
                              urllib.urlencode(args))
        conn = urllib2.urlopen(req)
        result = conn.read()
        return result

    def setCodeCellEvaluator(self,name,evaluator):
        args = {'name': name, 'evaluator':evaluator, 'session':self.session_id}
        req = urllib2.Request('http://' + self.core_url + '/rest/notebookctrl/setCodeCellEvaluator',
                              urllib.urlencode(args))
        conn = urllib2.urlopen(req)
        result = conn.read()
        return result

    def setCodeCellTags(self,name,tags):
        args = {'name': name, 'tags':tags, 'session':self.session_id}
        req = urllib2.Request('http://' + self.core_url + '/rest/notebookctrl/setCodeCellTags',
                              urllib.urlencode(args))
        conn = urllib2.urlopen(req)
        result = conn.read()
        return result

    def __setattr__(self, name, value):
        if 'session_id' == name:
            self.__dict__['session_id'] = value
            return
        return self.set(name, value)

    def __getattr__(self, name):
        return self.get(name)

