# Copyright 2017 TWO SIGMA OPEN SOURCE, LLC
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

import os
import sys
import pexpect
import test_util

# Start `jupyter console` using pexpect
def start_console():
    args = ['console', '--kernel=groovy']
    cmd = 'jupyter'
    env = os.environ.copy()
    env['JUPYTER_CONSOLE_TEST'] = '1'
    
    p = pexpect.spawn(cmd, args=args, env=env)
    
    # timeout
    t = 10
    p.expect(r'In \[\d+\]', timeout=t)
    return p, pexpect, t

# Stop a running `jupyter console`
def stop_console(p, pexpect, t):
    # send ctrl-D;ctrl-D to exit
    p.sendeof()
    p.sendeof()
    p.expect([pexpect.EOF, pexpect.TIMEOUT], timeout=t)
    if p.isalive():
        p.terminate()
    test_util.kill_processes('jupyter')

def test_lsmagic():
    result = 0
    p, pexpect, t = start_console()
    p.sendline('%lsmagic')
    try:
        p.expect(r'Available magic commands:', timeout=t)
        p.expect(r'%%javascript', timeout=t)
        p.expect(r'%%js', timeout=t)
        p.expect(r'%%html', timeout=t)
        p.expect(r'%%HTML', timeout=t)
        p.expect(r'%%bash', timeout=t)
        p.expect(r'%lsmagic', timeout=t)
        p.expect(r'%classpath add jar', timeout=t)
        p.expect(r'%classpath add mvn', timeout=t)
        p.expect(r'%%classpath add mvn', timeout=t)
        p.expect(r'%classpath add dynamic', timeout=t)
        p.expect(r'%classpath config resolver', timeout=t)
        p.expect(r'%classpath reset', timeout=t)
        p.expect(r'%classpath', timeout=t) 
        p.expect(r'%import static', timeout=t)
        p.expect(r'%import', timeout=t)
        p.expect(r'%unimport', timeout=t)
        p.expect(r'%time', timeout=t) 
        p.expect(r'%%time', timeout=t) 
        p.expect(r'%timeit', timeout=t) 
        p.expect(r'%%timeit', timeout=t)
        p.expect(r'%load_magic', timeout=t)
        p.expect(r'%%kernel', timeout=t)
        p.expect(r'%%python', timeout=t)
        p.expect(r'%%clojure', timeout=t)
        p.expect(r'%%groovy', timeout=t)
        p.expect(r'%%java', timeout=t)
        p.expect(r'%%kotlin', timeout=t)
        p.expect(r'%%scala', timeout=t)
        p.expect(r'%%sql', timeout=t)
        p.expect(r'%%async', timeout=t)
    except Exception as e:
        print(e) 
        result = 1
        
    stop_console(p, pexpect, t)
    print("test_lsmagic return code=", result)
    return result
