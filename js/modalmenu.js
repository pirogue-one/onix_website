"use strict";

//burger menu

const closeBtn = document.querySelector('#close');
const modalMenu = document.querySelector('.modal_menu');
const mobMenu = document.querySelector('#menu');

mobMenu.addEventListener('click', () => {
    modalMenu.style.display = 'flex';
});

closeBtn.addEventListener('click', () => {
    modalMenu.style.display = 'none';
})