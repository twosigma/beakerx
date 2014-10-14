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

import os, json, pandas, yaml
import urllib.request, urllib.parse, urllib.error, urllib.request, urllib.error, urllib.parse

# should be inner class to Beaker
class DataFrameEncoder(json.JSONEncoder):
    def default(self, obj):
        # similarly handle Panels.
        # make this extensible by the user to handle their own types.
        if type(obj) == pandas.core.frame.DataFrame:
            return obj.to_dict(outtype='list')
        if type(obj) == pandas.core.series.Series:
            return obj.to_dict()
        return json.JSONEncoder.default(self, obj)

class Beaker:
    """Runtime support for Python code in Beaker."""
    __package__ = None
    __name__ = 'beaker'
    session_id = ''
    core_url = '127.0.0.1:' + os.environ['beaker_core_port']
    password_mgr = urllib.request.HTTPPasswordMgrWithDefaultRealm()
    password_mgr.add_password(None, core_url, 'beaker',
                              os.environ['beaker_core_password'])
    urllib.request.install_opener(urllib.request.build_opener(urllib.request.HTTPBasicAuthHandler(password_mgr)))

    def set4(self, var, val, unset, sync):
        args = {'name': var, 'session':self.session_id, 'sync':sync}
        if not unset:
          args['value'] = json.dumps(val, cls=DataFrameEncoder)
        req = urllib.request.Request('http://' + self.core_url + '/rest/namespace/set',
                                     urllib.parse.urlencode(args).encode('utf8'))
        conn = urllib.request.urlopen(req)
        reply = conn.read().decode("utf-8")
        if reply != 'ok':
            raise NameError(reply)
  
    def get(self, var):
        print('get(%s)' % var)
        req = urllib.request.Request('http://' + self.core_url + '/rest/namespace/get?' + 
                                     urllib.parse.urlencode({
                    'name': var,
                    'session':self.session_id}))
        conn = urllib.request.urlopen(req)
        result = yaml.load(conn.read()) # would use json.loads but it returns unicode
        if not result['defined']:
            raise NameError('name \'' + var + '\' is not defined in notebook namespace')
        return result['value']

    def set_session(self, id):
        self.session_id = id

    def set(self, var, val):
        return self.set4(var, val, False, True)

    def __setattr__(self, name, value):
        print('setattr(%s)=%s' % (name, value))
        if 'session_id' == name:
            self.__dict__['session_id'] = value
            return
        return self.set(name, value)

    def __getattr__(self, name):
        return self.get(name)
