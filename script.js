/* Manny's Mobile Mechanic — interactions. Vanilla JS, zero dependencies. */
(function () {
  'use strict';

  /* ---- Nav: blur on scroll ---- */
  var nav = document.getElementById('nav');
  var stickyCall = document.querySelector('.sticky-call');
  var lastY = 0;

  function onScroll() {
    var y = window.scrollY;
    nav.classList.toggle('nav--scrolled', y > 24);

    // Sticky call bar: show after hero, hide near the contact section
    var contact = document.getElementById('contact');
    var pastHero = y > window.innerHeight * 0.55;
    var nearContact = false;
    if (contact) {
      var r = contact.getBoundingClientRect();
      nearContact = r.top < window.innerHeight * 0.6;
    }
    if (stickyCall) stickyCall.classList.toggle('sticky-call--show', pastHero && !nearContact);

    lastY = y;
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Mobile menu ---- */
  var burger = document.getElementById('burger');
  var navLinks = document.getElementById('navLinks');
  burger.addEventListener('click', function () {
    navLinks.classList.toggle('nav__links--open');
    var open = navLinks.classList.contains('nav__links--open');
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  navLinks.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      navLinks.classList.remove('nav__links--open');
    });
  });

  /* ---- Reveal on scroll (staggered) ---- */
  var staggerGroups = [
    '.services-grid .card',
    '.steps .step',
    '.areas__pills .pill',
    '.specialist__list li',
    '.hero__badges li'
  ];

  staggerGroups.forEach(function (sel) {
    document.querySelectorAll(sel).forEach(function (el, i) {
      el.classList.add('reveal');
      el.setAttribute('data-delay', String(i % 4));
    });
  });

  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('reveal--visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('reveal--visible'); });
  }

  /* ---- Hero entrance: quick staggered load ---- */
  document.querySelectorAll('.hero__copy .reveal').forEach(function (el, i) {
    el.setAttribute('data-delay', String(Math.min(i, 4)));
    setTimeout(function () { el.classList.add('reveal--visible'); }, 60 * i + 80);
  });

  /* ---- Subtle hero parallax (desktop only) ---- */
  var heroCard = document.querySelector('.hero__card');
  var fine = window.matchMedia('(pointer: fine)').matches;
  if (heroCard && fine) {
    window.addEventListener('scroll', function () {
      var y = window.scrollY;
      if (y < window.innerHeight) {
        heroCard.style.translate = '0 ' + (y * 0.06) + 'px';
      }
    }, { passive: true });
  }
})();
