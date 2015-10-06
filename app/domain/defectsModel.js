(function() {

    angular.module('myApp').factory('defectsModel', defectsModel);

    function defectsModel($http, $q, dataService) {   

            var defectJobs = []; 

            return {
                getAllDefectJobs: function() {
                   var defer = $q.defer();

                   dataService.getAllDefectsData().then(function (response) {
                        defectJobs = JSON.parse(JSON.stringify(response));
                        defer.resolve(defectJobs);
                    }, function(error) {
                        console.log("Parse error: " + error.message); 
                        defer.reject(error);      
                    });          
                   return defer.promise;
                },
                getDefectJobs: function() {
                   return defectJobs;
                }, 
            };
    }  		
})();