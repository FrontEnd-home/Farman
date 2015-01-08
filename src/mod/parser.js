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
			if(location.hash.length){
				this.decode(location.hash, "hash");
			} else{
				this.decode(location.pathname, "path");
			}
			return this;
		},
		decode: function(url, pagetype){
			if(!url.length) return;
			var type = pagetype || "path";
			var routes = this.viewsRoutes;
			var self = this;
			routes.forEach(function(item){
				if(item.type == type 
				&& item.match.test(url)
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