define(
	["jquery", "lodash", "marked", "text!../../settings.json", "text!templates/post.html"],
	function($, _, marked, settings, t) {
		var View = function (postFile) {
			this.template = _.template(t);

			this.init = function() {
				var model = {
					"settings": JSON.parse(settings),
					"post": "Oh no, broken link!"
				};

				$.get("posts/"+postFile+".md", function(data) {
					model.post = marked(data); 
					this.render(model);
				}.bind(this));
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