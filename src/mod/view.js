/**
 * @class view
 * @desc view类.
 * @date 2015/01/08
 * @author farman(yuhongfei1001@163.com)
 */
define("view", ["events"], function(require, exports, module) {
	var Events = require("events");

	var View = Events.extend({
		init: function() {
			this._super();

			this.on("show", this.onShow);
			this.on("hide", this.onHide);
		},
		onShow: function(){
			console.log("show");
		},
		onHide: function(){
			console.log("hide");
		}
	});
	module.exports = View;
});