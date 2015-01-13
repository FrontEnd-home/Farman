/**
 * @module commonStorage
 * @desc 公共存储.
 * @date 2015/01/08
 * @author farman(yuhongfei1001@163.com)  
 */
define("commonStorage", ["storage"], function(require, exports, module) {

	var Storage = require("storage");

	function createStorage(key, value, lifetime){
		var value = value || {};
		var lifetime = lifetime || 0;
		return Storage.newInstance([key, value, lifetime]);
	}

	var commonStorage = {};
	commonStorage.head = createStorage("HEAD");
	
	module.exports = commonStorage;
});