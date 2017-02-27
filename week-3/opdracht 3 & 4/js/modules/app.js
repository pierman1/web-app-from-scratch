'use strict';

(function () {

    // Structures
    var app = {
        init: function () {
            // Fire routes.init();
            routes.init();
            console.log('init fired');
        }
    }

    var routes = {
        init: function () {
            // set hash to #user-search
            window.location.hash = '#about';

            // call routie
            routie({
                'about' : function () {
                    // get path name and fire sections.toggle() to show section
                    var hashName = this.path;
                    sections.toggle(hashName);
                },

                'strains' : function () {
                    // get path name and fire sections.toggle() to show section
                    var hashName = this.path;
                    // get strainList data
                    // strainsList.getData();
                    request.list('https://www.cannabisreports.com/api/v1.0/strains/');

                    sections.toggle(hashName);
                },

                'search' : function () {
                    // get path name and fire sections.toggle() to show section
                    var hashName = this.path;
                    //  get strainList data
                    // strainsList.getData();

                    var inputButton = document.querySelector('input[type="button"]');

                    inputButton.addEventListener('click', function() {
                        var userInput = document.querySelector('input[type="text"]').value;
                        console.log(userInput);
                        request.list('https://www.cannabisreports.com/api/v1.0/strains/search/', userInput);
                    });
                },

                'strains/:id' : function (strainId) {
                    // get path name and fire sections.toggle() to show section
                    var hashName = this.path;
                    // get StrainDtail data
                    // strainDetail.getData(strainId);

                    request.detail('https://www.cannabisreports.com/api/v1.0/strains/', strainId);
                    sections.toggle('strain-detail');
                }
            });
        }
    }

    var request = {
        list: function (url, userInput) {
            // if userInput is undefined (on search page)
            if(!userInput) {
                // call data
                aja()
                    .url(url + '?=972ea5f706ca0dc6dbe17db99a834085804ee594')
                    .cache(false)
                    .type('jsonp')
                    .cache('false')
                    .on('success', function (data) {
                        console.log(data);
                        getData.list(data);
                        //sections toggle
                    })

                    .go();

            } else {
                // call data
                aja()
                    .url(url + userInput + '?=972ea5f706ca0dc6dbe17db99a834085804ee594')
                    .cache(false)
                    .type('jsonp')
                    .cache('false')
                    .on('success', function (data) {
                        console.log(data);
                        getData.list(data);
                        //sections toggle
                    })

                    .go();
            }
        },

        detail: function (url, strainName) {
            // call data
            aja()
                .url(url + strainName +'?=972ea5f706ca0dc6dbe17db99a834085804ee594')
                .cache(false)
                .type('jsonp')
                .cache('false')
                .on('success', function(data){
                    console.log(data);
                    getData.detail(data);
                    //sections toggle
                })

                .go();
        }
    }

    var getData = {
        list: function (data) {
            // declare target parent for transparancy js
            var strains = document.querySelector('.strains-list');

            var directives = {

                strainLink: {
                    href: function (params) {
                        return '#strains/' + this.ucpc;
                    },

                },

                strainTitle: {
                    text: function (params) {
                        return this.name;
                    }

                }

            }

            // call Transparency
            Transparency.render(strains, data.data, directives);
        },
        
        detail: function (data) {
            // declare target parent for transparency js
            var strain = document.querySelector('#strain-detail');

            var directives = {

                strainImage: {
                    src: function (params) {
                        return this.image;
                    }

                },

                strainTitle: {
                    text: function (params) {
                        return this.name;
                    }

                },

                strainQr: {
                    src: function (params) {
                        return this.qr;
                    }

                }

            };

            // call Transparency
            Transparency.render(strain, data.data, directives);
        }
    }

    var sections = {
        toggle: function (activeSection) {
            return activeSection;
        }
    }

    app.init();

})();