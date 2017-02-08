 // IFFE
(function () {

    "use strict";

    var app = {
        init: function() {
            routes.init();
        }
    };

    var routes = {
        init: function() {
            var location = window.location;
            // Object that stores all location data
            var oldHash = location.hash;
            var newHash = oldHash;
            if(!newHash) {
                newHash = "#home";
            }

            // console.log(oldHash);

            // Check for changes in hash, then run this function
            window.onhashchange = function() {
                oldHash = newHash;
                newHash = location.hash;

                var route = {
                    old: oldHash,
                    new: newHash
                };

                sections.toggle(route);
            }
        }
    };

    var sections = {
        toggle: function(route) {
            console.log(route.old);
            console.log(route.new);

            var oldView = document.querySelector(route.old);
            var newView = document.querySelector(route.new);
            console.log(oldView);

            oldView.classList.add('hidden');
            newView.classList.remove('hidden');
        }
    };

    app.init();

    }()
);

 // Roep vanuit app.init() routes.init() aan. In routes.init() zet je een ‘hashchange’ eventlistener.
 // De eventlistener verwijst naar sections.toggle(route) met de route die je hebt aangeklikt als parameter. Let op de scope!
 // In de toggle functie zorg je ervoor dat de gewenste sectie wordt getoond en alle andere secties (in dit geval één) worden verborgen