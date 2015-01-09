/**
 * @class events
 * @desc 事件基类, 用于事件派发.
 * @date 2015/01/09
 * @author farman(yuhongfei1001@163.com)
 */
define("events", function(require, exports, module) {

	var Events = Class.extend({
		init: function() {
			this.__events = {};
		},
		on: function(name, handler) {
			if (this.__events[name] && this.__events[name].length) {
				this.__events.push(handler);
			} else {
				this.__events[name] = [handler];
			}
		},
		off: function(name) {
			if (this.__events[name] && this.__events[name].length) {
				this.__events[name] = [];
			}
		},
		fire: function(name, data) {
			if (this.__events[name] && this.__events[name].length) {
				var handlers = this.__events[name];
				handlers.forEach(function(handler) {
					handler.call(null, data);
				});
			}
		}
	});
	module.exports = Events;
});