var routes = (function {
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