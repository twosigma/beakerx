This file documents the type autotranslation standard


Types to JSON:


0 - integer					integer
1 - float					double
2 - boolean					boolean
3 - string					string
4 - date					{ type: 'Date', value: '...', timestamp: XX }
5 - data frame				{ type: 'TableDisplay', subtype: 'TableDisplay', columnNames: [...], types: [...], values: [...] }
6 - [dict basictyp]			{ type: 'TableDisplay', subtype: 'ListOfMaps', columnNames: [...], types: [...], values: [...] }
7 - [basictyp]				[...]
8 - [basictyp][basictyp]	{ type: 'TableDisplay', subtype: 'Matrix', columnNames: ['c0','c1',...], types: [...], values: [...] }
9 - [objects][objects]		[...][...]
10 - [obj][obj][obj]..		[...][...][...]...
11 - dict (basictyp)		{ type: 'TableDisplay', subtype: 'Dictionary', columnNames: ['Key','Value'], values: [...] }
12 - Plot					{ type: 'Plot', .... }
13 - Image					{ type: 'ImageIcon', .... }
14 - OutputContainer			{ type: 'OutputContainer', items: [...] }
15 - BeakerCodeCell			{ type: 'BeakerCodeCell', .... }
16 - dict					{ key: val, ... }
17 - [dict]					[ { ... }, ... ]



EvaluationResult		content object
BeakerProgressUpdate
UpdatableEvaluationResult
SimpleEvaluationObject	{ type: 'SimpleEvaluationObject', update_id: '...', expression: '...', status: '...', message: '...', progressBar: 0, payload: {...}, outputdata: [ { type: 'out/err', value: '...' } ...] }
UpdatableEvaluationResult	{ type: 'UpdatableEvaluationResult', update_id: '...', payload: {...} }


return/set/read


						JVM				R		Python2		Python3
0 - integer				ok/ok/ok	ok/ok/ok		ok
1 - float				ok/ok/ok	ok/ok/ok		ok
2 - boolean				ok/ok/ok	ok/ok/ok		ok
3 - string				ok/ok/ok	ok/ok/ok		ok
4 - date				ok/ok/ok	ok/ok/ok
5 - data frame			ok/ok/ok	ok/ok/ok		ok
6 - [dict btype]		ok/ok/ok	ok/ok/ok
7 - [btype]				ok/ok/ok	ok/ok/ok		ok
8 - [btype][btype]		ok/ok/ok	ok/ok/ok
9 - [objects][objects]	ok/ok/ok	N/A
10 - [obj][obj][obj]..	ok/ok/ok	N/A
11 - dict (basictyp)	ok/ok/ok	ok/ok/ok
12 - Plot				ok/ok/KO	N/A
13 - Image				ok/ok/ok	N/A
14 - OutputContainer	ok/ok/ok	ok/ok/ok
15 - BeakerCodeCell		ok/ok/ok	ok/ok/ok
16 - dict				ok/ok/ok	ok/ok/ok
17 - [dict]				ok/ok/ok	ok/ok/ok


