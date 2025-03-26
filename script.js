let url = "https://api.open-meteo.com/v1/forecast?latitude=45.404&longitude=4.2709&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,precipitation&current=temperature_2m,weather_code,precipitation,wind_speed_10m,wind_direction_10m,is_day&timezone=Europe%2FBerlin"
let dateContainer = document.getElementById("dateContainer");
let donnees = [];
let codes = [
    {id: 0, status: "Ciel clair", image: "assets/images/icons/soleil.png", background:"assets/images/pictures/sun.jpg"},
    {id: 1, status: "Généralement clair", image: "assets/images/icons/partiellement_nuageux.png", background:"assets/images/pictures/sun.jpg"},
    {id: 2, status: "Partiellement nuageux", image: "assets/images/icons/partiellement_nuageux.png", background:"assets/images/pictures/suncloud.jpg"},
    {id: 3, status: "Couvert", image: "assets/images/icons/partiellement_nuageux.png", background:"assets/images/pictures/cloud.jpg"},
    {id: 45, status: "Brouillard", image: "assets/images/icons/nuageux.png", background:"assets/images/pictures/cloud.jpg"},
    {id: 48, status: "Dépot de givre", image: "assets/images/icons/nuageux.png", background:"assets/images/pictures/cloud.jpg"},
    {id: 51, status: "Bruine légère", image: "assets/images/icons/nuageux.png", background:"assets/images/pictures/cloud.jpg"},
    {id: 53, status: "Bruine modérée", image: "assets/images/icons/nuageux.png", background:"assets/images/pictures/cloud.jpg"},
    {id: 55, status: "Bruine dense", image: "assets/images/icons/nuageux.png", background:"assets/images/pictures/cloud.jpg"},
    {id: 56, status: "Bruine verglacante légère", image: "assets/images/icons/nuageux.png", background:"assets/images/pictures/cloud.jpg"},
    {id: 57, status: "Bruine verglacante dense", image: "assets/images/icons/nuageux.png", background:"assets/images/pictures/cloud.jpg"},
    {id: 61, status: "Pluie légère", image: "assets/images/icons/pluie.png", background:"assets/images/pictures/rain.jpg"},
    {id: 63, status: "Pluie modérée", image: "assets/images/icons/pluie.png", background:"assets/images/pictures/rain.jpg"},
    {id: 65, status: "Pluie forte", image: "assets/images/icons/pluie.png", background:"assets/images/pictures/rain.jpg"},
    {id: 66, status: "Pluie verglaçante légère", image: "assets/images/icons/pluie.png", background:"assets/images/pictures/rain.jpg"},
    {id: 67, status: "Pluie verglaçante forte", image: "assets/images/icons/pluie.png", background:"assets/images/pictures/rain.jpg"},
    {id: 77, status: "Chute de neige", image: "assets/images/icons/neige.png", background:"assets/images/pictures/snow.jpg"},
    {id: 80, status: "Averse de pluie légère", image: "assets/images/icons/pluie.png", background:"assets/images/pictures/rain.jpg"},
    {id: 81, status: "Averse de pluie modérée", image: "assets/images/icons/pluie.png", background:"assets/images/pictures/rain.jpg"},
    {id: 82, status: "Averse de pluie forte", image: "assets/images/icons/pluie.png", background:"assets/images/pictures/rain.jpg"},
    {id: 85, status: "Averse de neige légère", image: "assets/images/icons/neige.png", background:"assets/images/pictures/snow.jpg"},
    {id: 86, status: "Averse de neige forte", image: "assets/images/icons/neige.png", background:"assets/images/pictures/snow.jpg"},
    {id: 95, status: "Orage", image: "assets/images/icons/orage.png", background:"assets/images/pictures/thunder.jpg"},
    {id: 96, status: "Orage de grêle légère", image: "assets/images/icons/orage.png", background:"assets/images/pictures/thunder.jpg"},
    {id: 99, status: "Orage de grêle forte", image: "assets/images/icons/orage.png", background:"assets/images/pictures/thunder.jpg"}
]
let currentWeatherContainer = document.getElementById("currentWeatherContainer");
let jourNuitContainer = document.getElementById("jourNuitContainer");
let heuresContainer = document.getElementById("heuresContainer");
let joursContainer = document.getElementById("joursContainer");
let coordonneesContainer = document.getElementById("coordonneesContainer");
let containerGrid = document.getElementById("containerGrid")
let boussoleContainer = document.getElementById("boussoleContainer");


fetch(url)
    .then(function (reponse) {
        if (!reponse.ok) {
            throw new Error("Erreur : le fichier JSON n’a pas pu être chargé.");
        }
        console.log("Fichier json chargé");
        return reponse.json();
    })

    .then(function(data){
        donnees = data;
        console.log(donnees);
        afficherDateHeure(donnees);
        afficherTempsActuel (donnees);
        afficherJourNuit(donnees);
        afficherTemperatureHeure(donnees);
        afficherTemperatureJour (donnees);
        afficherCoordonnees(donnees);
        ajoutBackground(donnees);
        afficherVent(donnees);
    })

    .catch(function (error) {
        console.error("Erreur lors du chargement du fichier JSON: ", error);
    });

    function afficherDateHeure() {
        let day = donnees.current.time;
        let dateFormat = new Date(day);
        let dateFormatLisible = dateFormat.toLocaleDateString("fr-FR");

        let heureFormatLisible = dateFormat.toLocaleTimeString("fr-Fr", {
            hour: "2-digit",
            minute: "2-digit"
        });

        let dateContenu = `
            <div><h1>${dateFormatLisible}</h1></div>
			<div><p>${heureFormatLisible}</p></div>
        `
        dateContainer.innerHTML = dateContenu;

    };

    function afficherTempsActuel () {
        let codeActuel = donnees.current.weather_code;
        let temperatureActuel = donnees.current.temperature_2m;
        

        for (let i = 0; i < codes.length; i++ ) {
            if (codeActuel === codes[i].id) {
                let code = codes[i]

                let actuelContenu = `
            <h2>${code.status}</h2>
			<img src="${code.image}" alt="${code.status}"/>
            <h1>${temperatureActuel}°</h1>
        `
        currentWeatherContainer.innerHTML = actuelContenu;

            }
        }
    };

    function afficherJourNuit() {
        jourNuitContainer.innerHTML = `${donnees.current.is_day === 1 ? `<img src="assets/images/icons/jour.png" alt="jour"/>` : `<img src="assets/images/icons/nuit.png" alt="nuit">`}`;

    };

    function afficherTemperatureHeure() {
        let infoHeures = donnees.hourly;
        let heureActuelle = donnees.current.time;

        let indexDepart = infoHeures.time.indexOf(heureActuelle);

        let heureContenu ="";
        
        
            for (let i = indexDepart + 1; i < infoHeures.time.length; i++) {

                let day = infoHeures.time[i];
                let temperature = infoHeures.temperature_2m[i];
                let precipitation = infoHeures.precipitation[i];
                
                let dateFormat = new Date(day);
                let heureFormatLisible = dateFormat.toLocaleTimeString("fr-Fr", {
                    hour: "2-digit",
                    minute: "2-digit"
                });

                heureContenu += `
                <div class="heure-card">
                    <div class="temperature-heure"><img src="assets/images/icons/thermometre.png" alt="thermometre"><p>${temperature}°C</p></div>
				    <div class="precipitation-heure"><img src="assets/images/icons/parapluie.png" alt="parapluie"><p>${precipitation} mm</p></div>
				    <p class="heure-prevision">${heureFormatLisible}</div>
                </div>
                `
                
            }
            heuresContainer.innerHTML = heureContenu;
        
    }

    document.querySelector(".prev").addEventListener("click", () => {
        document.getElementById("heuresContainer").scrollBy({
            left: -300, // Décalage vers la gauche
            behavior: "smooth" // Défilement fluide
        });
    });

    document.querySelector(".next").addEventListener("click", () => {
        document.getElementById("heuresContainer").scrollBy({
            left: 300, // Décalage vers la droite
            behavior: "smooth" // Défilement fluide
        });
    });
    
    


    function afficherTemperatureJour () {
        let infoJours = donnees.daily;
        let jourActuel = donnees.current.time;

        //let indexDepart = infoJours.time.indexOf(jourActuel);

        let jourContenu ="";

        for (let i = 1; i < infoJours.time.length; i++) {

            let day = infoJours.time[i];
            let temperatureMax = infoJours.temperature_2m_max[i];
            let temperatureMin = infoJours.temperature_2m_min[i];
            
            let dateFormat = new Date(day);
            let dateFormatLisible = dateFormat.toLocaleDateString("fr-FR");

            let codeActuel = infoJours.weather_code[i];

            for (let i = 0; i < codes.length; i++ ) {
                if (codeActuel === codes[i].id) {
                    let code = codes[i]
    
                    jourContenu += `
                    <div class="jour-card">
                    <p class="date-jour-card">${dateFormatLisible}</p>
                    <img src="${code.image}" alt="${code.status}"/>
                    <p class="temp-max">${temperatureMax}°C</p>
                    <p class="temp-min">${temperatureMin}°C</p>
                    </div>
                    `;
                }
                
            }
            
           
        }
        joursContainer.innerHTML = jourContenu;
    }

    function afficherCoordonnees() {
        coordonneesContainer.innerHTML = `<div><p>Latitude: ${donnees.latitude}</p></div>
                                        <div><p>Longitude: ${donnees.longitude}</p></div>  `;
    }


    //fonction non terminée - a finir
    function afficherVent(){
        boussoleContainer.innerHTML = ` <div class=img-boussole>
                                            <img class="fond" src="assets/images/pictures/compass.png" alt="boussole vide">
                                            <img class="fleche" src="assets/images/pictures/compass-arrow.png" alt="fleche de la boussole">
                                        </div>
                                        <p>${donnees.current.wind_speed_10m} km/heure</p>
                                      `;

    }

    function ajoutBackground() {
        let codeActuel = donnees.current.weather_code;
        for(let i = 0; i < codes.length; i++) {
            if (codeActuel === codes[i].id) {
                let code = codes[i]

                containerGrid.style.backgroundImage = `url('${code.background}')`;
            }

        }
    }
    