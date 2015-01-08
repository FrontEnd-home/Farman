define("parser", [], function(require, exports, module) {
	var Parser = Class.extend({
		init: function(location, viewsRoutes){
			this.decode(location, viewsRoutes);
			return this;
		},
		decode: function(url, routes){
			var hash = url.hash;
			var pathname = url.pathname;
			var self = this;
			routes.forEach(function(item){
				if(item.type == "hash" 
				&& item.match.test(hash)
				){
					 self.view = item.name;
				}

				if(item.type == "path" 
				&& item.match.test(pathname)
				){
					 self.view = item.name;
				}
			});
		}
	})

	module.exports = Parser;
});