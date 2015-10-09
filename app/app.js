(function() {
 
    var myApp = angular.module('myApp', ['values']); // no dependencies

    myApp.run(function (PARSE_CREDENTIALS) {	
    	Parse.initialize(PARSE_CREDENTIALS.APP_ID, PARSE_CREDENTIALS.JAVASCRIPT_KEY);
    });


// Fetch Driver from Parse Database
    myApp.controller('myController', function ($scope, driverModel, defectsModel, vehicleModel){  
		$scope.driverName = null;
		$scope.vehicles = [];
		$scope.aVehicle = null;
		
		driverModel.getDriverById("kOOsFkwpKX").then(function () {
			$scope.driverName =  driverModel.getDriverName();
		});

		defectsModel.getDefectById("tDnjAnBeHf").then(function () {
			//
		});

		driverModel.getDriverOfVehicleByDate();

		

		vehicleModel.getAllActiveTaskVehiclesData().then(function() {
			$scope.vehicles = vehicleModel.getAllActiveTaskVehicles();

			return vehicleModel.getDefectVehicleforFleetNo("#8");

		}).then(function(_vehicle) {
				$scope.aVehicle = _vehicle;
				// For a selected vehicle loop through the active tasks and fetch the driver who reported task
				var promises = [];

				angular.forEach(_vehicle.tasks, function(task){
				    // For each item, extend the promise with a function to delete it.
				    promises.push(driverModel.getDriverById(task.driverId).then(function(aDriver) {
	
						task.driver = aDriver;
						//console.log("~task: " +  JSON.stringify(task));
					}));
					
				});
				// Return a new promise that is resolved when all of the tasks have driver data added.
  				return Parse.Promise.when(promises);
				
			}). then(function () {
				console.log("vehicle: " +  JSON.stringify($scope.aVehicle));				
			});

    	console.log("Finished OK");
    }); 

}());

