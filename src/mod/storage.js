/**
 * @class storage
 * @desc 储存类
 * @date 2015/01/08
 * @author farman(yuhongfei1001@163.com)
 */
define("storage", [], function(require, exports, module) {

	var Storage = Class.extend({
		init: function(key, value, lifeTime) {
			this.key = key;
			this.value = value;
			this.lifeTime = lifeTime || 0;
		},
		set: function(value) {
			//简单包装一下，方便还原的时候，类型一致，因为localstorage仅支持string类型数据.
			var data = {
				"value": value || this.value
			};
			data = JSON.stringify(data);

			window.localStorage.setItem(this.key, data);
			if (this.lifeTime > 0) {
				Storage.lifeTime[this.key] = new Date().getTime() + this.lifeTime;
			}
		},
		get: function() {
			var data = window.localStorage.getItem(this.key);
			if (!data) return null;
			data = JSON.parse(data);

			// 是否过期
			if (this.lifeTime == 0) {
				return data.value;
			} else {
				if (new Date().getTime() <= Storage.lifeTime[this.key]) {
					return data.value;
				} else {
					window.localStorage.removeItem(this.key);
					return '数据已过期'
				}
			}
		},
		//移除
		remove: function() {
			window.localStorage.removeItem(this.key);
			return true
		},
		//获取单个
		getAttr: function(key) {
			var all = this.get();
			if (all[key]) {
				return all[key];
			}
			return null;
		},
		//设置单个.
		setAttr: function(key, val) {
			var all = this.get();
			all[key] = val;
			this.set(all);
			return all;
		}
	});

	module.exports = Storage;
})