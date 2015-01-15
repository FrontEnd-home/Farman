define(function(require, exports, module){
	var View = require("view");

	var listController = View.extend({
		init: function(){
			this._super();

			this.$el.html("tagged");
		},
		onShow: function(){
			console.log("tagged.show!");
		},
		onHide: function(){
			console.log("tagged.hide!");
		}
	});

	module.exports = listController;
});