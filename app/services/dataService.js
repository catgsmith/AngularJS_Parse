(function() {	

    angular.module('myApp').factory('dataService', dataService);


    function dataService($q) {
        // Expose properties as API
        return {
        	getDriverData: getDriverData,
            getAllVehiclesData: getAllVehiclesData

        };
		function getDriverData(driverId) {
			// Declaring the type
    		var Driver = Parse.Object.extend("Driver");
			var defer = $q.defer();
 
			var driverQuery = new Parse.Query(Driver);
			driverQuery.equalTo('objectId', driverId);
			driverQuery.first({
			 success: function(results) {
			     defer.resolve(results);
			 },
			 error: function(error) {
			     defer.reject(error);
			 }
			});

			return defer.promise;
		}

        function getAllVehiclesData() {
        	// Declaring the type
    		var Vehicle = Parse.Object.extend("Vehicle");
        	var defer = $q.defer();

        	var vehicleQuery = new Parse.Query(Vehicle);
        	vehicleQuery.find ({
        		success: function(results) {
        			// The collection retrieved successfully.
        			defer.resolve(results);
        		}, error: function(object, error){
        			// The collection not retrieved successfully.
        			console.log("Parse Error: "+ error.message);
        			defer.reject(error);	
        		}
        	});   
        	return defer.promise;
        }
    }

}());