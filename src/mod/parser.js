/**
 * @class parser
 * @desc url解析模块类.
 * @date 2015/01/08
 * @author farman(yuhongfei1001@163.com)  
 */
define("parser", [], function(require, exports, module) {
	
	var Parser = Class.extend({
		init: function(location, viewsRoutes){
			this.viewsRoutes = viewsRoutes;
			this.decode(location);
			return this;
		},
		decode: function(url){
			var hash = url.hash;
			var pathname = url.pathname;
			var routes = this.viewsRoutes;
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
		},
		getViewRoutes: function(){
			return this.viewsRoutes;
		}
	})

	module.exports = Parser;
});