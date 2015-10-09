(function() {

    angular.module('myApp').factory('defectsModel', defectsModel);

    function defectsModel($http, $q, dataService) { 
        var defect = null;

        return {
            getDefectById: function(id) {
                var defer = $q.defer();

                dataService.getDefectData(id).then(function(aDefect) {
                    defect = aDefect;
                    var desc = ""; var created = null;
                    if(aDefect) {
                        _desc = defect.get("desc");
                        _created = defect.createdAt;
                    }
                    console.log("dataService~defect "+ id + ": " + _desc + " " + _created);

                    defer.resolve(defect);
                }, function(error) {
                    console.log("Parse error: " + error.message);
                    defer.reject(error);
                });
                return defer.promise;
            },
        };
    }  		
})();