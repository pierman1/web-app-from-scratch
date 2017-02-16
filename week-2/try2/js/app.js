(function () {
    // Structures
    var app = {
        init: function() {
            // call routes
            request.init();
        }
    }

    var request = {
        init: function () {
            aja()
                .url('https://www.cannabisreports.com/api/v1.0/strains/')
                .type('json')
                .cache('false')
                .on('success', function(data){

                    // store data local as string (default is Object)
                    localStorage.data = JSON.stringify(data.data);

                    var strains = data.data;

                    // showProfile with parameter data
                    buildLinks.build(strains);


                })
                .on('error', function () {
                    console.log('error!');
                })

                // Go! Aja!
                .go();
        }
    }

    var buildLinks = {
        build: function (strains) {
            console.log(strains);

            console.log(strains.length);

            for (var i=0; i<strains.length; i++) {
                buildLinks.createLink(strains[i].name, strains[i].image, strains[i].seedCompany.name);
            }
        },

        createLink: function (strainName, strainImageUrl, strainCompany) {
            var newStrainLink = document.createElement('a');
            var strainHash = '#' + strainName.replace(/\s+/g, '');
            newStrainLink.href = strainHash;

            var newStrainSection = document.createElement('div');
            var newStrainSectionTitel = document.createElement('h2');
            var newStrainSectionCompany = document.createElement('li');

            console.log(strainHash)

            newStrainSectionTitel.innerHTML = strainName;
            newStrainSectionCompany.innerHTML = strainCompany;

            document.body.appendChild(newStrainLink);
            newStrainLink.appendChild(newStrainSection);
            newStrainSection.appendChild(newStrainSectionTitel);
            newStrainSection.appendChild(newStrainSectionCompany);

            routes.newRoutie(strainName);
        }
    }

    var routes = {
        newRoutie: function (id) {
            // call routie

            console.log('try rout');

            routie({
                'users': function (id) {
                 console.log('routie!!!');
                }
            });
        }
    }


    var sections = {
        buildSections: function (id) {
            // call routie
            console.log('buildSections');
        }
    }

    app.init();

})();