'use strict'

// Home Button
const btn = document.querySelector('#home .btn');
const moreContext = document.querySelector('.home__context-more');
const homeContext = document.querySelector('.home__context');

btn.addEventListener('click', () => {
  homeContext.style.opacity = 0;
  moreContext.style.opacity = 1;
  
  setTimeout(() => {
    moreContext.style.opacity = 0;
    homeContext.style.opacity = 1;
  }, 5000);
});

// Hamburger menu click
const menuBtn = document.querySelector('.menu__btn');
const navMenu = document.querySelector('.nav');
const navItems = document.querySelector('.nav__items');

let menuOpen = false;

menuBtn.addEventListener('click', () => {
  if (!menuOpen) {
    menuBtn.classList.add('open');
    navMenu.classList.add('open');
    navItems.classList.add('open');
    
    menuOpen = true;
  } else {
    menuBtn.classList.remove('open');
    navMenu.classList.remove('open');
    navItems.classList.remove('open');
    
    menuOpen = false;
  }
});



// Image Swiper 
const swiper = new Swiper('.swiper-container', {
  effect: 'coverflow',
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 'auto',
  coverflowEffect: {
    rotate: 25,
    stretch: 0,
    depth: 300,
    modifier: 1,
    slideShadows: true,
  },
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  autoplay: {
    delay: 2000,
    disableOnInteraction: true,
  },
});

const scrollOptions = {
  behavior: "smooth",
  block: "start"
}

const sectionIds = [
  "#home",
  "#about",
  "#gallery",
  "#skills",
  "#contact"
];

const sections = sectionIds.map(id => document.querySelector(id));
const navLinks = sectionIds.map(id => document.querySelector(`[data-link="${id}"]`));

let selectedNavLink = navLinks[0];
let selectedNavIndex = 0;

selectedNavLink.classList.add('active');

function selectNavItem(selected) {
  selectedNavLink.classList.remove('active');
  selectedNavLink = selected;
  selectedNavLink.classList.add('active');
}

navItems.addEventListener('click', (event) => {
  const target = event.target.closest('li');
  if (!target) {
    return;
  } else {
    const targetSection = target.textContent.toLowerCase();
    const scrollTo = document.querySelector(`#${targetSection}`);
    scrollTo.scrollIntoView(scrollOptions);
    
    selectNavItem(target);
    
    menuBtn.classList.remove('open');
    navMenu.classList.remove('open');
    navItems.classList.remove('open');
    
    menuOpen = false;
  }
});

const scrollTopBtn = document.querySelector('.scrollBtn');
const home = document.querySelector('#home');
const scrollUp = document.querySelector('.scrollBtn');
const header = document.querySelector('header');

scrollTopBtn.addEventListener('click', () => {
  home.scrollIntoView(scrollOptions);
  selectNavItem(navLinks[0]);
})

document.addEventListener('scroll', () => {
  const homeHeight = home.getBoundingClientRect().height;
  
  if (window.scrollY > homeHeight /4) {
    scrollUp.classList.add('show');
    header.classList.add('background');
  } else {
    scrollUp.classList.remove('show');
    header.classList.remove('background');
  }
  
})

//  Intersection Oberserver --------------------------

const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5
}

function callback (entries) {
  entries.forEach(entry => {
    if (!entry.isIntersecting && entry.intersectionRatio > 0) {
      const index = sectionIds.indexOf(`#${entry.target.id}`);
     
      if (entry.boundingClientRect.y < 0) {
        selectedNavIndex = index + 1;
      } else {
        selectedNavIndex = index - 1;
      }
    }
  });
};

const observer = new IntersectionObserver(callback, options);
sections.forEach(section => observer.observe(section));


window.addEventListener('wheel', () => {
  if (window.scrollY === 0) {
    selectedNavIndex = 0;
  } else if (window.scrollY === document.body.innerHeight) {
    selectedNavIndex = navLinks.length - 1;
    console.log(window.scrollY, document.body.innerHeight);
  }
  selectNavItem(navLinks[selectedNavIndex]);
});