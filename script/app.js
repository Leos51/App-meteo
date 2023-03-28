//  Texte en typedJS 
 let typed = new Typed('.element', {
  strings: [
    'Bonjour!!',
    "J'ai tout mis sur une seule page.",
    'La meteo est a droite!',
    'Et le graphique ^1000 se trouve plus bas.'
  ],
  typeSpeed: 40,
  startDelay: 1000,
  showCursor: true,
  cursorChar: '|',
  autoInsertCss: true
 });





let meteoContenair = document.querySelector('.meteoWidget');
let iconBox = meteoContenair.querySelector('.iconContainer');
let description = meteoContenair.querySelector('.descriptionWeather');
let cityHtml = meteoContenair.querySelector('.city');
let tempContainer = meteoContenair.querySelector ('.temp');
let currentPos = document.querySelector(".currentPosition")
let form = document.querySelector('form');


/* Evemenent de soumission de l'entrée 'ville' pour la méteo */
form.addEventListener('submit', (e) => {
  e.preventDefault(); 
  let input = document.querySelector('input');
  const urlCity = `http://api.openweathermap.org/data/2.5/weather?q=${input.value}&APPID=b4c9af6bbf5b4c25a0a81708d9412e67&units=metric`;
  if(input.value === ""){
    console.log('Saisir la ville');
  }else{
    importAxios(urlCity);

  }
})
 
  
  /* Récuperation de la position de l'utilisateur en cas de clic sur le bouton 'position' */
  currentPos.addEventListener('click', () => {
    
    let options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    
    function success(pos) {
      let crd = pos.coords;
      console.log('Votre position actuelle est :');
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude : ${crd.longitude}`);
      console.log(`La précision est de ${crd.accuracy} mètres.`);
      const urlCurrentPos = `http://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&limit=5&APPID=b4c9af6bbf5b4c25a0a81708d9412e67&units=metric`;
      importAxios(urlCurrentPos);
      
    }
    
    function error(err) {
      console.warn(`ERREUR (${err.code}): ${err.message}`);
    }
    
    navigator.geolocation.getCurrentPosition(success, error, options);
      

});

/*-- Import des données meteo --*/
function importAxios(urlAxios){
  axios.get(urlAxios)
    .then(response =>{
      let icone=response.data.weather[0].icon;
      console.log(response.data.weather[0].icon)
      cityHtml.textContent = response.data.name;
      description.textContent = response.data.weather[0].description;
      tempContainer.textContent = response.data.main.temp;
      iconBox.innerHTML = `<img src='http://openweathermap.org/img/w/${icone}.png'>`;
  
      
    })
  .catch(error =>{
    console.log(error.message)
  })

}


// Debut du graphique

let urlBTI = 'https://api.coindesk.com/v1/bpi/historical/close.json?start=2022-06-01&end=2023-03-19'

axios.get(urlBTI)
.then(response =>{
  let dates = Object.keys(response.data.bpi)
  let prices = Object.values(response.data.bpi)

  
  new Chart("bpiChart", {
    type: "line",
    data: {
      labels: dates,
      datasets: [{
        label: 'Prix du Bitcoin',
        data: prices,
        borderColor: "red",
        fill: false,
        // tension :0.1,
      }]
    },

  });


})
.catch(error =>{
  console.log(error.message)
})
