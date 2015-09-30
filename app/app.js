(function() {
 
    var myApp = angular.module('myApp', ['values']); // no dependencies

    myApp.run(function (PARSE_CREDENTIALS) {	
    	Parse.initialize(PARSE_CREDENTIALS.APP_ID, PARSE_CREDENTIALS.JAVASCRIPT_KEY);
    });


// Fetch Driver from Parse Database
    myApp.controller('myController', function ($scope, driverModel, vehicleModel){	
		$scope.driverName = null;
		$scope.vehicles = [];

		driverModel.getDriverById("kOOsFkwpKX").then(function () {
			$scope.driverName =  driverModel.getDriverName();
		});			

		vehicleModel.getAllVehicles().then(function() {
			$scope.vehicles = vehicleModel.getVehicles();
		});
    }); 
}());

