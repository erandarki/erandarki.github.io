(() => {
  'use strict'

  document.addEventListener('DOMContentLoaded', (event) => {
    const htmlElement = document.documentElement;
    const switchElement = document.getElementById('bd-theme');
    const activeThemeIcon = document.querySelector('.theme-icon-active use');

    switchElement.addEventListener('change', function () {
      if (this.checked) {
        htmlElement.setAttribute('data-bs-theme', 'dark');
        activeThemeIcon.setAttribute('href', '#light');
        // localStorage.setItem('bsTheme', 'dark');
      } else {
        htmlElement.setAttribute('data-bs-theme', 'light');
        activeThemeIcon.setAttribute('href', '#dark');
        // localStorage.setItem('bsTheme', 'light');
      }
    });
  });
  
})();