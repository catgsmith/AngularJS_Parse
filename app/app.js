(function() {
 
    var myApp = angular.module('myApp', []); // no dependencies
    myApp.controller('myController', function ($scope, dataService){
		$scope.appName = "Catherine";
		
		$scope.vehicles = dataService.getVehicles();
		
    });

 
}());

