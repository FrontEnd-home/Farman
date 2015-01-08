define("app", [], function(require, exports, module) {
	
	var App = Class.extend({
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

	return App;
});