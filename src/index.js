define("app", ["routes","parser", "view"], function(require, exports, module) {
	
	var Parser = require("parser");
	var View = require("view");
	var routes = require("routes");

	var Farman = Class.extend({
		init: function(opt) {
			this.defaultView = opt.view;
		},
		obServer: function(){
			
		},
		viewChange: function(){

		},
		loadView: function(){

		},
		forWard: function( page ){
			var currentState = history.state;
			history.pushState(currentState, "", page);
		}
	});

	var parserInstance = Parser.newInstance([location, routes]);
	this.Farman = Farman.newInstance([parserInstance]);
});