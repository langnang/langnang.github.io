`use strict`;
(function (define) {
	define(function (require, exports, module) {
		`use strict`;
		const jsdelivrCDN = 'https://cdn.jsdelivr.net/npm';
		const vendor = {
			'crypto-js': {
			}
		};
		const paths = {
			ace: `${jsdelivrCDN}/ace-builds@latest/src-min-noconflict`,
			amplitudejs: `${jsdelivrCDN}/amplitudejs@{{version-number}}/dist/amplitude`,
			axios: `https://cdn.jsdelivr.net/npm/axios@latest/dist/axios.min.js`,
			audiojs: `audiojs/audiojs/audio`,
			axios: `${jsdelivrCDN}/axios@latest/dist/axios.min`,
			bootstrap: `${jsdelivrCDN}/bootstrap@3.4.1/dist/js/bootstrap.min`,
			bowser: `${jsdelivrCDN}/bowser@latest/es5.min`,
			clappr: `${jsdelivrCDN}/clappr@latest/dist/clappr.min`,
			clipboard: `${jsdelivrCDN}/clipboard@latest/dist/clipboard.min`,
			'crypto-js': `${jsdelivrCDN}/crypto-js@latest/crypto-js.min`,
			d3: `${jsdelivrCDN}/d3@3.5.6/d3.min`,
			downloadjs: `${jsdelivrCDN}/downloadjs@latest/download.min`,
			dragula: [`dragula/dist/dragula`, `css!dragula/dist/dragula.css`],
			director: `${jsdelivrCDN}/director@latest/build/director.min`,
			echarts: `${jsdelivrCDN}/echarts@latest/dist/echarts.min`,
			'echo-js': `${jsdelivrCDN}/echo-js@latest/src/echo.min`,
			gmaps: `${jsdelivrCDN}/gmaps@latest/gmaps.min`,
			handlebars: `${jsdelivrCDN}/handlebars@4.7.7/dist/handlebars.min`,
			Handsontable: `${jsdelivrCDN}/handsontable@6.2.2/dist/handsontable.min`,
			'hls.js': `https://cdn.jsdelivr.net/npm/hls.js@1.1.3/dist/hls.min`,
			holderjs: `${jsdelivrCDN}/holderjs@2.9.4/holder.min`,
			ionicons: `https://cdn.jsdelivr.net/npm/ionicons@6.0.1/dist/ionicons/ionicons.esm`,
			jquery: `${jsdelivrCDN}/jquery@latest/dist/jquery.min`,
			jqvmap: `jqvmap/dist`,
			'js-cookie': `https://cdn.jsdelivr.net/npm/js-cookie@3.0.1/dist/js.cookie.min`,
			jsoneditor: `${jsdelivrCDN}/jsoneditor@9.2.0/dist/jsoneditor.min`,
			leaflet: `${jsdelivrCDN}/leaflet@1.0.3/dist/leaflet`,
			'markdown-it': `${jsdelivrCDN}/markdown-it@10.0.0/dist/markdown-it.min`,
			masonry: `${jsdelivrCDN}/masonry-layout@4.2.2/dist/masonry.pkgd.min`,
			mathjax: `https://cdn.jsdelivr.net/npm/mathjax@3.2.0/es5/tex-mml-chtml`,
			mockjs: `${jsdelivrCDN}/mockjs@1.1.0/dist/mock.min`,
			moment: `https://cdn.jsdelivr.net/npm/moment@2.29.1/moment.min`,
			'monaco-editor': `${jsdelivrCDN}/monaco-editor@0.21.2/min/vs/editor/editor.main`,
			mxgraph: `${jsdelivrCDN}/mxgraph@4.2.2/javascript/mxClient.min`,
			openlayers: `https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.5.0/build/ol`,
			randomColor: `${jsdelivrCDN}/randomcolor@0.6.2/randomColor.min`,
			slicknav: `${jsdelivrCDN}/slicknav@0.1/dist/jquery.slicknav.min`,
			three: `${jsdelivrCDN}/three@0.136.0/build/three.min`,
			vibrant: `${jsdelivrCDN}/node-vibrant@3.2.1-alpha.1/dist/vibrant.min`,
			'video-js': `${jsdelivrCDN}/video.js@7.10.2/dist/video.min`,
			vs: `${jsdelivrCDN}/monaco-editor@0.25.2/min/vs`,
			Vue: `${jsdelivrCDN}/vue@2.6.14/dist/vue.min`,
			'vue-demi': `${jsdelivrCDN}/vue-demi@0.9.1/lib/index.iife.min`,
			'vue-echarts': `${jsdelivrCDN}/vue-echarts@6.0.0-rc.6/dist/index.umd.min`,
			'vue-router': `${jsdelivrCDN}/vue-router@3.0.3/dist/vue-router.min`,
			vuex: `${jsdelivrCDN}/vuex@3.0.1/dist/vuex.min`,
			xlsx: `${jsdelivrCDN}/xlsx@0.17.5/dist/xlsx.full.min`
		};

		const map = {
			'*': {
				css: `${jsdelivrCDN}/require-css@0.1.10/css.min.js`,
				text: `${jsdelivrCDN}/requirejs-text@2.0.15/text.min.js`,
				async: `${jsdelivrCDN}/requirejs-plugins@1.0.2/src/async.js`,
				font: `${jsdelivrCDN}/requirejs-plugins@1.0.2/src/font.js`,
				goog: `${jsdelivrCDN}/requirejs-plugins@1.0.2/src/goog.js`,
				image: `${jsdelivrCDN}/requirejs-plugins@1.0.2/src/image.js`,
				json: `${jsdelivrCDN}/requirejs-plugins@1.0.2/src/json.js`,
				noext: `${jsdelivrCDN}/requirejs-plugins@1.0.2/src/noext.js`,
				mdown: `${jsdelivrCDN}/requirejs-plugins@1.0.2/src/mdown.js`,
				propertyParser: `${jsdelivrCDN}/requirejs-plugins@1.0.2/src/propertyParser.js`,
				markdownConverter: `${jsdelivrCDN}/requirejs-plugins@1.0.2/lib/Markdown.Converter.js`,
			},
		};

		const shim = {
			bootstrap: {
				deps: [
					`css!https://fonts.googleapis.com/css?family=Roboto:300,300i,400,400i,500,500i,700,700i`,
					`css!${jsdelivrCDN}/bootstrap@3.4.1/dist/css/bootstrap.min.css`,
					`css!${jsdelivrCDN}/animate.css@4.1.1/animate.min.css`,
					`css!${jsdelivrCDN}/@fortawesome/fontawesome-free@5.15.3/css/all.min.css`,
				],
			},
			gmaps: {
				deps: [`http://maps.google.com/maps/api/js?v=3&sensor=false`],
				exports: `GMaps`,
			},
			Handsontable: {
				deps: [`css!handsontable/dist/handsontable.full.min.css`],
			},
			jquery: {},
			jqvmap: {
				deps: [
					`css!jqvmap/../../dist/jqvmap.min.css`,
					`jqvmap/maps/jquery.vmap.world`,
					// `jqvmap/maps/jquery.vmap.sampledata`
				],
			},
			jsoneditor: {
				deps: [`css!${jsdelivrCDN}/jsoneditor@9.2.0/dist/jsoneditor.min.css`],
			},
			leaflet: {
				deps: [`css!${jsdelivrCDN}/leaflet@1.0.3/dist/leaflet.css`],
			},
			openlayers: {
				deps: [`css!https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.5.0/css/ol.css`],
			},
			slicknav: {
				deps: [],
			},
			'vue-demi': {
				deps: [`vue`],
			},
			'vue-echarts': {
				deps: [`vue`, `echarts`, `${jsdelivrCDN}/@vue/composition-api@1.0.0-rc.10/dist/vue-composition-api.prod.min.js`],
			},
		};
		module.exports = {
			env: location.hostname === `127.0.0.1` ? `dev` : `prod`,
			api_php_url: `http://${location.hostname}:9090`,
			publicPath: location.hostname === `127.0.0.1` ? `` : ``,
			components: {
				header: `/src/components/header/index.hbs`,
				footer: `/src/components/footer/index.hbs`,
			},
			vendor,
			requirejsConfig: {
				paths,
				map,
				config: {},
				shim,
			},
		};
	});
})(define);
