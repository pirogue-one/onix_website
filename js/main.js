(function ($) {

    "use strict";

    $('.flexslider').flexslider({
        animation: "fade",
        direction: "horizontal",
        easing: "swing",
        controlNav: false,
        directionNav: true,
        prevText: "",
        nextText: "",
        start: function (slider) {
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
    $('.filter-controls-btn').on('click', function () {
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

    // Phone mask functionality
    function initPhoneMask() {
        const phoneInput = document.getElementById('phone-input');
        if (phoneInput) {
            phoneInput.addEventListener('input', function (e) {
                let value = e.target.value.replace(/\D/g, ''); // Remove all non-digits

                // If starts with 8, replace with 7
                if (value.startsWith('8')) {
                    value = '7' + value.slice(1);
                }

                // If doesn't start with 7, add 7
                if (!value.startsWith('7') && value.length > 0) {
                    value = '7' + value;
                }

                // Limit to 11 digits (7 + 10 digits)
                if (value.length > 11) {
                    value = value.slice(0, 11);
                }

                // Format the phone number
                let formattedValue = '';
                if (value.length > 0) {
                    formattedValue = '+7';
                    if (value.length > 1) {
                        formattedValue += ' ' + value.slice(1, 4);
                    }
                    if (value.length > 4) {
                        formattedValue += ' ' + value.slice(4, 7);
                    }
                    if (value.length > 7) {
                        formattedValue += ' ' + value.slice(7, 9);
                    }
                    if (value.length > 9) {
                        formattedValue += ' ' + value.slice(9, 11);
                    }
                }

                e.target.value = formattedValue;
            });

            // Handle backspace and delete
            phoneInput.addEventListener('keydown', function (e) {
                if (e.key === 'Backspace' && e.target.value.length <= 2) {
                    e.target.value = '';
                }
            });
        }
    }

    // Clear placeholder on focus functionality
    function initPlaceholderClear() {
        const formInputs = document.querySelectorAll('.app-form-control');

        formInputs.forEach(function (input) {
            const originalPlaceholder = input.placeholder;

            // Clear placeholder on focus
            input.addEventListener('focus', function () {
                if (this.value === '') {
                    this.placeholder = '';
                }
            });

            // Restore placeholder on blur if input is empty
            input.addEventListener('blur', function () {
                if (this.value === '') {
                    this.placeholder = originalPlaceholder;
                }
            });
        });
    }

    // Popup functionality
    function initPopup() {
        const popup = document.getElementById('callBackPopup');
        const closeBtn = document.getElementById('closePopup');
        const openButtons = document.querySelectorAll('.btn-white, .btn-yellow');

        // Open popup when clicking buttons with specific text
        openButtons.forEach(function (button) {
            if (button.textContent.includes('Оставить заявку') || button.textContent.includes('Связаться')) {
                button.addEventListener('click', function (e) {
                    e.preventDefault();
                    popup.classList.add('active');
                    document.body.style.overflow = 'hidden'; // Prevent background scrolling
                });
            }
        });

        openButtons.forEach(function (button) {
            if (button.textContent.includes('Детали') || button.textContent.includes('Связаться')) {
                button.addEventListener('click', function (e) {
                    e.preventDefault();
                    popup.classList.add('active');
                    document.body.style.overflow = 'hidden'; // Prevent background scrolling
                });
            }
        });

             openButtons.forEach(function (button) {
            if (button.textContent.includes('Заказать звонок') || button.textContent.includes('Связаться')) {
                button.addEventListener('click', function (e) {
                    e.preventDefault();
                    popup.classList.add('active');
                    document.body.style.overflow = 'hidden'; // Prevent background scrolling
                });
            }
        });

        // Close popup when clicking close button
        if (closeBtn) {
            closeBtn.addEventListener('click', function () {
                popup.classList.remove('active');
                document.body.style.overflow = 'auto'; // Restore scrolling
            });
        }

        // Close popup when clicking outside
        popup.addEventListener('click', function (e) {
            if (e.target === popup) {
                popup.classList.remove('active');
                document.body.style.overflow = 'auto'; // Restore scrolling
            }
        });

        // Close popup with Escape key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && popup.classList.contains('active')) {
                popup.classList.remove('active');
                document.body.style.overflow = 'auto'; // Restore scrolling
            }
        });
    }

    // Initialize popup phone mask
    function initPopupPhoneMask() {
        const popupPhoneInput = document.getElementById('popup-phone-input');
        if (popupPhoneInput) {
            popupPhoneInput.addEventListener('input', function (e) {
                let value = e.target.value.replace(/\D/g, ''); // Remove all non-digits

                // If starts with 8, replace with 7
                if (value.startsWith('8')) {
                    value = '7' + value.slice(1);
                }

                // If doesn't start with 7, add 7
                if (!value.startsWith('7') && value.length > 0) {
                    value = '7' + value;
                }

                // Limit to 11 digits (7 + 10 digits)
                if (value.length > 11) {
                    value = value.slice(0, 11);
                }

                // Format the phone number
                let formattedValue = '';
                if (value.length > 0) {
                    formattedValue = '+7';
                    if (value.length > 1) {
                        formattedValue += ' ' + value.slice(1, 4);
                    }
                    if (value.length > 4) {
                        formattedValue += ' ' + value.slice(4, 7);
                    }
                    if (value.length > 7) {
                        formattedValue += ' ' + value.slice(7, 9);
                    }
                    if (value.length > 9) {
                        formattedValue += ' ' + value.slice(9, 11);
                    }
                }

                e.target.value = formattedValue;
            });

            // Handle backspace and delete
            popupPhoneInput.addEventListener('keydown', function (e) {
                if (e.key === 'Backspace' && e.target.value.length <= 2) {
                    e.target.value = '';
                }
            });
        }
    }

    // Initialize popup placeholder clear functionality
    function initPopupPlaceholderClear() {
        const popupInputs = document.querySelectorAll('#callBackPopup .app-form-control');

        popupInputs.forEach(function (input) {
            const originalPlaceholder = input.placeholder;

            // Clear placeholder on focus
            input.addEventListener('focus', function () {
                if (this.value === '') {
                    this.placeholder = '';
                }
            });

            // Restore placeholder on blur if input is empty
            input.addEventListener('blur', function () {
                if (this.value === '') {
                    this.placeholder = originalPlaceholder;
                }
            });
        });
    }

    // Initialize gallery when DOM is ready and all scripts are loaded
    $(document).ready(function () {
        // Initialize phone mask
        initPhoneMask();

        // Initialize placeholder clear functionality
        initPlaceholderClear();

        // Initialize popup functionality
        initPopup();
        initPopupPhoneMask();
        initPopupPlaceholderClear();

        // Wait a bit to ensure all scripts are loaded
        setTimeout(loadGalleryData, 100);
    });



    $(function () {
        $('[data-rel="lightbox"]').lightbox();
    });


})(jQuery);