// IFFE
(function() {
    "use strict";

    // var sections_s = document.querySelectorAll('section:not(:first-child)');
    // (function () {
    //     for (var i = 1; i < sections_s.length; i++) {
    //         sections_s[i].classList.add('hidden');
    //     }
    // })();

    var app = {
        init: function() {
            routes.init();
            sections.remove();
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
        notFirstChild: document.querySelectorAll('section:not(:first-child'),
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
        remove: function() {
            for (var i = 0; i < sections.notFirstChild.add('hidden');
        }
    }

    app.init();

}());