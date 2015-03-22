//  Copyright 2015 Michael Pymm
//
//  Licensed under the Apache License, Version 2.0 (the "License");
//  you may not use this file except in compliance with the License.
//  You may obtain a copy of the License at
//
//         http://www.apache.org/licenses/LICENSE-2.0
//
//  Unless required by applicable law or agreed to in writing, software
//  distributed under the License is distributed on an "AS IS" BASIS,
//  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//  See the License for the specific language governing permissions and
//  limitations under the License.

/ q functions for beaker integration.
/ Everything goes in the "bk" directory.

\d .bk              / switch to the beaker directory

/ Base64 encoding.
/ These are the digits used for the encoding.
b64:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"

/ Encoding function.
b64e: {
    / Number of padding chars we'll need
    l:(3-count x) mod 3;
    / Build the encoded string - cut the input into 3-char chunks
    / and pad with zeros to make sure it's a multiple of three chars.
    e: raze {
        b64 ((({y+256*x}/)`int$x) div 64 xexp 3 - til 4) mod 64
    } each 3 cut x,((3-count x) mod 3)#0;
    / Final string - cut off the "empty" chars (formed from the added
    / zeros) and attach the padding.
    ((neg l)_e),l#"="
    }

/ The beaker core server URL.
bc_host: "localhost:", getenv `beaker_core_port
bc_hsym: hsym `$"http://",bc_host

/ Send an HTTP GET query to the beaker core server; the session will be appended.
bc_get: {[url]
    bc_hsym raze (
        "GET "; url; "&session="; getenv `session_id; " HTTP/1.0\r\n";
        "host:" , bc_host , "\r\n";
        "Authorization: Basic " , b64e["beaker:" , getenv `beaker_core_password];
        "\r\n\r\n"
    )}

/ Get a namespace variable.
g: {j:.j.k raze 4_"\n" vs bc_get["/rest/namespace/get?name=",string x]; j[`value]}

/ Send an HTTP POST query to the beaker core server.
bc_post: {[url; form]
    f: raze ("session="; getenv `session_id; enlist "&"),form;
    l: count f;
    bc_hsym raze (
        "POST "; url; " HTTP/1.0\r\n";
        "host:"; bc_host; "\r\n";
        "Authorization: Basic " , b64e["beaker:" , getenv `beaker_core_password];
        "Content-Type: application/x-www-form-urlencoded\r\n";
        "Content-Length: "; string l;
        "\r\n\r\n";
        f
    )}

/ Set a namespace variable.
s: {[name;val]
    j:.j.j raze 4_"\n" vs bc_post["/rest/namespace/set"; (
        "sync=true";
        "&name="; string name;
        "&value="; .j.j val
    )];
    $[j~"\"ok\"";`ok;`$j]
    }

/ Autocomplete candidates.
.bk.ac:{
    a:(system"v"),(system"f"),
    `abs`aj`aj0`acos`all`and`any`asc`asin`asof`atan`attr`avg`avgs`bin`binr,
    `ceiling`cols`cor`cos`count`cov`cross`cut`delete`deltas`desc`dev`differ,
    `distinct`div`do`each`ej`enlist`eval`except`exec`exit`exp`fby`fills`first,
    `flip`floor`fkeys`get`getenv`group`gtime`hclose`hcount`hdel`hopen`hsym`iasc,
    `idesc`if`ij`in`insert`inter`inv`key`keys`last`like`lj`load`log`lower`lsq,
    `ltime`ltrim`mavg`max`maxs`mcount`md5`mdev`med`meta`min`mins`mmax`mmin`mmu,
    `mod`msum`neg`next`not`null`or`over`parse`peach`pj`plist`prd`prds`prev`prior,
    `rand`rank`ratios`raze`read0`read1`reciprocal`reverse`rload`rotate`rsave,
    `rtrim`save`scan`scov`sdev`select`set`setenv`show`signum`sin`sqrt`ss`ssr,
    `string`sublist`sum`sums`sv`svar`system`tables`tan`til`trim`txf`type`uj,
    `ungroup`union`update`upper`upsert`value`var`view`views`vs`wavg`where`while,
    `within`wj`wj1`wsum`xasc`xbar`xcol`xcols`xdesc`xexp`xgroup`xkey`xlog`xprev,
    `xrank;
    a where a like x,enlist"*"
    }

\d .                    / back to the default directory.
