define(
	["jquery", "lodash", "text!../../settings.json", "text!../../published.json", "text!templates/index.html"],
	function($, _, settings, published, t) {
		var View = function(params) {
			this.template = _.template(t);

			this.init = function() {
				var model = {
					"settings": JSON.parse(settings),
					"posts": JSON.parse(published)
				};
				this.render(model);
			};

			this.render = function(model) {
				$("body").html(this.template(model));
			};

			this.destroy = function() {
				$("body").empty();
			};

			this.init();
		};
		return View;
	}
);