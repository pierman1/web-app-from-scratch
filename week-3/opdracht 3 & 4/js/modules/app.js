'use strict';

(function () {

    // Structures
    var app = {
        init: function () {

            // Fire routes.init();
            routes.init();
        }
    }
    var routes = {

        init: function () {
            // set hash to #user-search
            // window.location.hash = '#strains';

            // call routie
            routie({
                'about' : function () {

                    // get path name and fire sections.toggle() to show section
                    var hashName = this.path;
                    sections.toggle('about');
                },

                'strains' : function () {

                    // get path name and fire sections.toggle() to show section
                    var hashName = this.path;
                    request.list('https://www.cannabisreports.com/api/v1.0/strains/');

                    // onclick
                    filterStrains.onClick();
                },

                'search' : function () {

                    // get path name and fire sections.toggle() to show section
                    var hashName = this.path;
                    //  get strainList data
                    // strainsList.renderData();
                    sections.toggle(hashName);

                    var inputButton = document.querySelector('input[type="button"]');

                    inputButton.addEventListener('click', function() {

                        var userInput = document.querySelector('input[type="text"]').value;
                        console.log(userInput);
                        request.list('https://www.cannabisreports.com/api/v1.0/strains/search/', userInput, false);
                    });
                },

                'strains/:id' : function (strainId) {

                    // get path name and fire sections.toggle() to show section
                    var hashName = this.path;
                    // get StrainDtail data
                    // strainDetail.renderData(strainId);

                    request.detail('https://www.cannabisreports.com/api/v1.0/strains/', strainId);
                    // sections.toggle('strain-detail');
                }
            });
        }
    }

    var filterStrains = {
        onClick: function(){
            document.querySelector('.strains-list__image-filter').addEventListener('click', function(){
                request.list('https://www.cannabisreports.com/api/v1.0/strains/', false, true);
            })
        }

    }

    var request = {

        list: function (url, userInput, filtered) {
            // if userInput is undefined (on search page)

            if(!userInput && !filtered) {
                // call data
                aja()
                    .url(url + '?=972ea5f706ca0dc6dbe17db99a834085804ee594')
                    .cache(false)
                    .type('jsonp')
                    .cache('false')
                    .on('success', function (data) {
                        console.log('!userinput');
                        console.log(data);
                        renderData.list(data);
                        //sections toggle
                    })

                    .go();

            } else if (filtered){
                // call data
                aja()
                    .url(url + '?=972ea5f706ca0dc6dbe17db99a834085804ee594')
                    .cache(false)
                    .type('jsonp')
                    .cache('false')
                    .on('success', function (data) {
                        var strainsWithImage = [];

                        function hasImage(object) {
                            console.log(object);
                            console.log(object.image != 'https://www.cannabisreports.com/images/strains/no_image.png');
                            strainsWithImage.push(object);

                            return object.image != 'https://www.cannabisreports.com/images/strains/no_image.png';
                        }
                        var data = data.data;

                        var filteredData = data.filter(hasImage);

                        var dataObj= { data: filteredData};
                        console.log(dataObj);
                        console.log(filteredData);

                        renderData.list(dataObj);
                    })

                    .go();
            }
            else {
                // call data
                aja()
                    .url(url + userInput + '?=972ea5f706ca0dc6dbe17db99a834085804ee594')
                    .cache(false)
                    .type('jsonp')
                    .cache('false')
                    .on('success', function (data) {
                        console.log('nopthing');
                        console.log(data);
                        renderData.list(data);
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
                    renderData.detail(data);
                    //sections toggle
                })

                .go();
        }
    }

    var renderData = {
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

            // call sections.toggle() to show activeSection and hide other sections
            console.log(window.location.hash.substr(1));


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
            Transparency.render(strain, data.data, directives);

            sections.toggle('strain-detail');
        }
    }

    var sections = {

        toggle: function (activeSection) {

            // hide all sections by setting hidden class
            var sections = document.querySelectorAll('section');

            // sections.classList.add('hidden');
            console.log(sections);

            sections.forEach(function(section) {

                console.log(section);

                section.classList.add('hidden');
            });


            // show active section by removing hidden class
            document.getElementById(activeSection).classList.remove('hidden');
        }
    }

    app.init();

})();