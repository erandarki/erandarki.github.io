// blend two hex colors together by an amount (like sass mix() or css color-mix())
function blendColors(colorA, colorB, amount) {
  const [rA, gA, bA] = colorA.match(/\w\w/g).map((c) => parseInt(c, 16));
  const [rB, gB, bB] = colorB.match(/\w\w/g).map((c) => parseInt(c, 16));
  const r = Math.round(rA + (rB - rA) * amount).toString(16).padStart(2, '0');
  const g = Math.round(gA + (gB - gA) * amount).toString(16).padStart(2, '0');
  const b = Math.round(bA + (bB - bA) * amount).toString(16).padStart(2, '0');
  return '#' + r + g + b;
}
// console.log(blendColors('#0d6efd', '#ffffff', 0.2)); // return #3d8bfd


// Convert RGB to HEX
function rgbToHex(rgbString) {
  let parts = rgbString.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  // parts now should be e.g. ["rgb(0, 70, 255", "0", "70", "255"]

  delete (parts[0]);
  for (let i = 1; i <= 3; ++i) {
      parts[i] = parseInt(parts[i]).toString(16);
      if (parts[i].length == 1) parts[i] = '0' + parts[i];
  } 
  let hexString = '#' + parts.join(''); // "#0070ff"
  // let hexString ='#'+parts.join('').toUpperCase(); // "#0070FF" (adding # and uppercase)
  return hexString;
}


// VARIABLES
// Color ranger
const rangeSlider = document.querySelector('.form-range');
const rangeLabel = document.querySelector('.range-label');
// Color scheme
const inputColor = document.getElementById('colorInput');
const hexText = document.querySelector('.hex');
const mainColor = document.querySelector('.main-color');
const invalidFeedback = document.querySelector('.invalid-feedback');


function updateColorScheme() {
  // Run these numbers as precentage for BG color opacity
  const mixNumbers = [
    rangeSlider.value * 1, 
    rangeSlider.value * 2, 
    rangeSlider.value * 3, 
    rangeSlider.value * 4
  ];
  
  mixNumbers.forEach((number, index) => {
    let percentage = number / 100;
    if (number > 100) {
      percentage = 1;
    }

    // Add to each class-name multiples of 20 (20, 40, 60, 80)
    let blackClass = document.querySelector('.mix-black-' + 20 * (index + 1));
    let whiteClass = document.querySelector('.mix-white-' + 20 * (index + 1));

    // Validation (Invalid: empty state, less than 3, less than 6, more than 6)
    if (inputColor.value == null || inputColor.value == '' || inputColor.value.length <= 2 || inputColor.value.length > 3 && inputColor.value.length < 6 || inputColor.value.length > 6) {
      // Set input value
      inputColor.value = mainColor.querySelector('.hex').innerHTML;
      // Remove validation error
      invalidFeedback.style.display = 'none';
    }
    
    // Blend colors
    blackClass.style.backgroundColor = blendColors(inputColor.value, '#000000', percentage);
    whiteClass.style.backgroundColor = blendColors(inputColor.value, '#ffffff', percentage);
    
    // Display HEX colors
    blackClass.querySelector('.hex').innerHTML = rgbToHex(blackClass.style.backgroundColor);
    whiteClass.querySelector('.hex').innerHTML = rgbToHex(whiteClass.style.backgroundColor);
  });
}


// Slider Range
function showSliderValue() {
  rangeLabel.innerHTML = `${rangeSlider.value}%`;
  rangeLabel.style.left = `calc(${rangeSlider.value}% - ${rangeLabel.getBoundingClientRect().width / 3}px)`;
}

window.addEventListener('load', () => {
  showSliderValue();
});

rangeSlider.addEventListener('input', ()=> {
  showSliderValue();
  updateColorScheme();
});


// Allow only numbers and letters (Regex)
function allowAlphaNumericSpace(thisInput) {
  thisInput.value = thisInput.value.replace(/[^#a-fA-F0-9]/g,'');
}


// Input field
inputColor.addEventListener('keyup', function(event) {
  allowAlphaNumericSpace(this);

  if (event.key === 'Enter') {
    event.preventDefault();

    // Remove hash character (#) from input field
    if (inputColor.value.includes('#')) {
      inputColor.value = inputColor.value.split('#').map(function (hash) {
        return hash;
      }).join('');
    }

    // Validation (Invalid: empty state, less than 3, less than 6, more than 6)
    if (inputColor.value == null || inputColor.value == '' || inputColor.value.length <= 2 || inputColor.value.length > 3 && inputColor.value.length < 6 || inputColor.value.length > 6) {
      invalidFeedback.style.display = 'block';
      return false;
    }

    // Convert a three-digit hexcolor into a six-digit
    if (inputColor.value.length === 3) {
      inputColor.value = inputColor.value.split('').map(function (hex) {
        return hex + hex;
      }).join('');
    }

    // Remove validation error
    invalidFeedback.style.display = 'none';
    
    mainColor.style.backgroundColor = '#' + inputColor.value;
    mainColor.querySelector('.hex').innerHTML = '#' + inputColor.value.toLowerCase();

    updateColorScheme();
  }
});