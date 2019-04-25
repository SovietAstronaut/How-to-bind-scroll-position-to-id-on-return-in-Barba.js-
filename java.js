$(document).ready(function(){

	var lastClicked;

	Barba.Dispatcher.on('linkClicked',function(el){
		lastClicked = el;
	});

	var Zoomtransition = Barba.BaseTransition.extend ({
	start: function () {
		Promise
		.all([this.newContainerLoading, this.zoom()])
		.then(this.showNewPage.bind(this));
	},

	zoom: function() {
		var deferred = Barba.Utils.deferred();
		let tl = new TimelineMax();
		tl.to('.zoom_element',.6, {scale:1.1});
		tl.to('.zoom_element',1, {scale:1,onComplete: function() {
			deferred.resolve();
		}
		});
		return deferred.promise;
	},

	showNewPage: function() {
		this.done();
	}
});



/**
 * Next step, you have to tell Barba to use the new Transition
 */

Barba.Pjax.getTransition = function() {
  /**
   * Here you can use your own logic!
   * For example you can use different Transition based on the current page or link...
   */

  return Zoomtransition;
};

Barba.Pjax.start();

});