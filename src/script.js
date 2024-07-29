'use strict';

//*** MODAL WINDOW ***//
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


//*** SCROLL PAGE ***//
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


//*** INTERACTIVE TAB ***//
const tabContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const contents = document.querySelectorAll('.operations__content');

tabContainer.addEventListener('click', function(e){
    const clickedButton = e.target.closest('.operations__tab');
    if(!clickedButton) return;

    //active title
    tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
    clickedButton.classList.add('operations__tab--active'); 
    
    //active content
    contents.forEach(content => content.classList.remove('operations__content--active'));
    document.querySelector(`.operations__content--${clickedButton.dataset.tab}`)
    .classList.add('operations__content--active');
});


//*** NAV ***//
const nav = document.querySelector('.nav');

const navLinksHoverAnimation = function(e) {
  if(e.target.classList.contains('nav__link')){
    const linkOver = e.target;
    const siblingLinks = linkOver.closest('.nav__links').querySelectorAll('.nav__link');
    const logo = linkOver.closest('.nav').querySelector('img');
    const logoText = linkOver.closest('.nav').querySelector('.nav__text');

    siblingLinks.forEach(el => {
      if(el !== linkOver) el.style.opacity = this;
    });

    logo.style.opacity = this;
    logoText.style.opacity = this;
  }
}

nav.addEventListener('mouseover', navLinksHoverAnimation.bind(0.4));

nav.addEventListener('mouseout', navLinksHoverAnimation.bind(1));



//*** STICKY NAVIGATION ***//

//bad approuch 
/*
const section1Coords = section1.getBoundingClientRect();

window.addEventListener('scroll', function(e){
    console.log(window.scrollY);
    if(this.window.scrollY > section1Coords.top){
        nav.classList.add('sticky');
    }
    else{
        nav.classList.remove('sticky');
    }
});*/

//good approuch (intersection observer API)
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const observerOptions = {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`,
}
const getStickyNav = function(entries){
    const entry = entries[0];
    if(entry.isIntersecting){
        nav.classList.remove('sticky');

    }else{
        nav.classList.add('sticky');
    }

    console.log(entry);
}
const observer = new IntersectionObserver(getStickyNav, observerOptions);
observer.observe(header);



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
