define("pageModels", ["model"], function(require, exports, module){
	var model = require("model");
	var host = "http://localhost";
	//创建模型的基础方法.
	var createModel = function(url, opt){
		var deafultOpt = {
			url : host + url
		};
		if(opt){
			deafultOpt = $.extend(deafultOpt, opt);
		}
		return model.newInstance([deafultOpt]);
	};
	
	var modelInterface = {};
	modelInterface.getCatory = createModel("/ajax/list");

	module.exports = modelInterface;
	
});