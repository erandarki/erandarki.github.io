(function () {
  'use strict';

  let mediaQuery = window.matchMedia('(min-width: 767px)');
  let e = document.querySelectorAll(".stack-cards")
    , o = ["load", "resize", "scroll"];
  [].forEach.call(e, function (e) {
    let t = e.querySelectorAll(".stack-cards-item");
    o.forEach(function (e) {
      window.addEventListener(e, function () {
        let d = [].slice.call(t).reverse();
        d.reduce(function (e, t, o) {
          let n = t.clientHeight + parseInt(window.getComputedStyle(t).getPropertyValue("margin-bottom"))
            , a = e + (n - (d[o - 1] ? d[o - 1].offsetTop - t.offsetTop : n)) / n
            , r = t.firstElementChild
            // , l = r.firstElementChild
            , c = "calc(-1rem * " + a + ")"
            // , i = "calc(1 - .2 * " + a + ")"
            , s = "calc(1 - .03 * " + a + ")";
            if(mediaQuery.matches) {
              return r.style.transform = "translateY(" + c + ") scale(" + s + ")",
                // l.style.opacity = i,
                a
            } else {
              return r.style.transform = "translateY(" + c + ")",
                a
            }
        }, 0)
      })
    })
  })

})();
