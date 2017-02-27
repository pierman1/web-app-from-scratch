(function () {

    'use strict'

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
                    //  get strainList data
                    strainsList.getData();
                    sections.toggle(hashName);
                },

                'strains/:id' : function (strainId) {
                    // get path name and fire sections.toggle() to show section
                    var hashName = this.path;
                    // get StrainDtail data
                    strainDetail.getData(strainId);
                    sections.toggle('strain-detail');
                }
            });
        },
    }

    var strainDetail = {

        getData: function (strainId) {
            // call data
            aja()
                .url('https://www.cannabisreports.com/api/v1.0/strains/' + strainId + '?=972ea5f706ca0dc6dbe17db99a834085804ee594')
                .cache(false)
                .type('jsonp')
                .cache('false')
                .on('success', function(data){

                    strainDetail.renderData(data.data);

                })

                .go();

        },
        // render Data
        renderData: function (strainDetailData) {

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
            Transparency.render(strain, strainDetailData, directives);

            strainDetail.renderFlags(strainDetailData);
        },

        renderFlags: function (strainDetailData) {

            var lineage = strainDetailData.lineage;
            console.log(lineage);
            var country = Object.keys(lineage);
            for (var prop in lineage) {
                console.log(lineage[prop]);

                var flagList = document.querySelector('#flag-list');
                var countryId = lineage[prop];

                    var flag = document.createElement('img');
                    flag.src = 'img/flags/' + countryId + '-128.png';
                    document.getElementById('flag-list').appendChild(flag);

            }
        }
    }

    var strainsList = {

        getData: function() {
            aja()
                .url('https://www.cannabisreports.com/api/v1.0/strains?=972ea5f706ca0dc6dbe17db99a834085804ee594')
                // .url('./data/strains-data.json')
                .type('jsonp')
                .cache('false')
                .on('success', function(data){

                    // store data local as string (default is Object)
                    // localStorage.data = JSON.stringify(data);

                    var rawData = data.data;

                    console.log(data.data)
                    var strainsListData = _.map(data.data, function(strain){
                        return _.pick(strain, 'ucpc', 'name');
                    });

                    strainsList.renderData(strainsListData);
                    // console.log(strainsListData);

                })
                .on('error', function () {
                    console.log('error!');
                })

                // Go! Aja!
                .go();
        },

        renderData: function(strainsListData) {

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

            Transparency.render(strains, strainsListData, directives);


        },

        list: function () {
            var strainsList = localStorage.getItem('data');
            console.log(strainsList);
        },

        item: function () {
            var strainsItem = localStorage.getItem('data');
        }
    }

    var sections = {
        toggle: function (hashName) {

            // get all sections and the active section by var hashName
            var allSections = document.querySelectorAll('section');

            // by hash get active Section
            var activeSection = document.getElementById(hashName);
            console.log(activeSection);

            // Loop through all Sections
            for (var i=0; i < allSections.length; i++) {

                // hide all Sections
                allSections[i].classList.add('hidden');
            }

            activeSection.classList.toggle('hidden');
        }
    }

    app.init();

})();