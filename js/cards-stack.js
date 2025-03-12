(function () {
  'use strict';

  const cardBlocks = document.querySelectorAll(".stack-cards");

  cardBlocks.forEach((cardBlock) => {
    cardBlock.style.paddingBottom = `${Math.max(cardBlock.children.length, 1)}em`;

    Array.from(cardBlock.children).forEach(
      (card, i) => (card.style.transform = `translateY(${i}em)`)
    );
  });

})();
