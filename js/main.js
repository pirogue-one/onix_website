(function($) {

	"use strict";
	
	$('.flexslider').flexslider({
		animation: "fade",
        direction: "horizontal",
        easing: "swing",
        controlNav: false,
        directionNav: true,
        prevText: "",
        nextText: "",
        start: function(slider){
          $('body').removeClass('loading');
        }
    });



    // Custom filter for Swiper gallery
    $('.filter-controls-btn').on('click', function() {
        var filter = $(this).data('filter');
        
        // Remove active class from all buttons
        $('.filter-controls-btn').removeClass('filter-controls-btn--active');
        // Add active class to clicked button
        $(this).addClass('filter-controls-btn--active');
        
        if (filter === 'all') {
            // Show all slides
            $('.swiper-slide').show();
            // Update Swiper
            if (window.galleryMain && window.galleryThumbs) {
                window.galleryMain.update();
                window.galleryThumbs.update();
            }
        } else {
            // Hide all slides first
            $('.swiper-slide').hide();
            // Show only slides with matching category
            $(filter).show();
            // Update Swiper
            if (window.galleryMain && window.galleryThumbs) {
                window.galleryMain.update();
                window.galleryThumbs.update();
            }
        }
    });



    $(function(){
        $('[data-rel="lightbox"]').lightbox();
    });


})(jQuery);