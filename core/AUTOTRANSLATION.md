This file documents the type autotranslation standard


Types to JSON:


0 - integer					integer
1 - string					string
2 - boolean					boolean
3 - float					double
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


						JVM				R	Python2	Python3	JavaScript
1 - integer				ok/ok/ok	KO/ok/ok		ok
2 - string				ok/ok/ok	KO/ok/ok		ok
3 - boolean				ok/ok/ok	KO/ok/ok		ok
4 - date				ok/ok/ok	KO/ok/ok
5 - data frame			ok/ok/ok	KO/ok/ok		ok
6 - [dict btype]		ok/ok/KO	KO/KO
7 - [btype]				ok/ok/ok	KO/ok/ok		ok
8 - [btype][btype]		ok/ok/ok	KO/ok/ok
9 - [objects][objects]	ok/ok/KO	KO/ok
10 - [obj][obj][obj]..	ok/ok/ok	KO/ok
11 - dict (basictyp)	ok/ok/ok	KO/KO/ok
12 - Plot				ok/ok/KO	KO/KO/KO
13 - Image				ok/ok/ok	KO/KO/KO
14 - OutputContainer	ok/ok/ok	KO/ok/KO
15 - BeakerCodeCell		ok/ok/KO	KO/ok/KO
16 - dict				ok/ok/ok	KO/ok/KO
17 - [dict]				KO/KO/KO	KO/?/?


