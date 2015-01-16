/**
 * @class view
 * @desc view类.
 * @date 2015/01/08
 * @author farman(yuhongfei1001@163.com)
 */
define(function(require, exports, module) {
	var Events = require("events");

	var View = Events.extend({
		init: function(parent) {
			this._super();

			var self = this;
			this.parent = parent;

			this.$el = $("<div class='viewport'></div>");
			this.on("show", function(){
				self.$el.show();
				self.onShow();
			});
			this.on("hide", function(){
				self.$el.hide();
				self.onHide();
			});

			//支持自定义事件.
			if(this.events){
				for (var method in this.events) {
					var matchMethod = /(click|tap|touchstart|touchmove|touchend|touchcancel|mouseup|mousedown|mouseover|mousemove|mouseout|input|blur|focus|keydown|keyup)\s+([\s\S]+)/i;
					var macth = method.match(matchMethod);
					var callback = this[this.events[method]];
					var handler = (function() {
						return $.proxy(callback, self);
					})();
					this.$el.delegate(macth[2], macth[1], handler);
				}
			}
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