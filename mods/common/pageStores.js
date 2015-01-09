define("pageStores", ["storage"], function(require, exports, module) {

	var Storage = require("storage");

	function createStorage(key, value, lifetime) {
		var value = value || {};
		var lifetime = lifetime || 0;
		return Storage.newInstance([key, value, lifetime]);
	}

	var storageInterface = {};
	storageInterface.head = createStorage("HEAD");

	module.exports = storageInterface;
});