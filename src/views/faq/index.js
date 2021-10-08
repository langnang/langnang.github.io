"use strict";
(function (define) {
	document.title = "FAQ’s - Langnang";
	define(function (require, exports, module) {
		module.exports = {
			template: require("text!./index.hbs"),
			run: function ({ config, render, route, template, Handlebars }) {
				Handlebars.registerHelper("index", function (index, page = 1, size = 10) {
					return index + 1;
				});
				$.ajax({
					method: "post",
					url: `${config.api_php_url}/typecho/post/list`,
					data: {
						prefix: "*",
						title: getUrlParams()["kw"],
					},
					success: function (res) {
						render(Handlebars.compile(template)(res.data));
					},
				});
			},
		};
	});
})(define);
