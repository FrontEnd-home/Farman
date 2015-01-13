/**
 * @class events
 * @desc 事件基类, 用于事件派发.
 * @date 2015/01/09
 * @author farman(yuhongfei1001@163.com)
 */
define("events", function(require, exports, module) {

	var Events = Class.extend({
		init: function() {
			this.__listeners = {};
		},
		on: function(name, handler) {
			if (this.__listeners[name] && this.__listeners[name].length) {
				this.__listeners.push(handler);
			} else {
				this.__listeners[name] = [handler];
			}
		},
		off: function(name) {
			if (this.__listeners[name] && this.__listeners[name].length) {
				this.__listeners[name] = [];
			}
		},
		fire: function(name, data) {
			if (this.__listeners[name] && this.__listeners[name].length) {
				var handlers = this.__listeners[name];
				handlers.forEach(function(handler) {
					handler.call(null, data);
				});
			}
		}
	});
	module.exports = Events;
});