/**
 * @class app
 * @desc 单页app类
 * @date 2015/01/08
 * @author farman(yuhongfei1001@163.com)  
 */
define("app", ["events","parser"], function(require, exports, module) {
	
	var Parser = require("parser");
	var Events = require("events");

	var App = Events.extend({
		init: function( routes, defaultView ) {
			this._super();
			
			this.root = $("#contentView");
			this.views = {};
			this.viewList = [];
			this.currentView = Events.newInstance();
			this.parser = Parser.newInstance([location, routes, defaultView]);
			this.updateView();
			this.obServer();
		},
		obServer: function(){
			var self = this;
			$(document).delegate("a","click", function(e){
				var href = $(e.target).attr("href");
				if(href){
					e.preventDefault();
					self.forWard(href);
					self.viewChange(href);
				}
			});
		},
		viewChange: function(href){
			var path = href || location.pathname;
			this.parser.decode(path, "path");
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
			this.currentView.fire("hide");
			if(this.views[view]){
				this.currentView = this.views[view];
			} else{
				try{
					this.currentView = require(view).newInstance();
					this.root.append( this.currentView.$el );
					this.views[view] = this.currentView;
					this.viewList.push(this.currentView);
				}catch(e){
					console.error("have no this view!");
				}
			}
			this.currentView.fire("show");
		},
		forWard: function( page ){
			var currentState = history.state;
			history.pushState(currentState, "", page);
		}
	});

	module.exports = App;
});