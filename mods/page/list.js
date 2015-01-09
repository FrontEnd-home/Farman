define("list", ["view","pageModels","pageStores"], function(require, exports, module){
	var View = require("view");

	var listController = View.extend({
		init: function(){
			this._super();
		},
		onShow: function(){
			console.log("list.show!");
		},
		onHide: function(){
			console.log("list.hide!");
		}
	});

	module.exports = listController;
});