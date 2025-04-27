// Initialize and add the map
let map;

// function getStoredTheme() {
//   const theme = document.documentElement.getAttribute('data-bs-theme');
//   if (theme === 'dark') return toggleDarkMode();
//   if (theme === 'light') return initMap();
//   if (theme === 'auto') return ColorScheme.FOLLOW_SYSTEM
// };

// const observer = new MutationObserver(() => {
//   getStoredTheme();
// });

// observer.observe(document.querySelector("html"), {
//   attributes: true
// });

async function initMap() {
  // The location of Kansas
  const position = { lat: 39.1137, lng: -98.0000 };

  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  map = new Map(document.getElementById("map"), {
    zoom: 4,
    minZoom: 4,
    center: position,
    disableDefaultUI: true,
    options: {
      gestureHandling: 'greedy'
    },
    mapId: "roadmap",
    mapTypeControlOptions: {
      mapTypeIds: ["roadmap", "dark_mode"],
    },
  });

  // Custom dark mode map theme (from https://mapstyle.withgoogle.com)
  let styledMapType = new google.maps.StyledMapType(
    [
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#212121"
          }
        ]
      },
      {
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#212121"
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "administrative.country",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "administrative.locality",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#bdbdbd"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#181818"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#1b1b1b"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#2c2c2c"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#8a8a8a"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#373737"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#3c3c3c"
          }
        ]
      },
      {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#4e4e4e"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#000000"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#3d3d3d"
          }
        ]
      }
    ],
    { name: "Dark Mode" },
  );

  map.mapTypes.set("dark_mode", styledMapType);
  map.setMapTypeId("dark_mode");

  // Toggle light/dark theme modes
  function switchMode() {
    if (map.mapTypeId === "dark_mode") {
      map.setMapTypeId("roadmap");
    } else {
      map.setMapTypeId("dark_mode");
    }
  }

  // Add listener to theme button
  document.getElementById("bd-theme").addEventListener("click", switchMode);

  // Global Cloud marker icon
  const globalCloudMarker = document.createElement("div");
  globalCloudMarker.className = "global-cloud-marker text-custom-color";

  // Global
  const markerCenter = new AdvancedMarkerElement ({
    position: position,
    map: map,
    title: 'Kansas',
    content: globalCloudMarker,
    // gmpClickable: true,
  });

  // Show node data window on hover
  const nodeData = document.querySelector('.node-data');
  function showNodeData(event) {
    // Store title in a temporary attribute (in order to hide the title on hover)
    event.target.parentElement.setAttribute('org_title', event.target.parentElement.getAttribute('title'));
    clearInterval(interval);
    interval = null;
    nodeData.classList.remove('d-none');
    nodeData.style.top = `${event.target.getBoundingClientRect().top}px`;
    nodeData.style.left = `${event.target.getBoundingClientRect().right + 10}px`;
    // Hide all node-data card-info
    function showNodeCardInfo() {
      nodeData.querySelectorAll('.card-body').forEach((cardBody) => {
        cardBody.classList.add('d-none');
      });
      // Show relevant node-data card-info
      nodeData.querySelector('.card-header').innerHTML = event.target.parentElement.getAttribute('title');
      // if (event.target.content.querySelector('.text-body').innerHTML == 'IDAC' && event.target.content.querySelector('.badge.text-bg-danger')) {
      //   nodeData.querySelector('.idac-info').classList.remove('d-none');
      //   nodeData.querySelector('.badge.text-bg-success').classList.add('d-none');
      //   nodeData.querySelector('.badge.text-bg-danger').classList.remove('d-none');
      // }
      // else if (event.target.content.querySelector('.text-body').innerHTML == 'IDAC') {
      //   nodeData.querySelector('.idac-info').classList.remove('d-none');
      //   nodeData.querySelector('.badge.text-bg-success').classList.remove('d-none');
      //   nodeData.querySelector('.badge.text-bg-danger').classList.add('d-none');
      // }
      if (event.target.classList.contains('site-marker')) nodeData.querySelector('.site-info').classList.remove('d-none');
      else if (event.target.classList.contains('gateway-marker')) nodeData.querySelector('.gateway-info').classList.remove('d-none');
      else if (event.target.classList.contains('global-cloud-marker')) nodeData.querySelector('.cloud-info').classList.remove('d-none');
    }
    showNodeCardInfo();
    // Hide title attribute on hover
    event.target.parentElement.setAttribute('title', '');
  };
  function hideNodeData(event) {
    // Retrieve the title from the temporary attribute
    event.target.parentElement.setAttribute('title', event.target.parentElement.getAttribute('org_title'));
    // Delay node-data modal before closing
    if (!interval) {
      interval = setInterval(() => {
        if (!nodeData.matches(':hover')) {
          nodeData.classList.add('d-none');
        }
      }, 100);
    }
  };

  // Set up the info window
  markerCenter.content.addEventListener('mouseover', showNodeData);
  markerCenter.content.addEventListener('mouseout', hideNodeData);

  // Location markers
  const locations = [
    {
      name: 'San Diego',
      lat: 32.7157,
      lng: -117.1611,
      flightPlan: [{ lat: 32.7157, lng: -117.1611 }, { lat: 39.1137, lng: -98.0000 }],
    },
    {
      name: 'San Antonio',
      lat: 29.4241,
      lng: -98.4936,
      flightPlan: [{ lat: 29.4241, lng: -98.4936 }, { lat: 39.1137, lng: -98.0000 }],
    },
    {
      name: 'California',
      lat: 36.7783,
      lng: -119.4179,
      flightPlan: [{ lat: 36.7783, lng: -119.4179 }, { lat: 39.1137, lng: -98.0000 }],
    },
    {
      name: 'Seattle',
      lat: 47.6062,
      lng: -122.3321,
      flightPlan: [{ lat: 47.6062, lng: -122.3321 }, { lat: 39.1137, lng: -98.0000 }],
    },
    {
      name: 'North Dakota',
      lat: 47.5289,
      lng: -100.7840,
      flightPlan: [{ lat: 47.5289, lng: -100.7840 }, { lat: 39.1137, lng: -98.0000 }],
    },
    {
      name: 'Montana',
      lat: 46.8797,
      lng: -110.3626,
      flightPlan: [{ lat: 46.8797, lng: -110.3626 }, { lat: 39.1137, lng: -98.0000 }],
    },
    {
      name: 'Minneapolis',
      lat: 44.9778,
      lng: -93.2650,
      flightPlan: [{ lat: 44.9778, lng: -93.2650 }, { lat: 39.1137, lng: -98.0000 }],
    },
    {
      name: 'Montreal',
      lat: 45.5017,
      lng: -73.5673,
      flightPlan: [{ lat: 45.5017, lng: -73.5673 }, { lat: 43.5945, lng: -83.8889 }, { lat: 39.1137, lng: -98.0000 }], // Example with a stop in Bay City
      stopMarker: {lat: 43.5945, lng: -83.8889, name: 'Bay City'} // marker for the stop
    },
    {
      name: 'New York',
      lat: 40.7128,
      lng: -74.0060,
      flightPlan: [{ lat: 40.7128, lng: -74.0060 }, { lat: 39.1137, lng: -98.0000 }],
    },
    {
      name: 'North Carolina',
      lat: 35.6301,
      lng: -79.8064,
      flightPlan: [{ lat: 35.6301, lng: -79.8064 }, { lat: 39.1137, lng: -98.0000 }],
    },
    {
      name: 'Miami',
      lat: 25.7617,
      lng: -80.1918,
      flightPlan: [{ lat: 25.7617, lng: -80.1918 }, { lat: 32.3182, lng: -86.9023 }, { lat: 39.1137, lng: -98.0000 }], // Example with a stop in Alabama
      stopMarker: {lat: 32.3182, lng: -86.9023, name: 'Alabama'} // marker for the stop
    },
  ];

  locations.forEach((location) => {
    // Site marker icon
    const siteMarker = document.createElement("div");
    siteMarker.className = "site-marker text-primary";
    // Gateway marker icon
    const gatewayMarker = document.createElement("div");
    gatewayMarker.className = "gateway-marker text-info";

    const marker = new AdvancedMarkerElement ({
      position: { lat: location.lat, lng: location.lng },
      map: map,
      title: location.name,
      content: siteMarker,
      // gmpClickable: true,
    });

    // Set up the info window
    marker.content.addEventListener('mouseover', showNodeData);
    marker.content.addEventListener('mouseout', hideNodeData);

    const flightPath = new google.maps.Polyline({
      path: location.flightPlan,
      geodesic: true,
      strokeColor: '#0d6efd', // #4285F4 (previous color)
      strokeOpacity: 1.0,
      strokeWeight: 2,
      map: map
    });

    if(location.stopMarker){
      const stopMarker = new AdvancedMarkerElement ({
        position: { lat: location.stopMarker.lat, lng: location.stopMarker.lng },
        map: map,
        title: location.stopMarker.name,
        content: gatewayMarker,
        // gmpClickable: true,
      });
      // Set up the info window
      stopMarker.content.addEventListener('mouseover', showNodeData);
      stopMarker.content.addEventListener('mouseout', hideNodeData);
    }

  });
}

initMap();