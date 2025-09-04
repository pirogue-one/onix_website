'use strict'

let slideIndex = 1;
showSlides(slideIndex, ".my-slides-wrapper");
showSlides(slideIndex, ".my-slides-2-wrapper");

function plusSlides(n, selector) {
  showSlides(slideIndex += n, selector);
}

function currentSlide(n, selector) {
  showSlides(slideIndex = n, selector);
}

function showSlides(n, selector) {
  let i;
  const slidesDiv = document.querySelector(selector);
  const slides = slidesDiv.querySelectorAll(".mySlides");
  const dots = slidesDiv.querySelectorAll(".demo");
  const captionText = slidesDiv.querySelector("#caption");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  captionText.innerHTML = dots[slideIndex-1].alt;
}


