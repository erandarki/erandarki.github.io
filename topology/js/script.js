// Bootstrap enable tooltips
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

// Tab switch BG slide
const allTabs = document.querySelectorAll('button[data-bs-toggle="tab"]');
const activeTabBG = document.querySelector('.active-tab-bg');

// Get the size of the active tab
function setActiveTabBgSize(tab) {
  if(tab.classList.contains('active')) {
    activeTabBG.style.width = `${tab.getBoundingClientRect().width}px`;
    activeTabBG.style.height = `${tab.getBoundingClientRect().height}px`;
    activeTabBG.style.left = `${tab.offsetLeft}px`;
  }
}

// function showPattern(tab) {
//   const topologyTab = document.getElementById('topology-tab');
//   if(topologyTab.classList.contains('active')){
//     document.querySelector('html').classList.add('h-100', 'overflow-hidden');
//   } else {
//     document.querySelector('body').classList.remove('h-100', 'overflow-hidden');
//   }
// }

allTabs.forEach(function(tab) {
  setActiveTabBgSize(tab);
  // showPattern(tab);
  tab.addEventListener('shown.bs.tab', () => {
    setActiveTabBgSize(tab);
    // showPattern(tab);
  });
});

// Show navbar BG on scroll (for Hierarchy content only)
window.addEventListener('scroll', (event) => {
  if(window.scrollY == 0) {
    document.querySelector('.navbar-wrapper').classList.remove('navbar-bg');
  } else {
    document.querySelector('.navbar-wrapper').classList.add('navbar-bg');
  }
});

// Associate label with its input
const inputs = document.querySelectorAll('#hierarchy input');
inputs.forEach((input, index) => {
  input.id = `c${index + 1}`;
  input.nextElementSibling.htmlFor = input.id;
});

// Count all labels in each tree
const trees = document.querySelectorAll('.tree');
let interval;
trees.forEach((tree) => {
  treeLabels = tree.querySelectorAll('label');
  treeLabels.forEach((label, index) => {
    labelIndex = index + 1;
    // Count direct and indirect nodes
    if (label.querySelector('.all-descendant-nodes')) {
      label.querySelector('.all-descendant-nodes').innerHTML = `&#8593;&#8593; ${treeLabels.length - labelIndex}`;
    }
    // Count only direct nodes
    if (label.nextElementSibling && label.nextElementSibling.nodeName === 'UL') {
      label.querySelector('.direct-nodes').innerHTML = `&#8593; ${label.nextElementSibling.children.length}`;
    }
    // Count parent nodes
    if (label.querySelector('.parent-nodes')) {
      label.querySelector('.parent-nodes').innerHTML = `&#8593;&#8593; ${label.nextElementSibling.querySelectorAll('ul > li').length}`;
    }
    // Show node data window on hover
    const nodeData = document.querySelector('.node-data');
    label.addEventListener('mouseover', () => {
      clearInterval(interval);
      interval = null;
      nodeData.classList.remove('d-none');
      nodeData.style.top = `${label.getBoundingClientRect().top}px`;
      nodeData.style.left = `${label.getBoundingClientRect().right + 10}px`;
      // Hide all node-data card-info
      function showNodeCardInfo() {
        nodeData.querySelectorAll('.card-body').forEach((cardBody) => {
          cardBody.classList.add('d-none');
        });
        // Show relevant node-data card-info
        nodeData.querySelector('.card-header').innerHTML = label.querySelector('.text-body').innerHTML;
        if (label.querySelector('.text-body').innerHTML == 'IDAC' && label.querySelector('.badge.text-bg-danger')) {
          nodeData.querySelector('.idac-info').classList.remove('d-none');
          nodeData.querySelector('.badge.text-bg-success').classList.add('d-none');
          nodeData.querySelector('.badge.text-bg-danger').classList.remove('d-none');
        }
        else if (label.querySelector('.text-body').innerHTML == 'IDAC') {
          nodeData.querySelector('.idac-info').classList.remove('d-none');
          nodeData.querySelector('.badge.text-bg-success').classList.remove('d-none');
          nodeData.querySelector('.badge.text-bg-danger').classList.add('d-none');
        }
        else if (label.querySelector('.text-body').innerHTML == 'Site') nodeData.querySelector('.site-info').classList.remove('d-none');
        else if (label.querySelector('.text-body').innerHTML == 'Private Gateway') nodeData.querySelector('.gateway-info').classList.remove('d-none');
        else if (label.querySelector('.text-body').innerHTML == 'Global Cloud') nodeData.querySelector('.cloud-info').classList.remove('d-none');
      }
      showNodeCardInfo();
    });
    label.addEventListener('mouseout', () => {
      // Delay node-data modal before closing
      if (!interval) {
        interval = setInterval(() => {
          if (!nodeData.matches(':hover')) {
            nodeData.classList.add('d-none');
          }
        }, 100);
      }
    });
  });
});