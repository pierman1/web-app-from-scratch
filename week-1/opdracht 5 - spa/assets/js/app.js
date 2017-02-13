// IFFE
(function() {
    // use the Strict mode
    "use strict";

    // App object
    var app = {
        init: function() {
            routes.init();
            sections.remove();
        }
    };

    // Routes object
    var routes = {
        init: function(){
            // Get hash
            var location = window.location;
            var oldHash = location.hash;
            var newHash = oldHash;

            // When hash is empty show default section
            if(!newHash) {
                newHash = '#startScreen';
            }

            // On hash change function
            window.onhashchange = function(){
                oldHash = newHash;
                newHash = location.hash;

                var route = {
                    old: oldHash,
                    new: newHash
                };

                sections.toggle(route);
            };
        }
    };

    // Sections Object
    var sections = {
        // notFirstChild: document.querySelectorAll('section:not(:first-child'),

        toggle: function (route) {
            // Credits to Dave Bitter
            var sectionList = document.querySelectorAll("section");

            sectionList.forEach(function (sec) {
                if (location.hash === "#" + sec.id) {
                    sec.classList.remove("hidden");
                } else {
                    sec.classList.add("hidden");
                }
            });
        },

        // remove: function() {
        //     for (var i = 0; i < sections.notFirstChild.add('hidden');
        // }
    }
    // sections.remove();
    // Run App init - method
    app.init();

}());