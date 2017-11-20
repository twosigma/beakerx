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
    
    os.system("kill -9 `pgrep -f jupyter`");


def test_lsmagic():
    result = 0
    p, pexpect, t = start_console()
    p.sendline('%lsmagic')
    try:
        p.expect(r'Available magic commands:', timeout=t)
        p.expect(r'%%javascript', timeout=t)
        p.expect(r'%%html', timeout=t)
        p.expect(r'%%bash', timeout=t)
        p.expect(r'%lsmagic', timeout=t)
        p.expect(r'%classpath add jar', timeout=t)
        p.expect(r'%classpath add mvn', timeout=t)
        p.expect(r'%classpath remove', timeout=t)
        p.expect(r'%classpath', timeout=t) 
        p.expect(r'%import static <classpath>', timeout=t)
        p.expect(r'%import <classpath>', timeout=t)
        p.expect(r'%unimport <classpath>', timeout=t)
        p.expect(r'%time', timeout=t) 
        p.expect(r'%%time', timeout=t) 
        p.expect(r'%timeit', timeout=t) 
        p.expect(r'%%timeit', timeout=t)
    except Exception as e:
        print(e) 
        result = 1
        
    stop_console(p, pexpect, t)
    print("test_lsmagic return code=", result)
    return result