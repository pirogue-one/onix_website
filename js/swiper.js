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

// Gallery Swiper initialization
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

window.galleryMain = new Swiper('.gallery-main', {
  spaceBetween: 10,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  thumbs: {
    swiper: galleryThumbs
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