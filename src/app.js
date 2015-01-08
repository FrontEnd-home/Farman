/**
 * @class app
 * @desc 单页app类
 * @date 2015/01/08
 * @author farman(yuhongfei1001@163.com)  
 */
define("app", ["parser"], function(require, exports, module) {
	
	var Parser = require("parser");

	var App = Class.extend({
		init: function( routes ) {
			this.parser = Parser.newInstance([location, routes]);
			this.updateView();
		},
		obServer: function(){
			$(window).on("hashchange", this.viewChange);
		},
		viewChange: function(){
			this.parser.decode(location.hash, "hash");
			this.updateView();
		},
		updateView: function(){
			this.view = this.parser.view;
			this.loadView( this.view );
		},
		loadView: function( view ){
			if(!view){
				console.error("have no this page!, please check routes!");
				return;
			}
			try{
				seajs.use(view);
			}catch(e){
				console.error("have no this view!");
			}
		},
		forWard: function( page ){
			var currentState = history.state;
			history.pushState(currentState, "", page);
		}
	});

	module.exports = App;
});