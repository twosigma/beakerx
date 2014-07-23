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

class DataFrameEncoder(json.JSONEncoder):
    def default(self, obj):
        # similarly handle Series, Panels, .... ?
        if type(obj) == pandas.core.frame.DataFrame:
            return obj.to_dict(outtype='list')
        return json.JSONEncoder.default(self, obj)
        
url = '127.0.0.1:' + os.environ['beaker_core_port']
password_mgr = urllib2.HTTPPasswordMgrWithDefaultRealm()
password_mgr.add_password(None, url, 'beaker', os.environ['beaker_core_password'])
handler = urllib2.HTTPBasicAuthHandler(password_mgr)
opener = urllib2.build_opener(handler)
urllib2.install_opener(opener)

def bset4(var, val, unset, sync):
    args = {'name': var, 'session':_beaker_session_id, 'sync':sync}
    if not unset:
      args['value'] = json.dumps(val, cls=DataFrameEncoder)
    req = urllib2.Request('http://' + url + '/rest/namespace/set', urllib.urlencode(args))
    conn = urllib2.urlopen(req)
    conn.read()

def bset(var, val):
    bset4(var, val, False, True)

# returns before it completes
def bset_fast(var, val):
    bset4(var, val, False, False)

# remove a var from the namespace
def bunset(var):
    bset4(var, None, True, True)
  
def bget(var):
    req = urllib2.Request('http://' + url + '/rest/namespace/get?' + 
                          urllib.urlencode({'name': var, 'session':_beaker_session_id}))
    conn = urllib2.urlopen(req)
    result = yaml.load(conn.read()) # would use json.loads but it returns unicode
    return result['value']
