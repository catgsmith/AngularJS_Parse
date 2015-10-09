(function() {	

    angular.module('myApp').factory('dataService', dataService);


    function dataService($q, entityService) { 
        // Expose properties as API
        return {
        	getDriverData: getDriverData,
            getAllDriversData: getAllDriversData,
            getDefectData: getDefectData,            
            getAllVehiclesData: getAllVehiclesData,
            getAllActiveTaskVehicles: getAllActiveTaskVehicles   
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

        function getDefectData(defectId) {
            // Declaring the type
            var Defects = Parse.Object.extend("Defects");
            var defer = $q.defer();
 
            var defectsQuery = new Parse.Query(Defects);
            defectsQuery.equalTo('objectId', defectId);
            defectsQuery.first({
             success: function(results) {
                 defer.resolve(results);
             },
             error: function(error) {
                 defer.reject(error);
             }
            });

            return defer.promise;
        }

        function getAllDriversData() {
            // Declaring the type
            var Driver = Parse.Object.extend("Driver");
            var defer = $q.defer();

            var driverQuery = new Parse.Query(Driver);
            driverQuery.find ({
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

     
        function getAllActiveTaskVehicles() {
            var defer = $q.defer();
            // Declaring the type
            var Vehicle = Parse.Object.extend("Vehicle");            

            var vehicleQuery = new Parse.Query(Vehicle);  
            // Filter : Only vehicles with active tasks          
            vehicleQuery.exists("activeTasks"); 
            // include : All task details
            vehicleQuery.include("activeTasks");

            vehicleQuery.find().then(function (results){                
                    // The collection retrieved successfully.
                    //console.log("dataservice~find: " +  JSON.stringify(results[9]));
                    var _activeTaskVehicles = entityService.buildActiveTaskVehicles(results);
                    defer.resolve(_activeTaskVehicles);

                }, function(error){
                    // The collection not retrieved successfully.
                    console.log("Parse Error: "+ error.message);
                    defer.reject(error);    
                }
            );   
            return defer.promise;
        }
    }
    
}());