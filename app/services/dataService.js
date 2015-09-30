(function() {

    angular.module('myApp')
        .factory('dataService', dataService);


    function dataService($q) {
    	// Declaring the type
    	var Driver = Parse.Object.extend("Driver");

   		Object.defineProperty(Driver, 'fullname', {
    			get: function() {return (this.get("firstName") + " " + this.get("surname")); }
    		});
    		
    
		
        // Expose properties as API
        return {
        	getDriver: getDriver,
            getVehicles: getVehicles

        };
		function getDriver(jobId) {
			var defer = $q.defer();
 
			var driverQuery = new Parse.Query(Driver);
			driverQuery.equalTo('objectId', jobId);
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

        function getVehicles() {

			var vehicles = [];
			var vehicle = {};
			vehicle.nextService = new Date(2015,10,1);
			vehicle.reg = "11GH 1111";
			vehicles.push(vehicle);

			return vehicles;
        }
    }

}());