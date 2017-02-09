// IFFE
(function() {
    "use strict";
    var sections_s = document.querySelectorAll('section:not(:first-child)');
    // iffe
    (function () {
        for (var i = 1; i < sections_s.length; i++) {
            sections_s[i].classList.add('hidden');
        }
    })();
    var app = {
        init: function() {
            routes.init();
        }
    };
    var routes = {
        init: function(){
            var location = window.location;
            var oldHash = location.hash;
            var newHash = oldHash;
            if(!newHash) {
                newHash = '#home';
            }
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
    var sections = {
        toggle: function (route) {
            // Credits to Dave Bitter
            var sectionList = document.querySelectorAll("section");
            sectionList.forEach(function (sec) {
                console.log(sec.id);
                if (location.hash === "#" + sec.id) {
                    sec.classList.remove("hidden");
                } else {
                    sec.classList.add("hidden");
                }
            });
        }
    }
    app.init();
}());