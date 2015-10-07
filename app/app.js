(function() {
 
    var myApp = angular.module('myApp', ['values']); // no dependencies

    myApp.run(function (PARSE_CREDENTIALS) {	
    	Parse.initialize(PARSE_CREDENTIALS.APP_ID, PARSE_CREDENTIALS.JAVASCRIPT_KEY);
    });


// Fetch Driver from Parse Database
    myApp.controller('myController', function ($scope, driverModel, defectsModel, jobsModel){	
		$scope.driverName = null;
		$scope.defectJobs = [];
		$scope.jobs = [];

		driverModel.getDriverById("kOOsFkwpKX").then(function () {
			$scope.driverName =  driverModel.getDriverName();
		});			

		defectsModel.getAllDefectJobs().then(function() {

			$scope.defectJobs = defectsModel.getDefectJobs();	

			$scope.defectJob =  defectsModel.getDefectJobforFleetNo(7);	
			console.log("defect job for fleet no 7: " +  JSON.stringify($scope.defectJob));			

			jobsModel.getJobByDefectJobID('ntoCGl109c').then(function (aJob) {
				$scope.job =  aJob;
				console.log("joblist item for defect ntoCGl109c: " +  JSON.stringify($scope.job));
			});														
		});

		jobsModel.getAllJobs().then(function () {
			$scope.jobs = jobsModel.getJobs();
		});

    }); 
}());

