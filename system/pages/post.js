define(
	["jquery", "lodash", "marked", "text!../../settings.json", "text!templates/post.html"],
	function($, _, marked, settings, t) {
		var View = function (postFile) {
			this.template = _.template(t);

			this.model = {
				"settings": JSON.parse(settings)
			};

			this.init = function() {
				$.ajax({
					url: "posts/"+postFile+".md",
					type: "GET",
					cache: false
				}).done(this.postLoaded).fail(this.postNotFound);
			};

			this.render = function(model) {
				$("body").html(this.template(model));
			};

			this.destroy = function() {
				$("body").empty();
			};

			this.postLoaded = function(data) {
				this.model.post = marked(data); 
				this.render(this.model);
			};

			this.postNotFound = function() {
				this.model.post = "Oh no! The link is broken... :(";
				this.render(model);
			};

			_.bindAll(this);

			this.init();
		};

		return View;
	}
);