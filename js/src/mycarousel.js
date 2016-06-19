(function($) {
  
  $.fn.mycarousel = function(){

    var previousElementSibling = function(el) {
      if( el.previousElementSibling ) {
        return el.previousElementSibling;
      } else {
        while( el = el.previousSibling ) {
          if( el.nodeType === 1 ) return el;
        }
      }
    }

    var nextElementSibling = function(el) {
      if( el.nextElementSibling ) {
        return el.nextElementSibling;
      } else {
        while( el = el.nextSibling ) {
          if( el.nodeType === 1 ) return el;
        }
      }
    }
    

    $('.left-arrow').bind('click', function(evt) {
      evt = evt || event;

      if (evt.preventDefault) {
        evt.preventDefault(); 
      } else {
        evt.returnValue = false;
      }

      var slideWidth = parseInt($('.carousel-elem').css('width'));
      var curSlider = previousElementSibling(this.parentNode);
      var curPosition = parseInt($(this).parent().prev().find('.carousel').css('left'));
      var curSlide = $(this).parent().prev().find('.active');
      var prevSlide = $(this).parent().prev().find('.active').prev();

      if (previousElementSibling(curSlider.querySelector('.active'))) {
        curPosition+=slideWidth;
        $(this).parent().prev().find('.carousel').animate({left: curPosition + 'px'}, 300);
        curSlide.removeClass('active');
        prevSlide.addClass('active');
      } else {
        curPosition = -(slideWidth*2);
        $(this).parent().prev().find('.carousel').animate({left: curPosition + 'px'}, 300);
        curSlide.removeClass('active');
        $(this).parent().prev().find('.carousel-elem:last').addClass('active');
      }
    });

    $('.right-arrow').bind('click', function(evt) {
      evt = evt || event;

      if (evt.preventDefault) {
        evt.preventDefault(); 
      } else {
        evt.returnValue = false;
      }

      var slideWidth = parseInt($('.carousel-elem').css('width'));
      var curSlider = previousElementSibling(this.parentNode);
      var curPosition = parseInt($(this).parent().prev().find('.carousel').css('left'));
      var curSlide = $(this).parent().prev().find('.active');
      var nextSlide = $(this).parent().prev().find('.active').next();

      if (nextElementSibling(curSlider.querySelector('.active'))) {
        curPosition-=slideWidth;
        $(this).parent().prev().find('.carousel').animate({left: curPosition + 'px'}, 300);
        curSlide.removeClass('active');
        nextSlide.addClass('active');
      } else {
        curPosition = 0;
        $(this).parent().prev().find('.carousel').animate({left: curPosition + 'px'}, 300);
        curSlide.removeClass('active');
        $(this).parent().prev().find('.carousel-elem:first').addClass('active');
      }
    });

    $(window).resize(function(){
      $('.carousel').css('left', 0);
      $('.carousel').each(function() {
        $(this).find('.carousel-elem:first').addClass('active');
      });
    });

    return this;
  };

})(jQuery);