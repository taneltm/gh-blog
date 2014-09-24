define(
	["jquery", "lodash", "pages/index", "pages/post"],
	function($, _, IndexView, PostView) {
		var paths = {
			"": IndexView,
			"post\\/.": PostView,
			"404": "NotFoundView"
		};

		var router = function(route) {
			_.each(paths, function(View, pattern) {
				var rx    = new RegExp(pattern);
				var match = rx.test(route) && pattern.length > 0;

				if (match) {
					var params = route.split("/");
					if (params.length > 1) {
						params = params.slice(1);
					} else {
						params = null;
					}
					navigate(View, params);
				} else if (route === pattern) {
					navigate(View, null);
				} else {
					// Show not found view
				}
			});
		};

		var getPath = function() {
			return window.location.hash.replace("#","");
		};

		var onHashChange = function() {
			router(getPath());
		};

		var navigate = function(View, params) {
			if (currentView) {
				currentView.destroy();
				currentView = null;
			}
			currentView = new View(params);

			// currentView.init(params);
			// currentView.render();
		};

		var currentView = null;

		router(getPath());
		$(window).on('hashchange', onHashChange);
	}
);