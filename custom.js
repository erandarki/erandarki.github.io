// Solution 1
// let mobileBtn = document.querySelector('.btn-mobile');
// let desktopBtn = document.querySelector('.btn-desktop');
// let changePreview = document.querySelector('.iframe-preview');

// mobileBtn.addEventListener('click', showMobileView);
// desktopBtn.addEventListener('click', showDesktopView);

// function showMobileView() {
//     changePreview.classList.add('is-visible');
// }

// function showDesktopView() {
//     changePreview.classList.remove('is-visible');
// }

// // Add active class to the current button (highlight it)
// let nav = document.querySelector('.nav-items');
// let btns = nav.getElementsByClassName('nav-btn');

// for (let i = 0; i < btns.length; i++) {
//     btns[i].addEventListener('click', function () {
//         let current = document.getElementsByClassName('active');
//         current[0].className = current[0].className.replace(' active', '');
//         this.className += ' active';
//     });
// }

// Buttons
let btns = document.querySelectorAll('.nav-items .nav-btn');
let iframeView = document.querySelector('.iframe-preview');

for (i = 0; i < btns.length; i++)
    btns[i].addEventListener('click', changeSiteView);

function changeSiteView() {
    // Add active class to the current button (highlight it)
    let current = document.getElementsByClassName('active');
    current[0].className = current[0].className.replace(' active', '');
    this.className += ' active';

    // Mobile view
    if (this.getAttribute('data-mobile'))
        iframeView.classList.add('is-visible');

    // Desktop view
    if (this.getAttribute('data-desktop'))
        iframeView.classList.remove('is-visible');
}

// Input field intro
const introForm = document.querySelector('.intro-form');
let input = document.querySelector('.intro-form > .url').focus();

introForm.addEventListener('submit', function (e) {
    e.preventDefault()

    let inputField = document.getElementById('iframe').src = document.querySelector('.intro-form > .url');
    geturl(inputField);
    document.querySelector('.intro-form > .url').blur();
    document.querySelector('body').classList.remove('intro-filter');
    document.querySelector('.intro').classList.remove('slideInDown');
    document.querySelector('.intro').classList.add('slideOutUp');
});

// Input field nav
const navForm = document.querySelector('.nav-form');

navForm.addEventListener('submit', function (e) {
    e.preventDefault()
    let inputField = document.getElementById('iframe').src = document.querySelector('.nav-form > .url');
    geturl(inputField);
    document.querySelector('.nav-form > .url').value = '';
    document.querySelector('.nav-form > .url').blur();
});

// Input value
function geturl(inputField) {
    let output = inputField;
    let url = output.value;
    
    if (!~url.indexOf("http")) {
        url = "http://" + url;
    }
    output.value = url;

    document.getElementById("iframe").src = url;
}

// function geturls() {
//     let output = document.querySelector('.nav-form > .url');
//     let url = output.value;
    
//     if (!~url.indexOf("http")) {
//         url = "http://" + url;
//     }
//     output.value = url;

//     document.getElementById("iframe").src = url;
// }

// function geturl() {
//     let url = document.querySelector('.intro-form > .url').value;
//     let protocol_ok = url.startsWith('http://') || url.startsWith('https://') || url.startsWith('ftp://');

//     if (!protocol_ok) {
//         newurl = 'http://' + url;
//         return newurl;
//     } else {
//         return url;
//     }
// }

// Close navigation
let closeNav = document.querySelector('.close-nav');
closeNav.addEventListener('click', closeNavigation);

function closeNavigation() {
    let nav = document.querySelector('nav');
    let iframeHeight = document.querySelector('.iframe-preview');

    nav.classList.add('slideOutUp');
    iframeHeight.classList.add('nav-closed');
}