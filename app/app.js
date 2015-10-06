(function() {
 
    var myApp = angular.module('myApp', ['values']); // no dependencies

    myApp.run(function (PARSE_CREDENTIALS) {	
    	Parse.initialize(PARSE_CREDENTIALS.APP_ID, PARSE_CREDENTIALS.JAVASCRIPT_KEY);
    });


// Fetch Driver from Parse Database
    myApp.controller('myController', function ($scope, driverModel, defectsModel){	
		$scope.driverName = null;
		$scope.defectJobs = [];

		driverModel.getDriverById("kOOsFkwpKX").then(function () {
			$scope.driverName =  driverModel.getDriverName();
		});	

		//defectsModel.getAllDefectJobs();		

		defectsModel.getAllDefectJobs().then(function() {

			var defectJobs = defectsModel.getDefectJobs();		

			$scope.defectJobs = defectJobs.slice(5,10);
		});
    }); 
}());

