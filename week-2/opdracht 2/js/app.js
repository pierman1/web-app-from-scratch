
// IFFE
(function () {

    // Strict mode
    'use strict';

    // Structures
    var app = {
        init: function() {
            // call routes
            routes.init();
        }
    }

    var routes = {
        init: function () {

            // set hash to #user-search
            window.location.hash = '#user-profile';

            // call routie
            routie({
                'user-profile' : function () {
                   // get path name and fire sections.toggle() to show section
                   var hashName = this.path;
                   // console.log(hashName);
                   sections.toggle(hashName);
                   showProfile.getData();
                },

                'user-pictures' : function () {
                    // get path name and fire sections.toggle() to show section
                    var hashName = this.path;
                    // console.log(hashName);
                    sections.toggle(hashName);
                    showPictures.getData();
                }
            });

            // sections.toggle(route);
        },

        newRoute: function (titel) {
            console.log('newRoute');

            var body = document.body;
            var nav = document.getElementById('picture-nav');

            var routeSection = document.createElement('section');


            var routeNavItem = document.createElement('a');
            routeNavItem.innerHTML = titel;


            routeNavItem.href = "#" + titel;

            body.appendChild(routeSection);
            nav.appendChild(routeNavItem);

            routes.newRoutie(titel);
        },

        newRoutie: function (id) {
            // call routie
            routie({
                id : function () {
                    // get path name and fire sections.toggle() to show section
                    var hashName = this.path;
                    // console.log(hashName);
                    sections.toggle(hashName);
                    showProfile.getData();
                }
            });
        }
    }

    var sections = {
        toggle: function (route) {
            // get all sections and the active section by var hashName
            var allSections = document.querySelectorAll('section');

            // by hash get active Section
            var activeSection = document.getElementById(route);

            // log all Sections
            // console.log(allSections);


            // Loop through all Sections
            for (var i=0; i < allSections.length; i++) {

                // hide all Sections
                allSections[i].classList.add('hidden');
            }

            // show active Section
            activeSection.classList.toggle('hidden');
        }
    }

    // showProfile
    var showProfile = {
        getData: function () {

            // Used aja to do the Ajax call to Instagram
            aja()
                .url('https://api.instagram.com/v1/users/self/?access_token=2203311158.1677ed0.0ec5196b6ce54ff3b95a2339088edee9')
                .type('jsonp')
                .cache('false')
                .on('success', function(data){

                    // store data local as string (default is Object)
                    localStorage.data = JSON.stringify(data);

                    // showProfile with parameter data
                    showProfile.showData(data);

                })
                .on('error', function () {
                    console.log('error!');
                })

                // Go! Aja!
                .go();
        },

        showData: function (data) {

            var username = document.getElementById('user-username');
            var usernameId = document.getElementById('user-userID');

            // show data in html
            username.innerHTML = "Username: " + data.data.full_name;
            usernameId.innerHTML = "Username: " + data.data.id;
        }
    }

    // call getData method inside showProfile object
    // showProfile.getData();

    var showPictures = {
        getData: function () {
            console.log('getting data');
            aja()
                .url('https://api.instagram.com/v1/users/self/media/recent/?access_token=2203311158.1677ed0.0ec5196b6ce54ff3b95a2339088edee9')
                .type('jsonp')
                .cache('false')
                .on('success', function(data){

                    // store data local as string (default is Object)
                    localStorage.data = JSON.stringify(data);

                    console.log(data);
                    showPictures.showData(data.data);


                })
                .on('error', function () {
                    console.log('error!');
                })

                // Go! Aja!
                .go();
        },

        showData: function (data) {

            for(var i=0; i < data.length; i++ ) {
                var pictureTitle = data[i].id ;
                var pictureImage = data[i].images.standard_resolution.url;

                showPictures.addElement(pictureTitle, pictureImage);

                routes.newRoute(pictureTitle);
            }
        },

        addElement: function (pictureTitle, pictureImage) {
            var pictureSection = document.getElementById('user-pictures');


            var pictureBox = document.createElement('section');
            var pictureTitleCont = document.createElement('h3');
            var pictureImageCont = document.createElement('img');
            document.body.appendChild(pictureBox);
            pictureBox.appendChild(pictureTitleCont);
            pictureBox.appendChild(pictureImageCont);
            pictureBox.id = '#' + pictureTitle;

            pictureTitleCont.innerHTML = pictureTitle;
            pictureImageCont.src = pictureImage;

            // pictureBox.classList.add('hidden');
        }
    }


    app.init();

})();


// Opdracht 2.
// Routie.js of andere router library implementeren
//
// In deze opdracht bouw je voort op de code van opdracht 5 uit week 1. In die opdracht heb je een hash event
// gebruikt om te kunnen navigeren tussen verschillende secties op je pagina.
//
// Pas in de HTML je navigatie items aan t.b.v. de door jou gekozen API
// Verwijder de sectie met best practices.
// Voeg een sectie toe waarin je een lijst met items uit de API gaat tonen
// Vervang het hash event met de functionaliteit van routie.js (http://projects.jga.me/routie/) of een vergelijkbare
// JavaScript router (http://microjs.com/#router). Zorg ervoor dat je met de router kan navigeren navigeren naar de
// verschillende secties.
// Zorg ervoor dat je met behulp van de router kan doorlinken naar detail sections van de items uit de lijst met items
// opgehaald uit de API.
