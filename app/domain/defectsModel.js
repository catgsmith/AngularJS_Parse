(function() {

    angular.module('myApp').factory('defectsModel', defectsModel);

    function defectsModel($http, $q, dataService) {   

            var allDefectJobs = []; 

            var vehicleDefectJob = null;

            return {
                getAllDefectJobs: function() {
                   var defer = $q.defer();

                   dataService.getAllDefectsData().then(function (response) {
                        allDefectJobs = JSON.parse(JSON.stringify(response));
                        defer.resolve(allDefectJobs);
                    }, function(error) {
                        console.log("Parse error: " + error.message); 
                        defer.reject(error);      
                    });          
                   return defer.promise;
                },
                getDefectJobs: function() {
                   return allDefectJobs;
                }, 
                getDefectJobforFleetNo: function(fleetNo) {
                    indexes = $.map(allDefectJobs, function(obj, index) {
                        // FleetNo has # subscript
                        if(obj.fleetNo == "#" + fleetNo) {
                            vehicleDefectJob = allDefectJobs[index];
                            return vehicleDefectJob;
                        }
                    });

                    //firstIndex = indexes[0];

                    return vehicleDefectJob;                }
            };
    }  		
})();