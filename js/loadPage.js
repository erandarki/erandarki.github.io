// Show html snippet section
function showSnippetSection(name) {
  if (name === 'cv') {
    $('.projects-nav').addClass('d-none');
  }
  else {
    $('.projects-nav').removeClass('d-none');
  }
  $('.html-snippet').removeClass('fadeOut d-none');
  $('.html-snippet').addClass('fadeIn').on('animationend webkitAnimationEnd oAnimationEnd', function() {
    $('.html-snippet').removeClass('d-none');
  });
  $('.html-snippet').scrollTop(0);
}

// Adjust padding on scroll
$('.html-snippet').scroll(function() {
  if ($('.html-snippet').scrollTop() > 0) {
    $('.nav-html-snippet').removeClass('py-5');
  }
  else {
    $('.nav-html-snippet').addClass('py-5');
  }
});

// Close html-snippet section
$('.close-html-snippet').click(function() {
  $('.html-snippet').removeClass('fadeIn');
  $('.html-snippet').addClass('fadeOut').on('animationend webkitAnimationEnd oAnimationEnd', function() {
    $('.html-snippet').addClass('d-none');
  });
});

// Esc key triggers a click event
$(document).on('keydown', function(event) {
  if (event.key === "Escape" || event.keyCode === 27) {
    $('.close-html-snippet').click();
  }
});

// Load HTML Snippet
const targetEl = document.querySelector('.target');

function loadSnippet(name) {
  fetch(`../html-snippets/${name}.html`)
  .then(res => {
    if (res.ok) {
      return res.text();
    }
  })
  .then(htmlSnippet => {
    targetEl.innerHTML = htmlSnippet;
    $('.carousel').carousel(); // Initialize Bootstrap carousel
    animateCountUp(); // Trigger count up animation
    if (name === 'design-system') {
      sliderImgCompare();
    }
  });
  showSnippetSection(name);
}

// Carousel
let carousel = document.querySelector('.carousel');

let flkty = new Flickity(carousel, {
  imagesLoaded: true,
  wrapAround: true
});

// Triggered when the user's pointer is pressed or dragged
flkty.on('staticClick', function( event, pointer, cellElement, cellIndex) {
  // Dismiss if cell was not clicked
  if (!cellElement || !cellElement.classList.contains('is-selected')) {
    return;
  }
 
  // If cell was clicked open the relevant HTML snippet
  loadSnippet(cellElement.getAttribute('data-name'));
});

// nav-html-snippet Previous/Next buttons
$('.previous-project').on('click', function() {
  flkty.previous();
  loadSnippet(flkty.selectedElement.getAttribute('data-name'));
});

$('.next-project').on('click', function() {
  flkty.next();
  loadSnippet(flkty.selectedElement.getAttribute('data-name'));
});