'use strict'

const heroSwiper = new Swiper("#hero-swiper", {
    // autoplay: {
    //     delay: 3000,
    // },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    }
  });

// Gallery Swiper initialization function
function initializeSwiper() {
  // Destroy existing swipers if they exist
  if (window.galleryThumbs) {
    window.galleryThumbs.destroy(true, true);
  }
  if (window.galleryMain) {
    window.galleryMain.destroy(true, true);
  }

  // Initialize thumbnail swiper
  window.galleryThumbs = new Swiper('.gallery-thumbs', {
    spaceBetween: 10,
    slidesPerView: 'auto',
    freeMode: true,
    watchSlidesProgress: true,
    breakpoints: {
      320: {
        slidesPerView: 3,
        spaceBetween: 5
      },
      768: {
        slidesPerView: 6,
        spaceBetween: 10
      },
      1024: {
        slidesPerView: 8,
        spaceBetween: 15
      }
    }
  });

  // Initialize main swiper
  window.galleryMain = new Swiper('.gallery-main', {
    spaceBetween: 10,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    thumbs: {
      swiper: window.galleryThumbs
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    loop: true,
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    }
  });
}

// Make initializeSwiper globally available
window.initializeSwiper = initializeSwiper;