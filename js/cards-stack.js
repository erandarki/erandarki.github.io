(function () {
  'use strict';

  const cardBlocks = document.querySelectorAll(".stack-cards");

  cardBlocks.forEach((cardBlock) => {Array.from(cardBlock.children).forEach(
      (card, i) => (card.style.transform = `translateY(${i}em)`)
    );
  });

})();
