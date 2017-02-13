// IFFE
(function() {

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
                    showProfile.show(data);

                })
                .on('error', function () {
                    console.log('error!');
                })

                // Go! Aja!
                .go();
        },

        show: function (data) {
            console.log(data);
        }
    }

    // call getData method inside showProfile object
    showProfile.getData();

})();