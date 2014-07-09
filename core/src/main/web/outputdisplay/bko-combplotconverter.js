(function() {'use strict';
	var retfunc = function(bkUtils) {
		return {
			standardizeModel : function(model) {
				console.log(newmodel);
				return newmodel;
			}
		};
	};
	beaker.bkoFactory('combplotConverter', ["bkUtils", "lineplotConverter", retfunc]);
})(); 