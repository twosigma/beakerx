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
[objects]				[objects]
2D [] of basic types	{ type: 'TableDisplay', subtype: 'Matrix', columnNames: ['c0','c1',...], types: [...], values: [...] }
2D [] of objects		2D [] objects
xD [] of objects		xD [] objects
basic type map			{ type: 'TableDisplay', subtype: 'Dictionary', columnNames: ['Key','Value'], values: [...] }

object map				dictionary
Image
OutputContainer			{ type: 'OutputContainer', items: [...] }
BeakerCodeCell

EvaluationResult		content object
BeakerProgressUpdate
UpdatableEvaluationResult
SimpleEvaluationObject	{ type: 'SimpleEvaluationObject', update_id: '...', expression: '...', status: '...', message: '...', progressBar: 0, payload: {...}, outputdata: [ { type: 'out/err', value: '...' } ...] }
UpdatableEvaluationResult	{ type: 'UpdatableEvaluationResult', update_id: '...', payload: {...} }



						JVM				R	Python2	Python3	JavaScript
integer					ok/ok			ok		ok
string					ok/ok			ok		ok
boolean					ok/ok			ok		ok
float					ok/ok			ok		ok
date					NO

data frame				ok/ok			ok		ok
list of dictionaries	ok/ok			N/A
[basic types]			ok/ok			ok		ok
2D [] of basic types	ok/ok			KO
2D [] of objects		ok/ok			KO
xD [] of basic types	ok/ok		
dictionary				(map) ok/ok		KO
Plot					ok
Image					ok/ok		
OutputContainer			ok/ok
BeakerCodeCell			ok/ok



