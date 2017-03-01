'use strict';

(function () {

    // Structures
    var config = {
        loaderEl: document.querySelector('.loader'),
        placeholder:'https://www.cannabisreports.com/images/strains/no_image.png',
        token: '972ea5f706ca0dc6dbe17db99a834085804ee594',
        strainsUrl: 'https://www.cannabisreports.com/api/v1.0/strains/',
        searchUrl: 'https://www.cannabisreports.com/api/v1.0/strains/search/',
        strainUrl:'https://www.cannabisreports.com/api/v1.0/strains/',
        strainsWithImage: []
    }
    var store = {
        list:{}
    }

    var app = {
        init: function () {

            // Fire routes.init();
            routes.init();
            filter.init();
        }
    }

    var routes = {
        init: function () {
            // set hash to #about
            window.location.hash = '#about';

            // call routie
            routie({
                'about' : function () {

                    // toggle about section
                    sections.toggle('about');

                },

                'strains' : function () {
                    request.list(config.strainsUrl);
                },

                'search' : function () {

                    // get path name and fire sections.toggle() to show section
                    var hashName = this.path;

                    sections.toggle(hashName);

                    var inputButton = document.querySelector('input[type="button"]');

                    inputButton.addEventListener('click', function() {

                        var userInput = document.querySelector('input[type="text"]').value;
                        request.list(config.searchUrl, userInput, false);

                    });
                },

                'strains/:id' : function (strainId) {

                    // get path name and fire sections.toggle() to show section
                    var hashName = this.path;
                    // get StrainDtail data
                    // strainDetail.renderData(strainId);

                    request.detail(config.strainUrl, strainId);
                    // sections.toggle('strain-detail');


                }
            });
        }
    }

    var filter = {
        init:function () {
            var filterButton = document.querySelector('.strains-list__image-filter');
            filterButton.addEventListener('click', function(){
                request.list(config.strainsUrl, false, true);
            });
        },

        hasImage: function (object) {
            config.strainsWithImage.push(object);
            return object.image != config.placeholder;
        }
    }

    var request = {

        list: function (url, userInput, filtered) {

            // if userInput is undefined (on search page)
            if(!userInput && !filtered) {

                // show loader
                loader.show();

                // call data
                aja()
                    .url(url + '?=' + config.token)
                    .cache(false)
                    .type('jsonp')
                    .cache('false')
                    .on('success', function (data) {
                        console.log(data);
                        // map data.data to data

                        renderData.list(data.data, 'strains');
                        //sections toggle
                        store.list = data.data;
                    })

                    .go();

            }
            else if (filtered){

                // show loader
                loader.show();

                var filteredData = store.list.filter(filter.hasImage);
                renderData.list(filteredData, 'strains');
            }
                
            else {
                // show loader
                loader.show();

                document.querySelector('.strains-list').classList.remove('hidden');

                // call data
                aja()
                    .url(url + userInput + '?=' + config.token)
                    .cache(false)
                    .type('jsonp')
                    .cache('false')
                    .on('success', function (data) {
                        renderData.list(data.data, 'search');
                        //sections toggle
                    })

                    .go();
            }
        },

        detail: function (url, strainName) {
            // show loader
            loader.show();
            
            // call data
            aja()
                .url(url + strainName +'?=' + config.token)
                .cache(false)
                .type('jsonp')
                .cache('false')
                .on('success', function(data){
                    renderData.detail(data.data);
                    //sections toggle
                })

                .go();
        }
    }

    var renderData = {
        list: function (data, parentElement) {
            // declare target parent for transparancy js

            // var strains = document.querySelector('.strains-list');
            var strains = document.querySelector('#' + parentElement + '> .strains-list');

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
            Transparency.render(strains, data, directives);

            // call sections.toggle() to show activeSection and hide other sections

            sections.toggle(window.location.hash.substr(1));
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
            Transparency.render(strain, data, directives);

            sections.toggle('strain-detail');
        }
    }

    var sections = {

        toggle: function (activeSection) {

            // hide all sections by setting hidden class
            var sections = document.querySelectorAll('section');

            // sections.classList.add('hidden');

            sections.forEach(function(section) {

                section.classList.add('hidden');
            });

            // hide loader

            if(activeSection === 'search' || activeSection === 'about' || activeSection === 'strains' || activeSection === 'strain-detail') {
                loader.hide();

            } else {
                loader.show();
            }

            // show active section by removing hidden class
            document.getElementById(activeSection).classList.remove('hidden');
        }
    }

    var loader = {
        show: function () {
            config.loaderEl.classList.remove('hidden');
        },

        hide: function () {
            config.loaderEl.classList.add('hidden');
        }
    }

    app.init();

})();