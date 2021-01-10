(function () {
  'use strict';

  let mediaQuery = window.matchMedia('(min-width: 767px)');
  let wrapper = document.querySelectorAll('.stack-cards')
    , array = ['load', 'resize', 'scroll'];
  [].forEach.call(wrapper, function (wrapper) {
    let cardParent = wrapper.querySelectorAll('.stack-cards-item');
    array.forEach(function (wrapper) {
      window.addEventListener(wrapper, function () {
        let allCardsParents = [].slice.call(cardParent).reverse();
        allCardsParents.reduce(function (wrapper, cardParent, array) {
          let cardHeight = cardParent.clientHeight + parseInt(window.getComputedStyle(cardParent).getPropertyValue('margin-bottom'))
            , allCardsHeight = wrapper + (cardHeight - (allCardsParents[array - 1] ? allCardsParents[array - 1].offsetTop - cardParent.offsetTop : cardHeight)) / cardHeight
            , card = cardParent.firstElementChild
            // , cardContent = card.firstElementChild
            , translateY = 'calc(-1rem * ' + allCardsHeight + ')'
            // , opacity = 'calc(1 - .2 * ' + allCardsHeight + ')'
            , scale = 'calc(1 - .03 * ' + allCardsHeight + ')';
            if(mediaQuery.matches) {
              return card.style.transform = 'translateY(' + translateY + ') scale(' + scale + ')',
                // cardContent.style.opacity = opacity,
                allCardsHeight
            } else {
              return card.style.transform = 'translateY(' + translateY + ')',
                allCardsHeight
            }
        }, 0)
      })
    })
  })

})();
