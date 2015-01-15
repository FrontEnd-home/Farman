/**
 * @class parser
 * @desc url解析模块类.
 * @date 2015/01/08
 * @author farman(yuhongfei1001@163.com)  
 */
define(function(require, exports, module) {

	var Parser = Class.extend({
		init: function(location, viewsRoutes, defaultView){
			this.viewsRoutes = viewsRoutes;
			this.view = defaultView || "index";
			this.decode(location.pathname);
			return this;
		},
		decode: function(url, pagetype){
			if(!url.length) return;
			var routes = this.viewsRoutes;
			var self = this;
			routes.forEach(function(item){
				if(item.match.test(url)
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