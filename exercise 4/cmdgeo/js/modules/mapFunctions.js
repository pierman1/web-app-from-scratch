var mapFunctions = {

    // Test of GPS beschikbaar is (via geo.js) en vuur een event af
    init: function(){
        debug_message("Controleer of GPS beschikbaar is...");

        ET.addListener(gps_available, this.startInterval());
        ET.addListener(gps_unavailable, function(){debug_message('GPS is niet beschikbaar.')});

        (geo_position_js.init())?ET.fire(gps_available):ET.fire(gps_unavailable);
    },

    // Start een interval welke op basis van refresh_rate de positie updated
    startInterval: function(){
        debug_message("GPS is beschikbaar, vraag positie.");
        this.updatePosition();
        interval = self.setInterval(this.updatePosition, refresh_rate);
        ET.addListener(position_updated, this.checkLocations);
    },

    // Vraag de huidige positie aan geo.js, stel een callback in voor het resultaat
    updatePosition: function(){
        debug_message("GPS is beschikbaar, vraag positie.");
        this.updatePosition();
        interval = self.setInterval(this.updatePosition, refresh_rate);
        ET.addListener(position_updated, this.checkLocations);
    },

    // Callback functie voor het instellen van de huidige positie, vuurt een event af
    setPosition: function(){
        currentPosition = position;
        ET.fire("position_updated");
        debug_message(intervalCounter+" positie lat:"+position.coords.latitude+" long:"+position.coords.longitude);
    },


    // Controleer de locaties en verwijs naar een andere pagina als we op een locatie zijn
    checkLocations: function(){
        // Liefst buiten google maps om... maar helaas, ze hebben alle coole functies
        for (var i = 0; i < locaties.length; i++) {
            var locatie = {coords:{latitude: locaties[i][3],longitude: locaties[i][4]}};

            if(this.calculateDistance(locatie, currentPosition)<locaties[i][2]){

                // Controle of we NU op die locatie zijn, zo niet gaan we naar de betreffende page
                if(window.location!=locaties[i][1] && localStorage[locaties[i][0]]=="false"){
                    // Probeer local storage, als die bestaat incrementeer de locatie
                    try {
                        (localStorage[locaties[i][0]]=="false")?localStorage[locaties[i][0]]=1:localStorage[locaties[i][0]]++;
                    } catch(error) {
                        debug_message("Localstorage kan niet aangesproken worden: "+error);
                    }

                    // TODO: Animeer de betreffende marker

                    window.location = locaties[i][1];
                    debug_message("Speler is binnen een straal van "+ locaties[i][2] +" meter van "+locaties[i][0]);
                }
            }
        }
    },

    // Bereken het verchil in meters tussen twee punten
    calculateDistance: function() {
        var pos1 = new google.maps.LatLng(p1.coords.latitude, p1.coords.longitude);
        var pos2 = new google.maps.LatLng(p2.coords.latitude, p2.coords.longitude);
        return Math.round(google.maps.geometry.spherical.computeDistanceBetween(pos1, pos2), 0);
    }

}

export {
    mapFunctions;
};

