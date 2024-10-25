(function () {
  'use strict'

  // Settings fields behaviors
  const uploadImg = document.getElementById('uploadImg');
  const signatureImgSection = document.getElementById('signatureImgSection');
  // Checkbox elements
  const mainImgCheckbox = document.getElementById('mainImgCheckbox');
  const fullnameCheckbox = document.getElementById('fullnameCheckbox');
  const jobTitleCheckbox = document.getElementById('jobTitleCheckbox');
  const mobilePhoneCheckbox = document.getElementById('mobilePhoneCheckbox');
  const telephoneCheckbox = document.getElementById('telephoneCheckbox');
  const websiteCheckbox = document.getElementById('websiteCheckbox');
  const facebookCheckbox = document.getElementById('facebookCheckbox');
  const linkedinCheckbox = document.getElementById('linkedinCheckbox');
  const twitterCheckbox = document.getElementById('twitterCheckbox');
  const youtubeCheckbox = document.getElementById('youtubeCheckbox');
  const instagramCheckbox = document.getElementById('instagramCheckbox');
  const pinterestCheckbox = document.getElementById('pinterestCheckbox');
  // Signature elements
  const fullnameSignature = document.getElementById('fullnameSignature');
  const jobTitleSignature = document.getElementById('jobTitleSignature');
  const mobilePhoneSignature = document.getElementById('mobilePhoneSignature');
  const telephoneSignature = document.getElementById('telephoneSignature');
  const websiteSignature = document.getElementById('websiteSignature');
  const facebookSignature = document.getElementById('facebookSignature');
  const linkedinSignature = document.getElementById('linkedinSignature');
  const twitterSignature = document.getElementById('twitterSignature');
  const youtubeSignature = document.getElementById('youtubeSignature');
  const instagramSignature = document.getElementById('instagramSignature');
  const pinterestSignature = document.getElementById('pinterestSignature');
  // Input fields
  const fullNameInput = document.getElementById('fullNameInput');
  const jobTitleInput = document.getElementById('jobTitleInput');
  const mobileInput = document.getElementById('mobileInput');
  const telephoneInput = document.getElementById('telephoneInput');
  const websiteInput = document.getElementById('websiteInput');
  const facebookInput = document.getElementById('facebookInput');
  const linkedinInput = document.getElementById('linkedinInput');
  const twitterInput = document.getElementById('twitterInput');
  const youtubeInput = document.getElementById('youtubeInput');
  const instagramInput = document.getElementById('instagramInput');
  const pinterestInput = document.getElementById('pinterestInput');
  // Input color
  const nameColorInput = document.getElementById('nameColorInput');
  const jobTitleColorInput = document.getElementById('jobTitleColorInput');

  // Upload main image
  const reader1 = new FileReader();

  reader1.addEventListener('load', e => {
    document.querySelector('#mainImg').src = e.target.result;
  });

  document.addEventListener('DOMContentLoaded', e => {
    uploadImg.addEventListener('change', e => {
      reader1.readAsDataURL(e.target.files[0]);
    });
  });

  // Toggle active/inactive input field
  function disableInput(checkbox) {
    // Disable all non-checkbox inputs
    const allInputSiblings = checkbox.parentElement.parentElement.querySelectorAll('input:not([type=checkbox])');
    allInputSiblings.forEach(inputSibling => {
      inputSibling.toggleAttribute('disabled');
    });
    // Disable international telephone dropdown button
    if (checkbox.parentElement.nextElementSibling.classList.contains('iti')) {
      checkbox.parentElement.nextElementSibling.classList.toggle('disabled');
    }
  }

  // Show/hide main image
  mainImgCheckbox.addEventListener('click', () => {
    signatureImgSection.classList.toggle('d-none');
    disableInput(mainImgCheckbox);
  });

  // Show/hide name
  fullnameCheckbox.addEventListener('click', () => {
    fullnameSignature.classList.toggle('d-none');
    disableInput(fullnameCheckbox);
  });
  
  // Show/hide job title
  jobTitleCheckbox.addEventListener('click', () => {
    jobTitleSignature.classList.toggle('d-none');
    disableInput(jobTitleCheckbox);
  });

  // Show/hide mobile phone
  mobilePhoneCheckbox.addEventListener('click', () => {
    mobilePhoneSignature.classList.toggle('d-none');
    disableInput(mobilePhoneCheckbox);
  });

  // Show/hide telephone
  telephoneCheckbox.addEventListener('click', () => {
    telephoneSignature.classList.toggle('d-none');
    disableInput(telephoneCheckbox);
  });

  // Show/hide website
  websiteCheckbox.addEventListener('click', () => {
    websiteSignature.classList.toggle('d-none');
    disableInput(websiteCheckbox);
  });

  // Show/hide facebook
  facebookCheckbox.addEventListener('click', () => {
    facebookSignature.classList.toggle('d-none');
    disableInput(facebookCheckbox);
  });

  // Show/hide linkedin
  linkedinCheckbox.addEventListener('click', () => {
    linkedinSignature.classList.toggle('d-none');
    disableInput(linkedinCheckbox);
  });

  // Show/hide twitter
  twitterCheckbox.addEventListener('click', () => {
    twitterSignature.classList.toggle('d-none');
    disableInput(twitterCheckbox);
  });

  // Show/hide youtube
  youtubeCheckbox.addEventListener('click', () => {
    youtubeSignature.classList.toggle('d-none');
    disableInput(youtubeCheckbox);
  });

  // Show/hide youtube
  instagramCheckbox.addEventListener('click', () => {
    instagramSignature.classList.toggle('d-none');
    disableInput(instagramCheckbox);
  });

  // Show/hide pinterest
  pinterestCheckbox.addEventListener('click', () => {
    pinterestSignature.classList.toggle('d-none');
    disableInput(pinterestCheckbox);
  });

  // Edit name
  fullNameInput.addEventListener('input', () => {
    fullnameSignature.innerHTML = fullNameInput.value;
  });

  // Edit name color
  nameColorInput.addEventListener('input', () => {
    fullnameSignature.style.color = nameColorInput.value;
  });

  // Edit job title
  jobTitleInput.addEventListener('input', () => {
    jobTitleSignature.innerHTML = jobTitleInput.value;
  });

  // Edit job title color
  jobTitleColorInput.addEventListener('input', () => {
    jobTitleSignature.style.color = jobTitleColorInput.value;
  });

  // Edit mobile
  mobileInput.addEventListener('input', () => {
    mobileInput.value = mobileInput.value.replace(/[^ 0-9()\+-]/g, '');
    mobilePhoneSignature.firstElementChild.innerHTML = mobileInput.value;
    mobilePhoneSignature.firstElementChild.href = `tel:${mobileInput.value}`;
  });

  // Edit telephone
  telephoneInput.addEventListener('input', () => {
    telephoneInput.value = telephoneInput.value.replace(/[^ 0-9()\+-]/g, '');
    telephoneSignature.firstElementChild.innerHTML = telephoneInput.value;
    telephoneSignature.firstElementChild.href = `tel:${telephoneInput.value}`;
  });

  // Edit website
  websiteInput.addEventListener('input', () => {
    websiteSignature.firstElementChild.innerHTML = websiteInput.value;
    websiteSignature.firstElementChild.href = websiteInput.value;
  });
  
  // Edit facebook
  facebookInput.addEventListener('input', () => {
    facebookSignature.firstElementChild.href = facebookInput.value;
  });

  // Edit linkedin
  linkedinInput.addEventListener('input', () => {
    linkedinSignature.firstElementChild.href = linkedinInput.value;
  });

  // Edit twitter
  twitterInput.addEventListener('input', () => {
    twitterSignature.firstElementChild.href = twitterInput.value;
  });

  // Edit youtube
  youtubeInput.addEventListener('input', () => {
    youtubeSignature.firstElementChild.href = youtubeInput.value;
  });

  // Edit instagram
  instagramInput.addEventListener('input', () => {
    instagramSignature.firstElementChild.href = instagramInput.value;
  });

  // Edit pinterest
  pinterestInput.addEventListener('input', () => {
    pinterestSignature.firstElementChild.href = pinterestInput.value;
  });
})()
