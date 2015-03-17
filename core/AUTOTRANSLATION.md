This file documents the type autotranslation standard


Types to JSON:


integer					integer
string					string
boolean					boolean
float					double
date					{ type: 'Date', value: '...', timestamp: XX }

data frame				{ type: 'TableDisplay', subtype: 'TableDisplay', columnNames: [...], types: [...], values: [...] }
list of dictionaries	{ type: 'TableDisplay', subtype: 'ListOfMaps', columnNames: [...], types: [...], values: [...] }
[basic types]			[basic types]
2D [] of basic types	{ type: 'TableDisplay', subtype: 'Matrix', columnNames: ['c0','c1',...], types: [...], values: [...] }
2D [] of objects		2D [] objects
xD [] of objects		xD [] objects
dictionary				{ type: 'TableDisplay', subtype: 'Dictionary', columnNames: ['Key','Value'], values: [...] }
Plot					{ type: 'Plot', .... }
Image					{ type: 'ImageIcon', .... }
OutputContainer			{ type: 'OutputContainer', items: [...] }
BeakerCodeCell			{ type: 'BeakerCodeCell', .... }
map of objects			{ key: val, ... }


EvaluationResult		content object
BeakerProgressUpdate
UpdatableEvaluationResult
SimpleEvaluationObject	{ type: 'SimpleEvaluationObject', update_id: '...', expression: '...', status: '...', message: '...', progressBar: 0, payload: {...}, outputdata: [ { type: 'out/err', value: '...' } ...] }
UpdatableEvaluationResult	{ type: 'UpdatableEvaluationResult', update_id: '...', payload: {...} }


return/set/read


						JVM				R	Python2	Python3	JavaScript
integer					ok/ok/ok			ok		ok
string					ok/ok/ok			ok		ok
boolean					ok/ok/ok			ok		ok
float					ok/ok/ok			ok		ok
date					ok/ok/ok

data frame				ok/ok/ok			ok		ok
list of dictionaries	ok/ok/KO			N/A
[basic types]			ok/ok/ok			ok		ok
2D [] of basic types	ok/ok/ok			KO
2D [] of objects		ok/ok/ok			KO
xD [] of basic types	ok/ok/ok		
dictionary				ok/ok/ok		KO
Plot					ok/ok/KO
Image					ok/ok/ok		
OutputContainer			ok/ok/ok
BeakerCodeCell			ok/ok/KO
map of objects			ok/ok/ok



