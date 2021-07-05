"use strict";

(function (requirejs) {
  // requirejs.config();
  define(["./.config.js"], function (config) {
    requirejs(config.requirejsConfig);

    require([
      "jquery",
      `text!${config.publicPath}/layout/component/header.hbs`,
      `text!${config.publicPath}/layout/component/footer.hbs`,
      "handlebars",
      "bootstrap",
    ], function ($, headerHtml, footerHtml) {
      $("body>header").html(headerHtml);
      $("body>footer").html(footerHtml);
      $(document).ready(function () {
        $(".loading").fadeOut(500);
      });
    });

    // $(document).ready(flat.docReady);
    // $(window).on("load", flat.winLoad);
  });
})(requirejs);
