/*

  HIGHLIGHTING: https://github.com/atom/language-javascript/blob/master/grammars/javascript.cson
  FILE TYPES:  'js', 'htc', '_js', 'es', 'es6', 'jsm', 'pac', 'pjs', 'xsjs', 'xsjslib'
  WRAPPER: source.js

*/


/*

  COMMENTS
  --------
  CLASS: punctuation.definition.comment.js
  TRIGGERS: js single line or comment blocks

*/



/*

  DOCBLOCK
  --------
  CLASS: storage.type.class.jsdoc

  TRIGGERS: abstract, access, alias, augments, author, async, attribute, arg, argument, beta, borrows, bubbes, callback, class, classdesc, config, const, constant, constructs, constructor, copyright, chainable, default, defaultvalue, deprecated, desc, description, enum, emits, event, example, exports, external, extends, extension, extensionfor, extension_for, for, file, fileoverview, fires, final, function, global, host, ignore, implements, inheritdoc, inner, instance, interface, kind, lends, license, listens, main, member, memberof, method, mixex, mixin(?:s, ), module, name, namespace, override, overview, param, private, prop, property, protected, readonly, readOnly, requires, required, return, returns, see, since, static, summary, submodule, this, throws, todo, tutorial, type, typedef, var, variation, version, virtual, uses, writeOnce

*/

class Bread {

  constructor(slices) {
    this.slices = 12;

    if ( slices > this.slices ) {
      return 'not enough bread';
    } else {
      return slices;
    }

  }

}

class Sandwhich extends Bread {

  constructor(slices) {
    this.bread = super(slices);
    this.toppings = [];
  }

  toppings( ingredients ) {
    ingredients.forEach(function(value, index) {
      this.toppings.push( value );
    });
  }

}

var Club = new Sandwhich(3).toppings(['roast beef', 'turkey']);


/*

  INTERPOLATED JS
  --------
  CLASS: punctuation.definition.comment.js
  TRIGGERS: punctuation.section.embedded.js
  NOTE: This class doesn't currently seem to actually get applied

*/

  var myName = 'Slim Shady',
      template = 'Hello, my name is ${myName}',
      test = "Test";



/*

  FUNCTION PARAMS
  --------
  TRIGGER: ()           CLASS: meta.brace.round.js
  TRIGGER: []           CLASS: meta.brace.square.js
  TRIGGER: {}           CLASS: meta.brace.curly.js
  TRIGGER: ,            CLASS: meta.object.delimiter.js
  TRIGGER: =            CLASS: keyword.operator.js
  TRIGGER: parameters   CLASS: variable.parameter.function.js

*/


function testFunction(string,arr,obj) {
// DO SOMETHING
}

testFunction('one', 'two', [1,2,3], {key: 'value'} );


/*

  METHODS
  --------
  WRAPPER: meta.method.js

  TRIGGER: break, case, catch, continue, do, else, export, finally, for, function, if, import, package, return, switch, throw, try, while, with

*/

import { ham as turkey } from 'mySandwhich.js';

var isFunction;

switch ( typeof testFunction ) {

  case 'function':
    isFunction = true;
    break;
  default:
    isFunction = false;

}

try {
  testFunction();
} catch (e) {
  throw 'Whoopsadaisy!';
} finally {
  console.log('i think we\'re done here!');
}

jQuery('lool').ready(function ($)
{
	$('.navh .menu_principal > li').each(function(){
		if($(this).children("ul").length){
			$(this).wrapInner('<div style="position:relative"></div>');
		}
	});
});


;(function($, window, document, undefined){

    var pluginName = "classikCover",
          defaults = {
  			'levels': 3,
  			'speed': 0.8,
  			'autoStart': false,
  			'autoDelay': 3.5,
  			'autoDirection': 'right',
  			'loop': true,
  			'infinite': true,
  			'pauseOnClick': false,
  			'scaleCarousel':1,
  			'scaleUnselected': 0.8,
  			'offsetFromCenter': '0px',
  			'perspectiveOffset': 0,
  			'buttonPrev': '.cc-previous',
  			'buttonNext': '.cc-next',
  			'buttonPlay': '.cc-play',
  			'buttonStop': '.cc-stop',
  			'keyboard': true,
  			'beforeMove': null,
  			'afterMove': null,
        };

    // Constructor
    Plugin = function(element, settings)
	{
        this.dom = { carousel:element };
        this.settings = $.extend( {}, defaults, settings) ;
        this.defaults = defaults;
        this.name = pluginName;
        this.init();
		// console.log(this);
		// console.log(element instanceof jQuery);
    }

	// Prototype
    Plugin.prototype = {

        init: function() {
			this.initDOM();
			this.initContainer();
			this.initChilds();
			this.initHeight();
			this.initResizeListener();
			this.initNavigationButtons();
			if(this.settings.keyboard === true)
				this.initNavigationKeyboard();
			this.initNavigationTouch();
			this.initAutoButtons();
			this.initItemClicked();
			this.makeLoop(this.getChildActive());
			this.initTransform();
			if(this.settings.autoStart === true)
				this.startAuto();
			$(window).trigger('resize'); // Trigger resize event to have the correct widths (cause of scrollbars)
        },
		initDOM : function(){
			this.dom.document = $(document);
			this.dom.carousel.addClass('cc-carousel');
			this.dom.carousel.wrapInner('<div class="cc-wrapper"></div>');
			this.dom.wrapper = $('.cc-wrapper');
			this.dom.container = this.dom.wrapper.find('> ul, > div');
			this.dom.container.addClass('cc-container');
			this.dom.childs = this.dom.wrapper.find('> ul > li, > div > div');
			this.dom.childs.addClass('cc-child');
			this.dom.buttonPrev = $(this.settings.buttonPrev);
			this.dom.buttonNext = $(this.settings.buttonNext);
			this.dom.buttonPlay = $(this.settings.buttonPlay);
			this.dom.buttonStop = $(this.settings.buttonStop);
		},
		initContainer : function(){
			var o = this;
			o.setCarouselWidth();
			o.dom.container.css({
				'left':o.getContainerOffset()+'px'
			});
			o.isMoving = false;
		},
		initChilds : function(){

			var o = this;
			var a = o.getChildActive();

			if(o.dom.carousel.find('.cc-active').length == 0)
				o.dom.carousel.find('.cc-container li:first-child,.cc-container .div:first-child').addClass('cc-active');

			o.dom.childs.each(function(i)
			{
				$(this).css({'width':o.getChildWidth()+'px'});
			});
		},
		initHeight : function(){
			this.setCarouselHeight();
		},
		initResizeListener : function(){

			var o = this;

			$(window).resize(function(e){
				o.setCarouselWidth();
				o.getChilds().css({'width':o.getChildWidth()+'px'});
				o.dom.container.css({'left':o.getContainerOffset()+'px'});
				o.setCarouselHeight();
			});

		},
		initNavigationButtons : function(){

			var o = this;

			o.dom.buttonPrev.addClass('cc-button');
			o.dom.buttonNext.addClass('cc-button');

			o.dom.buttonPrev.on('click', function(e){
				e.preventDefault();
				o.goToLeft();
			});

			o.dom.buttonNext.on('click', function(e){
				e.preventDefault();
				o.goToRight();
			});

		},
		initNavigationKeyboard : function(){

			var o = this;

			o.dom.document.keydown(function (e) {
				if (e.which == 37)
					o.goToLeft();
				else if (e.which == 39)
					o.goToRight();
			});

		},
		initNavigationTouch : function(){

			var o = this,
				touchStarted = false,
				currentX = 0,
				startX = 0,
				endX = 0;

			o.dom.container.on('touchstart mousedown', function(e){

				e.preventDefault();
				touchStarted = true;
				console.log('Touchstarted');

				if(e.originalEvent.targetTouches)
					var pointer = e.originalEvent.targetTouches[0];
				else
					var pointer = e;

				startX = currentX = pointer.pageX;

				// detecting if after 200ms the finger is still in the same position
				setTimeout(function (){
					if ((startX === currentX) && !touchStarted) {
						// Here you get the Tap event
						console.log('Tap');
					}
				},200);
			});

			o.dom.container.on('touchend mouseup touchcancel', function (e){

				e.preventDefault();
				touchStarted = false;
				console.log('Touchended');

				if(e.originalEvent.changedTouches)
					var pointer = e.originalEvent.changedTouches[0];
				else
					var pointer = e;

				endX = pointer.pageX;

				// console.log('- startX :'+ startX)
				// console.log('- endX :'+ endX)

				if(Math.abs(endX - startX) > 20){
					console.log('Swipe accepté');
					if(endX - startX > 0)
						o.goToLeft();
					else
						o.goToRight();
				}
			});

			o.dom.container.on('touchmove mousemove', function (e){

				e.preventDefault();

				if(e.originalEvent.targetTouches)
					var pointer = e.originalEvent.targetTouches[0];
				else
					var pointer = e;

				if(touchStarted){
					if(pointer.pageX > currentX){
						// console.log('Swiping right');
					}
					else{
						// console.log('Swiping Left');
					}
				}

				currentX = pointer.pageX;

			});

		},
		initAutoButtons : function(){
			var o = this;

			o.dom.buttonPlay.addClass('cc-button');
			o.dom.buttonStop.addClass('cc-button');

			if(o.settings.autoStart === true)
				o.dom.buttonPlay.addClass('cc-active');
			else
				o.dom.buttonStop.addClass('cc-active');

			o.dom.buttonPlay.on('click', function(e){
				e.preventDefault();
				o.dom.buttonStop.removeClass('cc-active');
				o.dom.buttonPlay.addClass('cc-active');
				o.settings.autoStart = true;
				o.startAuto();
			});

			o.dom.buttonStop.on('click', function(e){
				e.preventDefault();
				o.dom.buttonStop.addClass('cc-active');
				o.dom.buttonPlay.removeClass('cc-active');
				o.stopAuto();
			});
		},
		initItemClicked : function(){

			var o = this;

			this.dom.childs.on('click', function(){
				if(o.isMoving === false && o.getChildActive().index() != $(this).index()){
					o.makeLoop($(this));
					o.moveTo($(this));

					o.stopTimer();
					if(o.settings.pauseOnClick === false && o.settings.autoStart === true)
						o.startAuto();
					else
						o.stopAuto();
				}
			});

		},
		makeLoop : function(childDestination){
			var o = this;
			var a = o.getChildActive();
			var difference = Math.abs(a.index() - childDestination.index()); // Always a positive number

			var translateValue = (difference * o.settings.perspectiveOffset) * o.getChildWidth();  //-----
			var scaleValue = Math.pow(o.settings.scaleUnselected, Math.abs(difference)); // Scale at puissance diff

      $(document).addClass('kolkpk');
      $(window).addClass('kolkpk');

			if(o.settings.loop === true){
				if(a.index() > childDestination.index()) // Go to the left
				{
					for(var i = 0; i < difference; i++){
						var nbClones = o.dom.container.find('.cc-clone').length;
						if(nbClones > 0){
							o.dom.container.find('.cc-clone').remove();
							o.dom.container.css({'left':'+='+ (o.getChildWidth()*nbClones) +'px'});
						}
						o.getChilds().last().clone().addClass('cc-clone').appendTo(o.dom.container).animate({'opacity':0}, o.settings.speed*1000, 'linear');
						// o.getChilds().last().prev().prependTo(o.dom.container);
						o.getChilds().last().prev().prependTo(o.dom.container).css({'transform':'scale('+scaleValue+') translateX('+ translateValue +'px)'});
						o.dom.container.css({'left':'-='+o.getChildWidth()+'px'});
						o.dom.container.find('.cc-clone').remove();
					}
				}
				else if(a.index() < childDestination.index()) // Go to the right
				{
					for(var i = 0; i < difference; i++){

						o.getChilds().filter(':not(.cc-clone)').first().clone().addClass('cc-clone').insertAfter(o.getChilds().filter(':not(.cc-clone)').first());
						o.dom.container.css({'left':'-='+o.getChildWidth()+'px'});
						o.getChilds().not('.cc-clone').first().appendTo(o.dom.container);
						o.dom.container.css({'left':'+='+o.getChildWidth()+'px'});

						// Delete useless clones if too many
						if($('.cc-clone').length > o.settings.levels){
							var cloneToDel = $('.cc-clone').length - o.settings.levels
							o.dom.container.find('.cc-clone').filter(':lt('+cloneToDel+')').remove();
							o.dom.container.css({'left':'+='+o.getChildWidth()+'px'});
						}
					}
				}
				else{ // When page loads
					if(o.getChildActive().prevAll().length < o.settings.levels-1){
						var nbChildToAdd = (o.settings.levels-1) - o.getChildActive().prevAll().length;
						for(var i = 0; i < nbChildToAdd; i++){
							o.getChilds().last().prependTo(o.dom.container);
							o.dom.container.css({'left':'-='+o.getChildWidth()+'px'});
						}
					}
					if(o.getChildActive().nextAll().length < o.settings.levels-1){
						var nbChildToAdd = (o.settings.levels-1) - o.getChildActive().nextAll().length;
						for(var i = 0; i < nbChildToAdd; i++){
							o.getChilds().first().appendTo(o.dom.container);
							o.dom.container.css({'left':'+='+o.getChildWidth()+'px'});
						}
					}
				}
			}

		},
		initTransform : function(){
			var o = this;
			var a = o.getChildActive();
			var transition = 'transform '+ o.settings.speed*1000 +'ms linear';

			o.dom.childs.each(function(i)
			{
				if(!$(this).hasClass('cc-active'))
				{
					var difference = a.index() - $(this).index();
					var scaleValue = Math.pow(o.settings.scaleUnselected, Math.abs(difference)); // Scale at puissance difference
					var translateValue =  o.settings.perspectiveOffset * (difference * o.getChildWidth());
					var offsetFromCenter = parseInt(o.settings.offsetFromCenter);

					if($(this).index() < a.index()){
						if(offsetFromCenter > 0)
							offsetFromCenter = -offsetFromCenter;
						else
							offsetFromCenter = Math.abs(offsetFromCenter);
					}
					translateValue += offsetFromCenter;

					$(this).css({'transform':'translate('+ translateValue.toString() +'px) scale('+ scaleValue +')'});

					if(Math.abs(difference) > o.settings.levels-1)
						$(this).css({'opacity':0});
				}

			});

			setTimeout(function(){
				o.dom.childs.css({
					'-webkit-transition':'-webkit-'+transition,
					   '-moz-transition':'-moz-'+transition,
						 '-o-transition':'-o-'+transition,
						'-ms-transition':'-ms-'+transition,
							'transition':transition
				});
			},100); // setTimeout avoid the transition for the start transform (promises don't work in this case...)

		},
		moveTo : function(childDestination){

			var o = this;
			var a = o.getChildActive();
			var offsetContainer = (a.index()-childDestination.index())*o.getChildWidth();

			if(o.settings.beforeMove)
				o.settings.beforeMove();

			o.isMoving = true;

			// Apply a different transform for each type child
			o.getChilds().each(function(i){

				var difference = childDestination.index() - $(this).index();
				var scaleValue = Math.pow(o.settings.scaleUnselected, Math.abs(difference)); // Scale at puissance difference
				var translateValue = (difference * o.settings.perspectiveOffset) * o.getChildWidth();
				var offsetFromCenter = parseInt(o.settings.offsetFromCenter);

				if($(this).index() < childDestination.index()){
					if(offsetFromCenter > 0)
						offsetFromCenter = -offsetFromCenter;
					else
						offsetFromCenter = Math.abs(offsetFromCenter);
				}
				translateValue += offsetFromCenter;

				// on old active child
				if($(this).index() == a.index()){
					a.css({'transform':'translateX('+ translateValue.toString() +'px) scale('+scaleValue+')'}).removeClass('cc-active');
				}
				// on new active child
				else if($(this).index() == childDestination.index()){
					childDestination.css({'transform':'translateX(0px) scale(1)'}).addClass('cc-active');
				}
				// on others childs
				else{
					//if(childDestination.index() < a.index()){ translateValue = -Math.abs(translateValue.toString()); }
					$(this).css({'transform':'translateX('+ translateValue.toString() +'px) scale('+scaleValue+')'});
				}

				if(Math.abs(difference) <= o.settings.levels-1){
					$(this).animate({'opacity':1}, o.settings.speed*1000, 'linear');
				}
				else{
					$(this).animate({'opacity':0}, o.settings.speed*1000, 'linear');
				}

			});

			// Animate container
			o.dom.container.animate({'left':'+='+offsetContainer+'px'}, o.settings.speed*1000, 'linear', function(){
				if(o.dom.container.find('.cc-clone').length > 1 ){
					o.dom.container.find('.cc-clone:first').remove();
					o.dom.container.css({'left':'+='+o.getChildWidth()+'px'});

				}
				o.isMoving = false;
				if(o.settings.afterMove)
				   o.settings.afterMove();
			});
		},
		goToLeft : function(){

			var o = this;

			if(o.isMoving === false && (o.getChildActive().prev()[0] != undefined)){
				o.makeLoop(o.getChildActive().prev());
				o.moveTo(o.getChildActive().prev());
				o.stopTimer();
				if(o.settings.pauseOnClick === false && o.settings.autoStart === true)
					o.startAuto();
				else
					o.stopAuto();
			}
		},
		goToRight : function(){

			var o = this;

			if(o.isMoving === false && (o.getChildActive().next()[0] != undefined || o.settings.infinite === true)){
				o.makeLoop(o.getChildActive().next());

				if(o.getChildActive().next().length > 0){
					o.moveTo(o.getChildActive().next());
				}
				else{
					if(o.settings.infinite === true){
					o.moveTo(o.dom.childs.first());
					}
				}

				o.stopTimer();
				if(o.settings.pauseOnClick === false && o.settings.autoStart === true)
					o.startAuto();
				else
					o.stopAuto();
			}

		},
		startAuto : function(){
			var o = this;
			var a = o.getChildActive();

			o.settings.autoStart = true;
			o.dom.buttonStop.removeClass('cc-active');
			o.dom.buttonPlay.addClass('cc-active');

			o.timerAutoStart = setTimeout(function(){

				if(o.settings.autoDirection == "left"){
					o.makeLoop(a.prev());

					if(a.prev().length > 0){
						o.moveTo(a.prev());
					}
					else{
						if(o.settings.infinite === true){
						o.moveTo(o.dom.childs.last());
						}
					}
				}
				else{
					o.makeLoop(a.next());

					if(a.next().length > 0){
						o.moveTo(a.next());
					}
					else{
						if(o.settings.infinite === true){
						o.moveTo(o.dom.childs.first());
						}
					}
				}

				o.startAuto();
			}, o.settings.autoDelay*1000);
		},
		stopTimer : function(){
			clearTimeout(this.timerAutoStart); // Stop function setTimeout "timerAutoStart"
		},
		stopAuto : function(){
			var o = this;
			o.stopTimer();
			o.settings.autoStart = false;
			o.dom.buttonStop.addClass('cc-active');
			o.dom.buttonPlay.removeClass('cc-active');
		},
		getChilds : function (){
			return this.dom.container.find('.cc-child');
		},
		getChildActive : function (){
			return this.dom.container.find('.cc-active');
		},
		getChildWidth : function (){
			return this.dom.wrapper.outerWidth()/((this.settings.levels-1)*2+1);
		},
		getContainerOffset : function(){
			return -((this.getChildActive().index()-this.settings.levels+1)*this.getChildWidth());
		},
		setCarouselWidth : function(){
			var widthCarousel = this.dom.carousel.outerWidth(true)*this.settings.scaleCarousel;
			this.dom.wrapper.css({
				'width':widthCarousel+'px',
				'margin-left':'-'+widthCarousel/2+'px'
			});
		},
		setCarouselHeight : function(){
			this.dom.carousel.css({
				'height':this.getChildActive().outerHeight(true)+'px'
			});
		}

    };

	// Adds the plugin method to jQuery
    $.fn[pluginName] = function(settings){
        return this.each(function(){
            if(!$.data(this, "plugin_"+pluginName)){
                $.data(this, "plugin_"+pluginName,
                new Plugin($(this), settings));
            }
        });
    };

    var texte = 'Образец text на русском языке';
    var regex = /[\u0400-\u04FF]+/g;

    var corresp = regex.exec(texte);
    console.log(corresp[0]);      // affiche 'Образец'
    console.log(regex.lastIndex); // affiche '7'

    var corresp2 = regex.exec(texte);
    console.log(corresp2[0]);     // affiche 'на' (n'affiche pas text
    console.log(regex.lastIndex); // affiche '15'

    // et ainsi de suite

})(jQuery, window, document);
