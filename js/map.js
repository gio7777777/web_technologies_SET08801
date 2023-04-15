
let map;

function initMap() {
  // Define the map
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 52.5225779333693, lng: 13.412828575769664 },
    zoom: 12,
  });

  // Define the icons
  const icons = {
    italy: {
      icon: "design/italy.png",
    },
    china: {
      icon: "design/china.png",
    },
    france: {
      icon: "design/france.png",
    },
    thai: {
      icon: "design/thai.png",
    },
  };

  // Italian restaurants
  const features = [
    {
      position: new google.maps.LatLng(52.53580951487858, 13.42261148774345),
      type: "italy",
      name: "Osteria Tressanti",
      address: "",
    },
    {
      position: new google.maps.LatLng(52.51795138505175, 13.388208412165937),
      type: "italy",
      name: "Dolcini",
      address: "",
    },{
      position: new google.maps.LatLng(52.540930360670416, 13.394071905465639),
      type: "italy",
      name: "Bocca del Buon Gusto",
      address: "",
    },{
      position: new google.maps.LatLng(52.51751058330854, 13.4297521483278185),
      type: "italy",
      name: "Trattoria La Bruschetta",
      address: "",
    },{
      position: new google.maps.LatLng(52.52276446076249, 13.354220049674458),
      type: "italy",
      name: "Trattoria Fidelia",
      address: "",
    },

    //Chinese restaurants
    {
      position: new google.maps.LatLng(52.49827608394835, 13.312003552641377),
      type: "china",
      name: "Lychee",
      address: "",
    },
    {
      position: new google.maps.LatLng(52.535242034259255, 13.406430139454987),
      type: "china",
      name: "Yumchaa Heroes",
      address: "",
    },  {
      position: new google.maps.LatLng(52.52164618994886, 13.431476860890314),
      type: "china",
      name: "HuaTing China Restaurant",
      address: "",
    },  {
      position: new google.maps.LatLng(52.52877408002327, 13.387189095529303),
      type: "china",
      name: "Lucky Star",
      address: "",
    },  {
      position: new google.maps.LatLng(52.5843404088223, 13.408567215831061),
      type: "china",
      name: "Hua Li Du",
      address: "",
    },
    //French restaurants
    {
      position: new google.maps.LatLng(52.52058243849698, 13.39301757858713),
      type: "france",
      name: "Le Gourmet Galeries Lafayette",
      address: "",
    },
    {
      position: new google.maps.LatLng(52.53286301945385, 13.401961343190896),
      type: "france",
      name: "Ratatouille Berlin",
      address: "",
    },
    {
      position: new google.maps.LatLng(52.50108561772944, 13.435210201337528),
      type: "france",
      name: "Le Saint Amour",
      address: "",
    },
    {
      position: new google.maps.LatLng(52.55291174690764, 13.416421166820616),
      type: "france",
      name: "Le Midi",
      address: "",
    },
    {
      position: new google.maps.LatLng(),
      type: "france",
      name: "Lychee",
      address: "",
    },
    //thai restaurants
    {
      position: new google.maps.LatLng(52.55011169487642, 13.417446876595053),
      type: "thai",
      name: "Mai Thai",
      address: "",
    },
    {
      position: new google.maps.LatLng(52.519569954646954, 13.46443553278598),
      type: "thai",
      name: "Koi",
      address: "",
    },
    {
      position: new google.maps.LatLng(52.54992268705007, 13.371062603226362),
      type: "thai",
      name: "Dan Thai Food",
      address: "",
    },
    {
      position: new google.maps.LatLng(52.548044794054626, 13.358349608005689),
      type: "thai",
      name: "Krua Thai",
      address: "",
    },
    {
      position: new google.maps.LatLng(52.5342125966966, 13.44558424978521),
      type: "thai",
      name: "Preeda",
      address: "",
    },


   
  ];

  // Send separate API requests for each feature to get the formatted address
  features.forEach((feature) => {
    const geocodeEndpoint = "https://maps.googleapis.com/maps/api/geocode/json";
    const params = `?latlng=${feature.position.lat()},${feature.position.lng()}&key=AIzaSyBP8OcuxGfy6abmIPlVI1f3AkrkjJ9OzV0`;

    fetch(geocodeEndpoint + params)
      .then((response) => response.json())
      .then((data) => {
        feature.name = feature.name;
        feature.address = data.results[0].formatted_address;

        // Create marker
        const marker = new google.maps.Marker({
          position: feature.position,
          icon: icons[feature.type].icon,
          map: map,
        });

        // Create info window
        const infowindow = new google.maps.InfoWindow({
          content: feature.name + "-" + feature.address,
        });

        // Add event listener to show info window on marker click
        marker.addListener("click", () => {
          infowindow.open(map, marker);
        });
      })
      .catch((error) => console.log(error));
  });
}

window.initMap = initMap;
