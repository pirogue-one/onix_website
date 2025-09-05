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



    // Gallery data and filtering
    const galleryData = [
        {
            "id": 1,
            "src": "images/gallery/onix_850_ext_1.webp",
            "alt": "onix 850 exterior",
            "category": "category-1",
            "title": "ONIX 850 Exterior"
        },
        {
            "id": 2,
            "src": "images/gallery/onix_850_ext_2.webp",
            "alt": "onix 850 exterior",
            "category": "category-1",
            "title": "ONIX 850 Exterior"
        },
        {
            "id": 3,
            "src": "images/gallery/onix_850_ext_3.webp",
            "alt": "onix 850 exterior",
            "category": "category-1",
            "title": "ONIX 850 Exterior"
        },
        {
            "id": 4,
            "src": "images/gallery/onix_850_ext_4.webp",
            "alt": "onix 850 exterior",
            "category": "category-1",
            "title": "ONIX 850 Exterior"
        },
        {
            "id": 5,
            "src": "images/gallery/onix_850_int_1.webp",
            "alt": "onix 850 interior",
            "category": "category-1",
            "title": "ONIX 850 Interior"
        },
        {
            "id": 6,
            "src": "images/gallery/onix_850_int_2.webp",
            "alt": "onix 850 interior",
            "category": "category-1",
            "title": "ONIX 850 Interior"
        },
        {
            "id": 7,
            "src": "images/gallery/onix_850_int_3.webp",
            "alt": "onix 850 interior",
            "category": "category-1",
            "title": "ONIX 850 Interior"
        },
        {
            "id": 8,
            "src": "images/gallery/onix_850_int_4.webp",
            "alt": "onix 850 interior",
            "category": "category-1",
            "title": "ONIX 850 Interior"
        },
        {
            "id": 9,
            "src": "images/gallery/onix_12_ext_1.webp",
            "alt": "onix 12 exterior",
            "category": "category-2",
            "title": "ONIX 12X Exterior"
        },
        {
            "id": 10,
            "src": "images/gallery/onix_12_ext_2.webp",
            "alt": "onix 12 exterior",
            "category": "category-2",
            "title": "ONIX 12X Exterior"
        },
        {
            "id": 11,
            "src": "images/gallery/onix_12_ext_3.webp",
            "alt": "onix 12 exterior",
            "category": "category-2",
            "title": "ONIX 12X Exterior"
        },
        {
            "id": 12,
            "src": "images/gallery/onix_12_ext_4.webp",
            "alt": "onix 12 exterior",
            "category": "category-2",
            "title": "ONIX 12X Exterior"
        },
        {
            "id": 13,
            "src": "images/gallery/onix_12_int_1.webp",
            "alt": "onix 12 interior",
            "category": "category-2",
            "title": "ONIX 12X Interior"
        },
        {
            "id": 14,
            "src": "images/gallery/onix_12_int_2.webp",
            "alt": "onix 12 interior",
            "category": "category-2",
            "title": "ONIX 12X Interior"
        },
        {
            "id": 15,
            "src": "images/gallery/onix_12_int_3.webp",
            "alt": "onix 12 interior",
            "category": "category-2",
            "title": "ONIX 12X Interior"
        },
        {
            "id": 16,
            "src": "images/gallery/onix_12_int_4.webp",
            "alt": "onix 12 interior",
            "category": "category-2",
            "title": "ONIX 12X Interior"
        }
    ];
    
    let filteredGalleryData = [];

    // Initialize gallery data
    function loadGalleryData() {
        filteredGalleryData = [...galleryData];
        renderGallery();
        
        // Initialize Swiper
        if (typeof window.initializeSwiper === 'function') {
            window.initializeSwiper();
        }
    }

    // Render gallery slides
    function renderGallery() {
        const mainWrapper = document.getElementById('gallery-main-wrapper');
        const thumbsWrapper = document.getElementById('gallery-thumbs-wrapper');
        
        // Clear existing slides
        mainWrapper.innerHTML = '';
        thumbsWrapper.innerHTML = '';
        
        // Create slides for filtered data
        filteredGalleryData.forEach(item => {
            // Main slide
            const mainSlide = document.createElement('div');
            mainSlide.className = `swiper-slide ${item.category}`;
            mainSlide.innerHTML = `<img src="${item.src}" alt="${item.alt}">`;
            mainWrapper.appendChild(mainSlide);
            
            // Thumbnail slide
            const thumbSlide = document.createElement('div');
            thumbSlide.className = `swiper-slide ${item.category}`;
            thumbSlide.innerHTML = `<img src="${item.src}" alt="${item.alt}">`;
            thumbsWrapper.appendChild(thumbSlide);
        });
    }

    // Custom filter for Swiper gallery
    $('.filter-controls-btn').on('click', function() {
        var filter = $(this).data('filter');
        
        // Remove active class from all buttons
        $('.filter-controls-btn').removeClass('filter-controls-btn--active');
        // Add active class to clicked button
        $(this).addClass('filter-controls-btn--active');
        
        if (filter === 'all') {
            // Show all slides
            filteredGalleryData = [...galleryData];
        } else {
            // Filter data based on category
            const categoryClass = filter.replace('.', '');
            filteredGalleryData = galleryData.filter(item => item.category === categoryClass);
        }
        
        // Re-render gallery with filtered data
        renderGallery();
        
        // Reinitialize Swiper with new slides
        if (window.galleryMain && window.galleryThumbs) {
            window.galleryMain.destroy(true, true);
            window.galleryThumbs.destroy(true, true);
        }
        
        // Initialize Swiper
        if (typeof window.initializeSwiper === 'function') {
            window.initializeSwiper();
        }
    });

    // Initialize gallery when DOM is ready and all scripts are loaded
    $(document).ready(function() {
        // Wait a bit to ensure all scripts are loaded
        setTimeout(loadGalleryData, 100);
    });



    $(function(){
        $('[data-rel="lightbox"]').lightbox();
    });


})(jQuery);