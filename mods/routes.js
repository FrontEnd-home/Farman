define(function(require, exports, module) {
	//@see https://github.com/FrontEnd-home/wiki/blob/master/frontend.md
	var routes = [{
			name: "index",
			match: /^\/(index|index.html)?/i
		},{
			name: "list",
			match: /^\/list\/[\s\S]+/i
		}, {
			name: "tagged",
			match: /^\/tagged\/[\s\S]+/i
		}, {
			name: "search",
			match: /^\/q\/[\s\S]+/i
		}, {
			name: "golbal_objects",
			match: /^\/golbal_objects\/[\s\S]+/i
		}];
	return routes;
});