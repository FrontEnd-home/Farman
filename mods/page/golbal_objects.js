define(function(require, exports, module){
	var View = require("view");

	var listController = View.extend({
		init: function(){
			this._super();
			this.$el.html("golbal_objects");
		},
		onShow: function(){
			console.log("golbal_objects.show!");
		},
		onHide: function(){
			console.log("golbal_objects.hide!");
		}
	});

	module.exports = listController;
});