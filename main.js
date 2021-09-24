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
			// $(document).ready(function () {});

			$(document).on("click", ".search-icon", function (e) {
				const searchForm = $(".search-form");
				$(this).add(searchForm).toggleClass("active");
			});
			$(document).on("input", "input[type=search]", function (e) {});

			if (window.location.pathname === "/faq.html") {
				requirejs(["faq"]);
			} else {
				$(".loading").fadeOut(500);
			}
		});

		// $(document).ready(flat.docReady);
		// $(window).on("load", flat.winLoad);
	});

	define("faq", ["./app.config", "jquery", "handlebars"], function (config, $, Handlebars) {
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
				$(".loading").fadeOut(500);
			},
		});
	});
})(requirejs);

function getUrlParams(url = window.location.href, key = null) {
	if (url.indexOf("?") === -1) {
		return false;
	}
	var arr = decodeURIComponent(url).split("?");
	arr = arr[1].split("&");
	var len = arr.length,
		obj = {};
	for (var i = 0; i < len; i++) {
		var a = arr[i].split("=");
		obj[a[0]] = a[1];
	}
	if (key) {
		return obj[key];
	}
	return obj;
}
