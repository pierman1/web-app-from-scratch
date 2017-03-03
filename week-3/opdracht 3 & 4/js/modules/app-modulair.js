'use strict';

var config = (function () {

    var loaderEl = document.querySelector('.loader');
    var placeholder ='https://www.cannabisreports.com/images/strains/no_image.png';
    var token = '972ea5f706ca0dc6dbe17db99a834085804ee594';
    var strainsUrl = 'https://www.cannabisreports.com/api/v1.0/strains/';
    var searchUrl = 'https://www.cannabisreports.com/api/v1.0/strains/search/';
    var strainUrl ='https://www.cannabisreports.com/api/v1.0/strains/';
    var strainsWithImage = [];

    return {
        loaderEl,
        placeholder,
        token,
        strainsUrl,
        searchUrl,
        strainUrl,
        strainsWithImage
    }

})();

var store = (function () {

    var list = {};
    var likedStrains = [];

    return {
        list,
        likedStrains
    }

})();

var app = (function() {
    var init = function () {
        routes.init();
        filter.init();
    }

    return {
        init
    }

})();

var routes = (function() {

    var init = function () {
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

                // searchSubmit button variable
                var searchSubmit = document.querySelector('[value="click"]');

                // searchSubmit eventlistener when clicked send userInput to request.list
                searchSubmit.addEventListener('click', function () {
                    console.log('submit is clicked');
                    var userInput = document.querySelector('[type="text"]').value;
                    request.list(config.searchUrl, userInput);
                });
            },

            'favorites' : function () {
                sections.toggle('favorites');
            },

            'error' : function () {
                sections.toggle('error');
            },

            'strains/:id' : function (strainId) {

                // get path name and fire sections.toggle() to show section
                var hashName = this.path;
                // get StrainDtail data
                // strainDetail.render(strainId);

                request.detail(config.strainUrl, strainId);
                // sections.toggle('strain-detail');
            }
        });
    }

    return {
        init
    }

})();

var filter = (function() {
    var init = function () {
        var filterButton = document.querySelector('.strains-list__image-filter');
        filterButton.addEventListener('click', function(){
            request.list(config.strainsUrl, false, true);
        });
    }

    var hasImage = function (object) {
        config.strainsWithImage.push(object);
        return object.image != config.placeholder;
    }

    return {
        init,
        hasImage
    }

})();

var request = (function() {

    var list = function (url, userInput, filtered) {

        console.log('list is called');

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

                    // map data.data to data
                    render.list(data.data, 'strains');

                    // store data
                    store.list = data.data;
                })

                .on('error', function (data) {
                    window.location.hash = '#error';
                })

                .go();

        }

        else if (filtered){

            // show loader
            loader.show();

            var filteredData = store.list.filter(filter.hasImage);
            render.list(filteredData, 'strains');
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

                    render.list(data.data, 'search');
                    //sections toggle

                    // store data
                    store.list = data.data;

                    var filteredData = store.list.filter(filter.hasImage);

                    console.log(filteredData);
                    render.list(filteredData, 'search');
                })

                .on('error', function (data) {
                    window.location.hash = '#error';
                })

                .go();

        }
    }

    var detail = function (url, strainName) {
        // show loader
        loader.show();

        // call data
        aja()
            .url(url + strainName +'?=' + config.token)
            .cache(false)
            .type('jsonp')
            .cache('false')
            .on('success', function(data){
                render.detail(data.data);
                //sections toggle
            })

            .on('error', function (data) {
                window.location.hash = '#error';
            })

            .go();

    }

    return {
        list,
        detail
    }

})();

var render = (function() {

    var list = function (data, parentElement) {
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
    }

    var detail = function (data) {

        // call favorites likes method to
        var likeButton = document.querySelector('#heart');

        // EventListener if liked
        likeButton.addEventListener('click', function() {
            likes.add(data);
        });


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

    return {
        list,
        detail
    };

})();

var likes = (function() {

    var add = function (strain) {

        var likedStrains = store.likedStrains;
        likedStrains.push(strain);

        // console.log(likedStrains);

        // filter double strains
        var uniqueLikes = likedStrains.filter(function (elem, index, self) {
            return index == self.indexOf(elem);
        });

        // show count in counter
        var likedStrainCounter = document.querySelector('[href="#favorites"]');
        likedStrainCounter.innerHTML = 'Favorites (' + uniqueLikes.length + ')';

        // map strain names , just for the fun
        var names = uniqueLikes.map(function (strain) {
            strain = {name: strain.name};
            return strain;
        });

        // move names to Favorites
        likes.toFavorites(names);
    }

    var toFavorites = function (uniqueLikes) {

        console.log(uniqueLikes);
        // declare target parent for transparency js
        var favorite = document.querySelector('.favorites');

        var directives = {

            strainTitle: {

                text: function (params) {
                    return this.name;
                }

            }

        };

        Transparency.render(favorite, uniqueLikes, directives);
    }

    return {
        add,
        toFavorites
    }

})();

var sections = (function() {

    var toggle = function (activeSection) {

        // hide all sections by setting hidden class
        var sections = document.querySelectorAll('section');

        // sections.classList.add('hidden');

        sections.forEach(function(section) {

            section.classList.add('hidden');
        });

        // hide loader

        if(activeSection === 'search' || activeSection === 'about' || activeSection === 'strains' || activeSection === 'strain-detail' || activeSection === 'favorites' || 'error') {
            loader.hide();

        } else {
            loader.show();
        }

        // show active section by removing hidden class
        document.getElementById(activeSection).classList.remove('hidden');
    }

    return {
        toggle
    }

})();

var loader = (function() {

    var show = function () {
        config.loaderEl.classList.remove('hidden');
    }

    var hide = function () {
        config.loaderEl.classList.add('hidden');
    }

    return {
        show,
        hide
    }

})();

app.init();