define("routes", [], function(require, exports, module) {
	//@see https://github.com/FrontEnd-home/wiki/blob/master/frontend.md

	var routes = [{
			name: "list",
			type: "path",
			match: /^\/\w/i
		}, {
			name: "tagged",
			type: "path",
			match: /^\/tagged\/\w$/i
		}, {
			name: "search",
			type: "hash",
			match: /^#q=[\s\S]+/i
		}, {
			name: "golbal_objects",
			type: "path",
			match: /^\/golbal_objects\/(\w(\.|\_)?)+$/i
		}];
	return routes;
});