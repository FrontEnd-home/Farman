define("search", ["view","pageModels","pageStores"], function(require, exports, module){
	var View = require("view");

	var listController = View.extend({
		init: function(){
			this._super();
			this.$el.html("search");
		},
		onShow: function(){
			console.log("search.show!");
		},
		onHide: function(){
			console.log("search.hide!");
		}
	});

	module.exports = listController;
});