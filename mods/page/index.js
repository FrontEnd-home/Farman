define("index", ["view","pageModels","pageStores"], function(require, exports, module){
	var View = require("view");

	var listController = View.extend({
		init: function(){
			this._super();
			this.$el.html("index");
		},
		onShow: function(){
			console.log("index.show!");
		},
		onHide: function(){
			console.log("index.hide!");
		}
	});

	module.exports = listController;
});