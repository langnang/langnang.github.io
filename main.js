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
      "bootstrap",
      "css!assets/css/main.css",
    ], function ($, Handlebars, headerHtml, footerHtml) {
      $("body>header").html(Handlebars.compile(headerHtml)(config));
      $("body>footer").html(Handlebars.compile(footerHtml)(config));
      $(document).ready(function () {
        $(".loading").fadeOut(500);
      });
    });

    // $(document).ready(flat.docReady);
    // $(window).on("load", flat.winLoad);
  });
})(requirejs);
