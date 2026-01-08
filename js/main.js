$(document).ready(function () {
  // Intro
  setTimeout(function () {
    $('.invisible').removeClass('invisible');
    $('.frame').addClass('show-frame');
    $('nav').addClass('nav-show');
  }, 1400);

  // On page scroll execute scrollIndicator
  window.onscroll = function() {scrollIndicator()};

  function scrollIndicator() {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    document.querySelector('.progress-bar').style.height = scrolled + '%';
  }

  let tlHello;

  // Hello animation
  tlHello = new TimelineLite({ paused: true });
  tlHello.staggerFrom($("#hello_h > *"), 0.6, { drawSVG: "0%", ease: Power3.easeOut }, 0.2, 0);
  tlHello.staggerFrom($("#hello_e > *"), 0.6, { drawSVG: "0%", ease: Power3.easeOut }, 0.2, "-=0.7");
  tlHello.staggerFrom($("#hello_l1 > *"), 0.6, { drawSVG: "0%", ease: Power3.easeOut }, 0.4, "-=1.2");
  tlHello.staggerFrom($("#hello_l2 > *"), 0.6, { drawSVG: "0%", ease: Power3.easeOut }, 0.4, "-=1");
  tlHello.staggerFrom($("#hello_o > *"), 1.2, { drawSVG: "0%", ease: Power3.easeOut }, 0.2, "-=1.2");
  tlHello.staggerFrom($("#hello_dot > *"), 0.6, { scale: 0, transformOrigin: "50% 50%", ease: Power3.easeOut }, 0.2, "-=0.8");
  tlHello.staggerFrom($(".scroll-down"), 1.2, { bottom: -70, ease: Power3.easeOut }, 1.2, 1.4);

  tlHello.play().timeScale(1);

  // Parallax effect on header
  const parallaxElement = document.querySelector('header .row');
  const speed = 0.5;

  function handleParallax() {
    // Get the current vertical scroll position
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Calculate the new vertical translation (move it in the opposite direction of the scroll)
    // Multiplying by a negative speed creates the upward motion as you scroll down
    const yPos = scrollTop * -speed;

    TweenMax.to(parallaxElement, 0.4, { // 0.4 seconds duration for a smoother feel
      y: yPos,
      ease: Power1.easeOut
    });
  }

  window.addEventListener('scroll', handleParallax);
  
});

// wow animation effect
new WOW().init();

// Lenis smooth scrolling settings
const lenisOptions = {
  duration: 1.6,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical', // vertical, horizontal
  gestureDirection: 'vertical', // vertical, horizontal, both
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
  anchors: true, // Scroll to anchor links when clicked
  allowNestedScroll: true, // Allow nested scrollable elements to scroll
  autoRaf: true, // Automatically handles the requestAnimationFrame loop
};

// Initialize Lenis smooth scrolling
const mainLenis = new Lenis(lenisOptions);

// Scroll to top on page refresh
$(window).on('beforeunload', function () {
  $(window).scrollTop(0);
});

// Enable Bootstrap tooltips
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
});