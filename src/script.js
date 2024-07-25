'use strict';

//*** MODAL WINDOW ***
const modalWindow = document.querySelector('.modal-window');
const overlay = document.querySelector('.overlay');
const btnCloseModalWindow = document.querySelector('.btn--close-modal-window');
const btnsOpenModalWindow = document.querySelectorAll(
  '.btn--show-modal-window'
);

const openModalWindow = function (event) {
  event.preventDefault();
  modalWindow.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModalWindow = function () {
  modalWindow.classList.add('hidden');
  overlay.classList.add('hidden');
};


btnsOpenModalWindow.forEach(btn => btn.addEventListener('click', openModalWindow))

btnCloseModalWindow.addEventListener('click', closeModalWindow);
overlay.addEventListener('click', closeModalWindow);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modalWindow.classList.contains('hidden')) {
    closeModalWindow();
  }
});


//*** SCROLL PAGE ***
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function(e){
  const section1Position = section1.getBoundingClientRect();

  //old school approach
  /*window.scrollTo({
      left: section1Position.left + window.scrollX,
      top: section1Position.top + window.scrollY,
      behavior: 'smooth',
    });*/

  //new approach
  section1.scrollIntoView({ behavior: 'smooth'});

});


//*** SMOOTH PAGE NAVIGATION ***
//bad approach
/*
document.querySelectorAll('.nav__link')
  .forEach(function(htmlElement){
    htmlElement.addEventListener('click', function(e){
      e.preventDefault();
      document.querySelector(this.getAttribute('href'))
      .scrollIntoView({behavior: 'smooth'});    
    });
  });*/

//good approach "delegate event"
//1. Add event listener for common parent.
document.querySelector('.nav__links').addEventListener('click', function(e){
  e.preventDefault();
  //2. Define target element.
  if (e.target.classList.contains('nav__link')){
    document.querySelector(e.target.getAttribute('href'))
    .scrollIntoView({behavior: 'smooth'});
  }
});


///////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/*
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const getRandomColor = () => 
  `rgb(${getRandomIntInclusive(0, 255)},
  ${getRandomIntInclusive(0, 255)},
  ${getRandomIntInclusive(0, 255)})`;

document.querySelector('.nav__link').addEventListener('click', function(e) {
  e.preventDefault();
  this.style.backgroundColor = getRandomColor();
  e.stopPropagation();

});

document.querySelector('.nav__links').addEventListener('click', function(e) {
  this.style.backgroundColor = getRandomColor();
});

document.querySelector('.nav').addEventListener('click', function(e) {
  this.style.backgroundColor = getRandomColor();
},true);*/