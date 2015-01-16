/**
 * @class dir
 * @desc view类.
 * @date 2015/01/16
 * @author farman(yuhongfei1001@163.com)
 */
define(function(require, exports, module) {
	var Events = require("events");

	var Dir = Events.extend({
		init: function(parent, className, data) {
			this._super();

			this.$el = $("<div class='side-dir'></div>");
			this.parent = parent;
			this.className = className;
			this.dirData = data;
			this.render(data);
			this.bindEvent();
		},
		render: function(data){
			this.$el.empty();
			var self = this;
			self.$el.append("<h1>"+ this.className +"</h1>");
			data.forEach(function(item){
				self.$el.append("<p>"+ item +"</p>");
			});
		},
		bindEvent: function(e){
			var self = this;
			this.$el.delegate("p","click", function(e){
				var target = $(e.target);
				target.css("color","red");
				self.parent.fire("OpenPage", target.text());
			});
			this.$el.delegate("h1","click", function(e){
				var target = $(e.target);
				target.css("color","green");
				self.parent.fire("OpenClass", target.text());
			});
		},
		openClass: function(){
			console.log("show");
		},
		closeClass: function(){
			console.log("hide");
		}
	});
	module.exports = Dir;
});