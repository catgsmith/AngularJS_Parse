(function() {

    angular.module('myApp').factory('vehicleModel', vehicleModel);

    function vehicleModel($http, $q, dataService) {   

            var vehicles = []; 

            return {
                getAllVehicles: function() {
                   var defer = $q.defer();

                   dataService.getAllVehiclesData().then(function (response) {
                        vehicles = JSON.parse(JSON.stringify(response));
                        defer.resolve(vehicles);
                    }, function(error) {
                        console.log("Parse error: " + error.message); 
                        defer.reject(error);      
                    });          
                   return defer.promise;
                },
                getVehicles: function() {
                   return vehicles;
                }, 
            };
    }  		
})();