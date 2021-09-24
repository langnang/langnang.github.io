"use strict";

(function (requirejs) {
	// requirejs.config();
	define(["./app.config"], function (config) {
		requirejs(config.requirejsConfig);

		require([
			"jquery",
			"handlebars",
			`text!${config.publicPath}/layout/component/header.hbs`,
			`text!${config.publicPath}/layout/component/footer.hbs`,
			"css!assets/css/main.css",
			"bootstrap",
		], function ($, Handlebars, headerHtml, footerHtml) {
			$("body>header").html(Handlebars.compile(headerHtml)(config));
			$("body>footer").html(Handlebars.compile(footerHtml)(config));
			$(document).ready(function () {
				$(".loading").fadeOut(500);
			});

			$(document).on("click", ".search-icon", function (e) {
				const searchForm = $(".search-form");
				$(this).add(searchForm).toggleClass("active");
			});
			$(document).on("input", "input[type=search]", function (e) {
				console.log(e);
			});

			if (window.location.pathname === "/faq.html") {
				requirejs(["faq"]);
			}
		});

		// $(document).ready(flat.docReady);
		// $(window).on("load", flat.winLoad);
	});

	define("faq", ["jquery", "handlebars"], function ($, Handlebars) {
		console.log("faq");
		Handlebars.registerHelper("index", function (index, page = 1, size = 10) {
			return index + 1;
		});
		$.ajax({
			method: "post",
			url: "http://127.0.0.1:9090/log/history/list",
			success: function (res) {
				console.log(res);
				$(".faq-area-2 .container .row").html(
					Handlebars.compile(`
<div class="col-md-8">
	{{#each @root.rows}}
		<div class="single-faq">
			<h2><span>{{index @index}}</span>{{title}}</h2>
			<p>{{text}}</p>
		</div>
	{{/each}}
</div>
<div class="col-md-4">
	<div class="faq-sidebar-wrap">
		<h3>Index</h3>
		<ul class="faq-sidebar">
		{{#each @root.rows}}
			<li>
				<a href="#"><span>{{index @index}}.</span>{{title}}</a>
			</li>
		{{/each}}
		</ul>
	</div>
</div>

				`)(res.data)
				);
			},
		});
	});
})(requirejs);
