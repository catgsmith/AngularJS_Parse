(function() {	

    angular.module('myApp').factory('dataService', dataService);


    function dataService($q) {
        // Expose properties as API
        return {
        	getDriverData: getDriverData,
            getAllVehiclesData: getAllVehiclesData,
            getAllDefectsData: getAllDefectsData

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
        

        function getAllDefectsData() {
            var DefectJobs = Parse.Object.extend("DefectJobs");
            var defectJobsQuery = new Parse.Query(DefectJobs);

            defectJobsQuery.include("defects"); 
            defectJobsQuery.include("vehicle");             
            defectJobsQuery.include("driver");   

            var defer = $q.defer(); 
            var _jobList = [];   

            var _buildJobList = function(results) {
                _jobList = [];

                for (var i in results) {
                    var job = {}; // new job list job
                    job.jobId = results[i].id;
                    job.date = results[i].get("date"); 

                    if(results[i].get("vehicle")) {
                        var vehicle = results[i].get("vehicle");
                        job._vehicle = vehicle;
                        job.fleetNo = "#"+vehicle.get("fleetNo");               
                        job.reg = vehicle.get("reg");
                        job.make = vehicle.get("make");
                        job.model = vehicle.get("model");
                        job.serviceDue = vehicle.get("nextService");                
                    }

                    if(results[i].get("driver")) {
                        var driver = results[i].get("driver");
                        job._driver = driver;
                        job.driver = driver.get("firstName") + " " + driver.get("surname");
                    }            
                    
                    //job.status = // TODO: on job list #1

                    job.tasks = [];
                    var allDefects = results[i].get("defects");


                    for (var j in allDefects) {

                        if (allDefects[j]) {
                            var task = {};
                            task._task = allDefects[j];
                            task.desc = allDefects[j].get("desc");
                            task.startWork = "";
                            task.status = "";
                            task.partsRequired = "";
                            task.urgent = allDefects[j].get("urgent");
                            task.category = allDefects[j].get("category");
                            task.title = allDefects[j].get("title");
                            task.icon = allDefects[j].get("icon");
                            task.image = allDefects[j].get("image");
                            task.imageData = allDefects[j].get("imageData");
                            //console.log("image:" + JSON.stringify(defect.imageData));
                            //console.log("imageData:" + defect.imageData.url);

                            
                            job.tasks.push(task);
                        }
                    }
                    // LOAD THE JOB LIST WITH VEHICLES AND THEIR DEFECTS
                    _jobList.push(job);
                } // end for loop 
                //console.log("_buildJobList completed!");           
            };     

            defectJobsQuery.find({
                success: function(results) {
                    _buildJobList(results);
                    defer.resolve(_jobList);
                },
                error: function(error) {
                    console.log("Query error" + error.message);
                    defer.reject(error);
                }
            });

            return defer.promise;
        }   


    }
}());