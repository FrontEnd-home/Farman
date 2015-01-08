/**
 * @class app
 * @desc 单页app类
 * @date 2015/01/08
 * @author farman(yuhongfei1001@163.com)  
 */
define("app", [], function(require, exports, module) {
	
	var App = Class.extend({
		init: function( parser ) {
			this.parser = parser;
			this.view = parser.view;
			this.loadView(this.view);
		},
		obServer: function(){
			$(window).on("hashchange", this.viewChange);
		},
		viewChange: function(){

		},
		loadView: function( view ){

		},
		forWard: function( page ){
			var currentState = history.state;
			history.pushState(currentState, "", page);
		}
	});

	module.exports = App;
});