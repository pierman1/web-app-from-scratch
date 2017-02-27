'use strict';

(function () {


    // Structures
    var app = {
        init: function () {
            // Fire routes.init();
            routes.init();
            search.userInput();
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

                'search' : function () {
                    // get path name and fire sections.toggle() to show section
                    var hashName = this.path;
                    //  get strainList data
                    // strainsList.getData();
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
        }
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
            strainsList.toggle(strainsListData);
        },

        toggle: function (strainsListData) {
            var nextButton = document.querySelector('.next');
            var currentPage = 1;

            nextButton.addEventListener("click", function() {

                currentPage =+ 1;
                pagination.getData(currentPage);
                console.log(currentPage);
            });
        }
    }

    var pagination = {
        getData: function (currentPage) {
            aja()
                .url('https://www.cannabisreports.com/api/v1.0/strains?page=' + currentPage)
                // .url('./data/strains-data.json')
                .type('jsonp')
                .cache('false')
                .on('success', function(data){

                    // store data local as string (default is Object)
                    // localStorage.data = JSON.stringify(data);

                    var rawData = data.data;

                    // console.log("Data = " + rawData);
                    var strainsListData = _.map(data.data, function(strain){
                        return _.pick(strain, 'ucpc', 'name');
                    });

                    console.log(rawData);

                    strainsList.renderData(strainsListData);
                    // console.log(strainsListData);
                })
                .on('error', function () {
                    console.log('error!');
                })

                // Go! Aja!
                .go();
        }
    }

    var sections = {
        toggle: function (hashName, searchSection) {

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

            // search section variables
            document.querySelector('button[class="next"]').classList.remove('hidden');

            // if searchSection remove class hidden
            if(searchSection) {
                var searchSection = document.getElementById(searchSection);
                searchSection.classList.remove('hidden');
            }
        }
    }

    var search = {
        userInput: function () {
            var inputButton = document.querySelector('input[type="button"]');

            inputButton.addEventListener('click', function() {
                var inputValue = document.querySelector('input[type="text"]').value;
                console.log(inputValue);
                search.getData(inputValue);

                sections.toggle('strains', 'search');
            });
        },

        getData: function (inputValue) {
            aja()
                .url('https://www.cannabisreports.com/api/v1.0/strains/search/' + inputValue)
                // .url('./data/strains-data.json')
                .type('jsonp')
                .cache('false')
                .on('success', function(data){

                    // store data local as string (default is Object)
                    // localStorage.data = JSON.stringify(data);

                    var rawData = data.data;

                    // console.log("Data = " + rawData);
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
        }
    }

    // var data = {
    //
    //     get: function(url){
    //         aja()
    //             .url(url)
    //             .type('jsonp')
    //             .cache('false')
    //             .on('success', function(data, properties){
    //
    //                 // store data local as string (default is Object)
    //                 // localStorage.data = JSON.stringify(data);
    //
    //                 var dataObj = data.data;
    //
    //                 data.render(dataObj);
    //
    //
    //                 // console.log(strainsListData);
    //             })
    //             .on('error', function () {
    //                 console.log('error!');
    //             })
    //
    //             // Go! Aja!
    //             .go();
    //     },
    //
    //     render: function(params, dataObj) {
    //
    //
    //     // declare target parent for transparancy js
    //     var target = document.querySelector(params.target);
    //
    //     var directives = params.directives;
    //     console.log(directives);
    //
    //     for(var i = 0; i < directives.length; i++){
    //         console.log(directives[i]);
    //
    //     }
    //     var directivesRender = {
    //
    //         init: function(params){
    //             for(var i = 0; i < directives.length; i++){
    //                 var directive = {
    //
    //                     directives[i].name : {
    //                     href: function (params) {
    //                         return  directives[i].returnText + directives[i].property;
    //                     },
    //
    //                 },
    //
    //                 }
    //
    //
    //             }
    //         }
    //
    //
    //     }
    //
    //     var directives = directivesRender.init(params);
    //     //
    //
    //     Transparency.render(target, dataObj, directives);
    //
    //     }
    //
    // }
    //
    //
    // var strains = {
    //     init: function() {
    //         var params = {
    //             target: ".strains-list",
    //             directives:[
    //                 {
    //                     name: "strainTitle",
    //                     type: "href",
    //                     returnText: "#strains/",
    //                     property: "upcp"
    //                 },
    //                 {
    //                     name: "strainText",
    //                     type: "text",
    //                     returnText: "",
    //                     property: ""
    //                 }
    //             ]
    //
    //         }
    //
    //         data.render(params)
    //     }
    // }
    //
    // strains.init();


    app.init();

})();