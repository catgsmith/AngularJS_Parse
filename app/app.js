(function() {
 
    var myApp = angular.module('myApp', ['values']);

    myApp.run(function (PARSE_CREDENTIALS) {	
    	Parse.initialize(PARSE_CREDENTIALS.APP_ID, PARSE_CREDENTIALS.JAVASCRIPT_KEY);
    });

    myApp.controller('myController', function ($scope, dataService){
		$scope.appName = "Catherine";
		
		dataService.getDriver("kOOsFkwpKX").then(function (aDriver) { 

			$scope.driverFirstName =  aDriver.get("firstName");
			$scope.driverSurname =  aDriver.get("surname");
			//console.log("Driver: " +  JSON.stringify(aDriver));
		}, function(error) {
			console.log("Parse error: " + error.message);		
		});

		$scope.vehicles = dataService.getVehicles();

		
    });
 
}());

