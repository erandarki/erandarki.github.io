// wow animation effect
new WOW().init();

// Ease scrolling effect
$('html').easeScroll();

// Scroll top on page refresh
$(window).on('beforeunload', function () {
  $(window).scrollTop(0);
});

$(document).ready(function () {
  // Intro
  setTimeout(function () {
    $('.loader').addClass('exit');
    $('.frame').addClass('show-frame');
    $('nav').removeClass('invisible').addClass('nav-show');
    $('.scroll-down').removeClass('invisible');
    $('.profile').removeClass('invisible');
  }, 400);

  // On page scroll execute scrollIndicator
  window.onscroll = function() {scrollIndicator()};

  function scrollIndicator() {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    document.querySelector('.progress-bar').style.height = scrolled + '%';
  }

  let tlHello;
  let tlPreambule;

  // Hello animation
  tlHello = new TimelineLite({ paused: true });
  tlHello.staggerFrom($("#hello_h > *"), 0.6, { drawSVG: "0%", ease: Power3.easeOut }, 0.2, 0.8);
  tlHello.staggerFrom($("#hello_e > *"), 0.6, { drawSVG: "0%", ease: Power3.easeOut }, 0.2, "-=0.7");
  tlHello.staggerFrom($("#hello_l1 > *"), 0.6, { drawSVG: "0%", ease: Power3.easeOut }, 0.4, "-=1.2");
  tlHello.staggerFrom($("#hello_l2 > *"), 0.6, { drawSVG: "0%", ease: Power3.easeOut }, 0.4, "-=1");
  tlHello.staggerFrom($("#hello_o > *"), 1.2, { drawSVG: "0%", ease: Power3.easeOut }, 0.2, "-=1.2");
  tlHello.staggerFrom($("#hello_dot > *"), 0.6, { scale: 0, transformOrigin: "50% 50%", ease: Power3.easeOut }, 0.2, "-=0.8");
  tlHello.staggerFrom($(".scroll-down"), 1.2, { bottom: -70, ease: Power3.easeOut }, 0.2, "-=0.8");

  tlHello.play().timeScale(1);

  TweenLite.ticker.addEventListener("tick", onScroll);

  function onScroll() {
    scrollAmount = $(window).scrollTop();

    // Hello animation toggle
    if (scrollAmount > 10 && $('.hello-wrapper').hasClass('show-hello')) {
      $('.hello-wrapper').removeClass('show-hello');
      $('.navbar-brand').addClass('mobile-view');
      tlPreambule.play().timeScale(1);
    } else if (scrollAmount <= 10 && !$('.hello-wrapper').hasClass('show-hello')) {
      $('.hello-wrapper').addClass('show-hello');
      $('.navbar-brand').removeClass('mobile-view');
      tlPreambule.reverse().timeScale(2);
    }
  }

  // Profile section
  tlPreambule = new TimelineLite({ paused: true });
  tlPreambule.from(".profile .profile-content svg > *", 0.8, { drawSVG: "0%", ease: Power3.easeOut }, 0.5);
  tlPreambule.from(".profile .profile-content .top-line", 1, { x: "-20%", opacity: 0, ease: Power3.easeOut }, "-=0.60");
  tlPreambule.from(".profile .profile-content .profile-text p", 1, { y: "100%", ease: Power3.easeOut }, "-=0.60");

});