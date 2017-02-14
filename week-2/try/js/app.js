
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
                    // showProfile.getData();
                },

                'user-pictures' : function () {
                    // get path name and fire sections.toggle() to show section
                    var hashName = this.path;
                    // console.log(hashName);
                    sections.toggle(hashName);
                    // showPictures.getData();
                }
            });
        },

        newRoutie: function (id) {
            // call routie

            routie({
                id : function () {
                    // get path name and fire sections.toggle() to show section
                    var hashName = this.path;
                    console.log("route =" + hashName);
                    sections.toggle(hashName);
                    // showProfile.getData();
                }
            });
        }
    }

    var sections = {
        toggle: function (route) {
            // console.log('and agian');

            // get all sections and the active section by var hashName
            var allSections = document.querySelectorAll('section');

            // by hash get active Section
            var activeSection = document.getElementById(route);
            console.log(activeSection);

            // Loop through all Sections
            for (var i=0; i < allSections.length; i++) {

                // hide all Sections
                allSections[i].classList.add('hidden');
            }

            // allSections.map(function(el) {
            //     if(el != window.location.hash) {
            //         el.classList.remove('hidden');
            //     } else {
            //         el.classList.add('hidden');
            //     }
            // })

            // show active Section
            activeSection.classList.toggle('hidden');
        },

        newSection: function (routeId, imageSourceTumb) {
            var newSection = document.createElement('section');
            newSection.id = "#" + routeId;
            newSection.innerHTML = routeId;
            document.body.appendChild(newSection);

            var photoImage = document.createElement('img');
            photoImage.src = imageSourceTumb;

            routes.newRoutie(routeId);
        }
    }

    var userPicture = {
        getData: function () {
            aja()
                .url('https://api.instagram.com/v1/users/self/media/recent/?access_token=2203311158.1677ed0.0ec5196b6ce54ff3b95a2339088edee9')
                .type('jsonp')
                .cache('false')
                .on('success', function(data){

                    // store data local as string (default is Object)
                    localStorage.data = JSON.stringify(data);

                    // console.log(data);

                    for(var i = 0; i < data.data.length; i++) {


                        var routeId = data.data[i].id;
                        var routeHash = data.data[i];
                        var imageSourceTumb = data.data[i].images.thumbnail.url;

                        console.log(imageSourceTumb);
                        console.log(routeHash);


                        userPicture.createPhotoArchive(routeId, imageSourceTumb);
                    }
                })
                .on('error', function () {
                    console.log('error!');
                })

                // Go! Aja!
                .go();
        },

        createPhotoArchive: function (routeId, imageSourceTumb) {
            var photoArchive = document.getElementById('user-pictures');
            var photoCont = document.createElement('a');
            var photoImage = document.createElement('img');

            photoImage.src = imageSourceTumb;
            photoCont.href = "#" + routeId;
            // photoCont.innerHTML = routeId;
            photoCont.appendChild(photoImage);
            photoArchive.appendChild(photoCont);

            sections.newSection(routeId, imageSourceTumb);
        }
    }

    userPicture.getData();

    app.init();

})();
