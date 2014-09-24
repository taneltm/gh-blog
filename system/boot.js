(function() {
	var requireConfig = {
		baseUrl: 'system/libs',
		paths: {
			pages: "../pages"
		}
	};

	requirejs.config(requireConfig);

	requirejs(["text!../../settings.json"], function(settingsText) {
		var theme = JSON.parse(settingsText).theme;

		requireConfig.paths.theme     = "../themes/"+theme
		requireConfig.paths.templates = "../themes/"+theme+"/templates"
		requirejs.config(requireConfig);

		// Loading the theme
		var link = document.createElement("link");
		link.type = "text/css";
		link.rel = "stylesheet";
		link.href = "system/themes/"+theme+"/style.css";
		document.getElementsByTagName("head")[0].appendChild(link);

		requirejs(["../router", "theme/style"]);
	});
})();