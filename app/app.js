(function() {
 
    var myApp = angular.module('myApp', ['values']); // no dependencies

    myApp.run(function (PARSE_CREDENTIALS) {	
    	Parse.initialize(PARSE_CREDENTIALS.APP_ID, PARSE_CREDENTIALS.JAVASCRIPT_KEY);
    });


// Fetch Driver from Parse Database
    myApp.controller('myController', function ($scope, driverModel, defectsModel, vehicleModel){  
		$scope.driverName = null;
		$scope.vehicles = [];
		
		driverModel.getDriverById("kOOsFkwpKX").then(function () {
			$scope.driverName =  driverModel.getDriverName();

		});

		defectsModel.getDefectById("tDnjAnBeHf").then(function () {
			//
		});


		vehicleModel.getAllActiveTaskVehiclesData().then(function() {
			$scope.vehicles = vehicleModel.getAllActiveTaskVehicles();
		});

    	console.log("Finished OK");
    }); 
}());

