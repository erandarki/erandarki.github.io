// UI & RENDER LOGIC
/* -------------------------------------------------------------------------- */
/* Global Variables & Initializations                                         */
/* -------------------------------------------------------------------------- */
const grid = document.getElementById('icon-grid');
const strokeSlider = document.getElementById('icon-stroke');
const sizeSlider = document.getElementById('icon-size');
const colorInput = document.getElementById('icon-color');
const resetBtn = document.getElementById('reset-btn');
const goPremiumBtn = document.getElementById('goPremiumBtn');
const searchInput = document.getElementById('search-input');
const responsiveCheckbox = document.getElementById('responsive-size');
const categoryContainer = document.getElementById('category-filters'); 
const downloadAllBtn = document.getElementById('downloadAllBtn');
const onloadBtn = document.getElementById('btn-onload');
const hoverBtn = document.getElementById('btn-hover');
const buyPremiumBtn = document.getElementById('buy-premium-btn');
const paidPlanBtn = document.getElementById('paid-plan-btn');
const iterationSlider = document.getElementById('iterations');
const infiniteCheckbox = document.getElementById('infinite');

const pricesModal = new bootstrap.Modal('#pricesModal');

let originalSvgStyles = new Map();
let iconData = {}; 
let allIconWrappers = []; 
let allSvgs = []; 
let currentCategory = 'all';

const DEFAULTS = {
  size: '64',
  stroke: '1',
  color: 'currentColor',
  iterations: '1',
  infinite: true
};

/* -------------------------------------------------------------------------- */
/* UI Event Listeners                                                         */
/* -------------------------------------------------------------------------- */
strokeSlider.addEventListener('input', updateStroke);
sizeSlider.addEventListener('input', updateSize);
colorInput.addEventListener('input', updateColor);
resetBtn.addEventListener('click', resetSettings);
searchInput.addEventListener('input', filterSearch);
responsiveCheckbox.addEventListener('change', toggleResponsive);

onloadBtn.addEventListener('click', () => {
    // onloadBtn.classList.add('active');
    // hoverBtn.classList.remove('active');
    onloadBtn.checked = true;
    hoverBtn.checked = false;
    updateSvgAnimationStyles();
    checkDefaults();
});

hoverBtn.addEventListener('click', () => {
    // hoverBtn.classList.add('active');
    // onloadBtn.classList.remove('active');
    hoverBtn.checked = true;
    onloadBtn.checked = false;
    updateSvgAnimationStyles();
    checkDefaults();
});

iterationSlider.addEventListener('input', updateIterations);
infiniteCheckbox.addEventListener('change', toggleInfinite);

if (downloadAllBtn) {
  downloadAllBtn.addEventListener('click', () => {
    if (window.isPaid) {
        downloadAllIcons();
    } else {
        pricesModal.show();
    }
  });
}

/* -------------------------------------------------------------------------- */
/* Animation Engine                                                           */
/* -------------------------------------------------------------------------- */
function updateSvgAnimationStyles() {
  const isHoverMode = hoverBtn.checked;
  const isInfinite = infiniteCheckbox.checked;
  const iterValue = iterationSlider.value;

  allSvgs.forEach(svg => {
    const rootId = svg.id;
    const styleTag = svg.querySelector('style');
    if (!styleTag) return;

    // 1. Initialize Cache if empty
    if (!originalSvgStyles.has(rootId)) {
      originalSvgStyles.set(rootId, styleTag.innerHTML);
    }

    let cssText = originalSvgStyles.get(rootId);

    // 2. Apply Trigger Mode (Hover logic)
    if (isHoverMode) {
      const hoverRegex = new RegExp(`#${rootId}(?=[\\s{])`, 'g');
      cssText = cssText.replace(hoverRegex, `#${rootId}:hover`);
    }

    // 3. Conditional Override
    // Only inject the extra CSS rule if the user has unchecked "Infinite"
    if (!isInfinite) {
      const override = `\n#${rootId} * { animation-iteration-count: ${iterValue} !important; }`;
      styleTag.innerHTML = cssText + override;
    } else {
      // If infinite, just use the base CSS
      styleTag.innerHTML = cssText;
    }
  });
}

function updateIterations(event) {
    const value = event.target.value;
    iterationSlider.nextSibling.textContent = ` ${value}`;
    if (!infiniteCheckbox.checked) {
        updateSvgAnimationStyles();
        restartAnimations();
    }
    checkDefaults();
}

function toggleInfinite() {
    iterationSlider.disabled = this.checked || !window.isPaid;
    iterationSlider.parentElement.classList.toggle('text-decoration-line-through', this.checked);
    updateSvgAnimationStyles();
    restartAnimations();
    checkDefaults();
}

function restartAnimations() {
    grid.classList.add('d-none');
    grid.offsetWidth; 
    grid.classList.remove('d-none');
}

/* -------------------------------------------------------------------------- */
/* UI & State Management                                                      */
/* -------------------------------------------------------------------------- */

window.updateControlStates = function() {
  const isPaid = window.isPaid;

  // Toggle Visibility
  if (isPaid) {
    resetBtn.classList.remove('d-none');
    if (goPremiumBtn) goPremiumBtn.classList.add('d-none');
    if (downloadAllBtn) downloadAllBtn.classList.remove('d-none');
    if (buyPremiumBtn) buyPremiumBtn.classList.add('d-none');
    if (paidPlanBtn) paidPlanBtn.classList.remove('d-none');
  } else {
    resetBtn.classList.add('d-none');
    if (goPremiumBtn) goPremiumBtn.classList.remove('d-none');
    if (downloadAllBtn) downloadAllBtn.classList.add('d-none');
    if (paidPlanBtn) paidPlanBtn.classList.add('d-none');
    if (buyPremiumBtn) buyPremiumBtn.classList.remove('d-none');
  }

  // Set Default UI States
  infiniteCheckbox.checked = true;
  iterationSlider.parentElement.classList.add('text-decoration-line-through');
  responsiveCheckbox.checked = false;
  sizeSlider.parentElement.classList.remove('text-decoration-line-through');

  // Disable/Enable based on Payment and logic
  const allControls = [strokeSlider, sizeSlider, colorInput, responsiveCheckbox, onloadBtn, hoverBtn, iterationSlider, infiniteCheckbox];
  
  allControls.forEach(control => {
    if (control) control.disabled = !isPaid;
  });

  if (isPaid) {
    // Specific logic: Slider is disabled if its corresponding toggle is active
    iterationSlider.disabled = infiniteCheckbox.checked; 
    sizeSlider.disabled = responsiveCheckbox.checked;
  }
}

function checkDefaults() {
  const isDefault = 
    sizeSlider.value === DEFAULTS.size &&
    strokeSlider.value === DEFAULTS.stroke &&
    colorInput.value === DEFAULTS.color &&
    iterationSlider.value === DEFAULTS.iterations &&
    infiniteCheckbox.checked === true &&
    responsiveCheckbox.checked === false &&
    onloadBtn.checked === true;
  
  resetBtn.disabled = isDefault || !window.isPaid; 
}

function updateIcons() {
  if (allSvgs.length === 0 || !window.isPaid) return; 
  allSvgs.forEach(svg => {
    if (!responsiveCheckbox.checked) {
      svg.setAttribute('width', sizeSlider.value);
      svg.setAttribute('height', sizeSlider.value);
      svg.classList.remove('icon-responsive');
    }
    svg.setAttribute('stroke-width', strokeSlider.value);
    svg.setAttribute('stroke', isValidColor(colorInput.value) ? colorInput.value : 'currentColor');
  });
}

function resetSettings() {
  if (!window.isPaid) return;
  
  sizeSlider.value = DEFAULTS.size;
  strokeSlider.value = DEFAULTS.stroke;
  colorInput.value = DEFAULTS.color;
  iterationSlider.value = DEFAULTS.iterations;
  
  sizeSlider.nextSibling.textContent = ` ${DEFAULTS.size}px`;
  strokeSlider.nextSibling.textContent = ` ${DEFAULTS.stroke}px`;
  iterationSlider.nextSibling.textContent = ` ${DEFAULTS.iterations}`;
  
  responsiveCheckbox.checked = false;
  infiniteCheckbox.checked = true;
  
  iterationSlider.disabled = true;
  iterationSlider.parentElement.classList.add('text-decoration-line-through');
  
  sizeSlider.disabled = false;
  sizeSlider.parentElement.classList.remove('text-decoration-line-through');

  onloadBtn.checked = true;
  hoverBtn.checked = false;

  updateSvgAnimationStyles();
  updateIcons();
  restartAnimations();
  checkDefaults();
}

function updateStroke(event) {
  allSvgs.forEach(svg => svg.setAttribute('stroke-width', strokeSlider.value));
  strokeSlider.nextSibling.textContent = `${event.target.value}px`;
  checkDefaults();
}

function updateSize(event) {
  allSvgs.forEach(svg => {
    svg.setAttribute('width', sizeSlider.value);
    svg.setAttribute('height', sizeSlider.value);
  });
  sizeSlider.nextSibling.textContent = `${event.target.value}px`;
  checkDefaults();
}

function isValidColor(str) {
  return CSS.supports('color', str);
}

function updateColor(event) {
  const value = colorInput.value.trim();
  const activeColor = isValidColor(value) ? value : 'currentColor';
  allSvgs.forEach(svg => svg.setAttribute('stroke', activeColor));
  checkDefaults();
}

function toggleResponsive(event) {
  const isPaid = window.isPaid;
  sizeSlider.disabled = this.checked || !isPaid;
  sizeSlider.parentElement.classList.toggle('text-decoration-line-through', this.checked);
  
  if (this.checked) {
    allSvgs.forEach(svg => {
      svg.removeAttribute('width');
      svg.removeAttribute('height');
      svg.classList.add('icon-responsive');
    });
  } else {
    allSvgs.forEach(svg => {
      svg.classList.remove('icon-responsive');
    });
    updateIcons();
  }
  checkDefaults();
}

/* -------------------------------------------------------------------------- */
/* Icons Loading Logic                                                        */
/* -------------------------------------------------------------------------- */
window.loadAllIcons = async function() {
  originalSvgStyles.clear(); 

  try {
    const listResponse = await fetch('./icon-list.json');
    if (!listResponse.ok) throw new Error('icon-list.json not found.');
    
    iconData = await listResponse.json();
    renderCategoryFilters();

    const masterList = [...new Set(Object.values(iconData).flat())].sort((a, b) => a.localeCompare(b));

    grid.innerHTML = '';
    allIconWrappers = [];
    
    window.updateControlStates();

    for (const name of masterList) {
      try {
        const wrapper = document.createElement('div');
        wrapper.className = 'icon-wrapper border ratio ratio-1x1';
        wrapper.setAttribute('data-name', name);

        if (window.isPaid) {
          const svgRes = await fetch(`../img/icons-svg/${name}.svg`);
          if (!svgRes.ok) throw new Error(`File ${name}.svg not found`);
          const svgText = await svgRes.text();
          wrapper.innerHTML = `
            <div class="icon-svg">${svgText}</div>
            <span class="icon-name">${name}</span>
          `;
          wrapper.addEventListener('click', () => downloadIcon(wrapper, name));
        } else {
          wrapper.innerHTML = `
            <div class="icon-png">
              <div class="png-img" style="--icon-url: url('../img/icons-png/${name}.png');"></div>
            </div>
            <span class="icon-name">${name}</span>
          `;
          wrapper.addEventListener('click', () => pricesModal.show());
        }

        allIconWrappers.push(wrapper);
      } catch (iconErr) {
        console.warn(`Skipping "${name}":`, iconErr.message);
      }
    }

    updateSearchPlaceholder(); 
    filterSearch();

  } catch (mainErr) {
    console.error("Critical Load Error:", mainErr);
  }
}

function renderCategoryFilters() {
  const desktopContainer = document.querySelector('.category-desktop-view');
  const mobileUl = document.querySelector('.category-mobile-dropdown .dropdown-menu');
  
  if (!desktopContainer || !mobileUl) return;

  desktopContainer.innerHTML = '';
  mobileUl.innerHTML = '';

  const categories = Object.keys(iconData).sort((a, b) => a.localeCompare(b));
  const totalIcons = [...new Set(Object.values(iconData).flat())].length;

  createCategoryElements('All', totalIcons, true);

  categories.forEach((cat) => {
    createCategoryElements(cat, iconData[cat].length, false);
  });
}

function createCategoryElements(name, count, isPrimaryActive) {
  const desktopContainer = document.querySelector('.category-desktop-view');
  const mobileUl = document.querySelector('.category-mobile-dropdown .dropdown-menu');
  const dropdownBtn = document.getElementById('catDropdown');

  const badgeHtml = `<span class="badge border p-1 ms-2 text-body top-0 bg-body-secondary me-auto">${count}</span>`;

  const btn = document.createElement('button');
  btn.className = `cat-btn btn btn-custom ${isPrimaryActive ? 'active' : ''}`;
  btn.innerHTML = `${name} <span>${count}</span>`;
  
  const li = document.createElement('li');
  const a = document.createElement('a');
  a.className = `dropdown-item ${isPrimaryActive ? 'active' : ''}`;
  a.href = "#";
  a.innerHTML = `${name} ${badgeHtml}`;

  if (isPrimaryActive && dropdownBtn) {
    dropdownBtn.innerHTML = `${name} ${badgeHtml}`;
  }

  const handleSelect = (e) => {
    if (e) e.preventDefault();
    searchInput.value = ''; 
    currentCategory = name.toLowerCase();
    document.querySelectorAll('.cat-btn, .dropdown-item').forEach(el => el.classList.remove('active'));
    btn.classList.add('active');
    a.classList.add('active');
    if (dropdownBtn) dropdownBtn.innerHTML = `${name} ${badgeHtml}`;
    filterSearch();
  };

  btn.addEventListener('click', handleSelect);
  a.addEventListener('click', handleSelect);

  desktopContainer.appendChild(btn);
  li.appendChild(a);
  mobileUl.appendChild(li);
}

function updateSearchPlaceholder() {
  const count = allIconWrappers.length;
  const iconText = count === 1 ? 'icon' : 'icons';
  searchInput.placeholder = `Search all ${count} ${iconText}...`;
}

function filterSearch() {
  const query = searchInput.value.toLowerCase();
  const searchInputIcon = document.querySelector('.search-input-icon use');

  if (query.length > 0) {
    searchInputIcon.setAttribute('href', '#clear-icon');
  } else {
    searchInputIcon.setAttribute('href', '#search-icon');
  }

  grid.innerHTML = '';

  const filteredWrappers = allIconWrappers.filter(wrapper => {
    const name = wrapper.getAttribute('data-name');
    if (query.length > 0) return name.toLowerCase().includes(query);
    if (currentCategory === 'all') return true;
    const originalKey = Object.keys(iconData).find(k => k.toLowerCase() === currentCategory);
    const categoryIcons = iconData[originalKey] || [];
    return categoryIcons.includes(name);
  });

  if (filteredWrappers.length > 0) {
    filteredWrappers.forEach(wrapper => grid.appendChild(wrapper));
  } else {
    const emptyState = document.createElement('div');
    emptyState.className = 'no-results';
    emptyState.innerHTML = `<p>No results found for "${searchInput.value}"</p>`;
    grid.appendChild(emptyState);
  }

  allSvgs = document.querySelectorAll('#icon-grid svg');
  updateIcons();
  updateSvgAnimationStyles();
}

const searchLabel = document.querySelector('.search-input-icon');
if (searchLabel) {
  searchLabel.addEventListener('click', () => {
    if (searchInput.value.length > 0) {
      searchInput.value = '';
      filterSearch();
      searchInput.focus();
    }
  });
}

searchInput.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    searchInput.value = '';
    filterSearch();
  }
});

window.addEventListener('keydown', (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
    event.preventDefault();
    searchInput.focus();
  }
});

function showToast(iconName) {
  const toastMessage = document.getElementById('toast-message');
  const toastIconName = document.getElementById('toast-icon-name');
  if (!toastMessage || !toastIconName) return;
  toastIconName.innerHTML = iconName ? `${iconName} elasticon` : 'All elasticons';
  document.querySelectorAll('animate').forEach((element) => {
    element.beginElement();
  });
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastMessage);
  toastBootstrap.show();
}

function getCleanSvgSource(originalSvg) {
  const svgClone = originalSvg.cloneNode(true);
  if (svgClone.classList.contains('icon-responsive')) svgClone.classList.remove('icon-responsive');
  if (svgClone.classList.length === 0) svgClone.removeAttribute('class');
  const scripts = svgClone.querySelectorAll('script');
  scripts.forEach(script => script.remove());
  const serializer = new XMLSerializer();
  let source = serializer.serializeToString(svgClone);
  return source.trim().replace(/\s+<\/svg>/, '</svg>');
}

function downloadIcon(wrapper, name) {
  if (!window.isPaid) return;
  const originalSvg = wrapper.querySelector('svg');
  if (!originalSvg) return;
  const source = getCleanSvgSource(originalSvg);
  const svgBlob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(svgBlob);
  const downloadLink = document.createElement("a");
  downloadLink.href = url;
  downloadLink.download = `${name}.svg`;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
  URL.revokeObjectURL(url);
  showToast(name);
}

async function downloadAllIcons() {
  if (!window.isPaid) return;
  const visibleWrappers = grid.querySelectorAll('.icon-wrapper');
  if (visibleWrappers.length === 0) return;

  const downloadBtnSpinner = downloadAllBtn.querySelector('.spinner-border'); 
  const downloadBtnText = downloadAllBtn.querySelector('.download-text');
  downloadAllBtn.disabled = true;
  downloadBtnText.classList.add('opacity-0');
  downloadBtnSpinner.classList.remove('visually-hidden');

  const zip = new JSZip();
  const folder = zip.folder("All elasticons");

  visibleWrappers.forEach(wrapper => {
    const name = wrapper.getAttribute('data-name');
    const svg = wrapper.querySelector('svg');
    if (svg && name) {
      const source = getCleanSvgSource(svg);
      folder.file(`${name}.svg`, source);
    }
  });

  try {
    const content = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(content);
    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = `all_elasticons.zip`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(url);
    showToast(); 
  } catch (err) {
    console.error("ZIP Generation failed:", err);
  } finally {
    downloadAllBtn.disabled = false;
    downloadBtnSpinner.classList.add('visually-hidden');
    downloadBtnText.classList.remove('opacity-0');
  }
}