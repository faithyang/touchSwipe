var TouchSwipe = function() {
	this.width = window.innerWidth;
	this.height = window.innerHeight;
	this.touchStartPointX = null;
	this.touchStartPointY = null;
	this.index = 0;
	this.article = document.querySelector('article');
	this.sections = document.querySelectorAll('section');
}
TouchSwipe.prototype = {
	init: function() {
		this.resizeContainer();
		this.resizeSections();
		this.getTouchStartPoint();
		this.setTouchMove();
	},
	resizeContainer: function() {
		this.article.style.height = this.height + 'px';
	},
	resizeSections: function() {
		var l = this.sections.length;
		for(var i = 0; i < l; i++) {
			this.sections[i].style.height = this.height + 'px';
		}
	},
	getTouchStartPoint: function() {
		var self = this;
		document.body.addEventListener('touchstart', function(event) {
			self.touchStartPointX = event.targetTouches[0].pageX;
			self.touchStartPointY = event.targetTouches[0].pageY;
		}, false);
	},
	setTouchMove: function() {
		var self = this;
		document.body.addEventListener('touchmove', function(event) {
			event.preventDefault();
			var endPoint = event.targetTouches[0];
			switch(true) {
				case(endPoint.pageY - self.touchStartPointY >= 60):
					self.preSection();
					break;
				case(endPoint.pageY - self.touchStartPointY <= -60):
					self.nextSection();
					break;
				default:
					break;
			}
		}, false);
	},
	preSection: function() {
		if(this.index > 0) {
			this.index--;
			this.moveSection();
		}
	},
	nextSection: function() {
		if(this.index < this.sections.length - 1) {
			this.index++;
			this.moveSection();
		}	
	},
	moveSection: function() {
		this.article.style.transform = "translateY(" + (-this.index * this.height) + "px)";
		this.article.style.webkitTransform = "translateY(" + (-this.index * this.height) + "px)";
		this.destoryTouchStartPoint();
	},
	destoryTouchStartPoint: function() {
		delete this.touchStartPointX;
		delete this.touchStartPointY;
	}
}