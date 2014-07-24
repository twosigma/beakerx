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

import os, urllib, urllib2, json, pandas, yaml

# should be inner class to Beaker
class DataFrameEncoder(json.JSONEncoder):
    def default(self, obj):
        # similarly handle Series, Panels, etc XXX
        if type(obj) == pandas.core.frame.DataFrame:
            return obj.to_dict(outtype='list')
        return json.JSONEncoder.default(self, obj)

class Beaker:
    """Runtime support for Python code in Beaker."""
    session_id = ''
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
        conn.read()
  
    def get(self, var):
        req = urllib2.Request('http://' + self.core_url + '/rest/namespace/get?' + 
                              urllib.urlencode({'name': var, 'session':self.session_id}))
        conn = urllib2.urlopen(req)
        result = yaml.load(conn.read()) # would use json.loads but it returns unicode
        if not result['defined']:
            raise NameError('name \'' + var + '\' not defined in notebook namespace')
        return result['value']


beaker_instance = Beaker()

def set(var, val):
    return beaker_instance.set4(var, val, False, True)

# returns before it completes
def set_fast(var, val):
    return beaker_instance.set4(var, val, False, False)

# remove a var from the namespace
def unset(var):
    return beaker_instance.set4(var, None, True, True)

def get(var):
    return beaker_instance.get(var)

def set_session(id):
    beaker_instance.session_id = id
