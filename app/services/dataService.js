(function() {	

    angular.module('myApp').factory('dataService', dataService);


    function dataService($q) {
        // Expose properties as API
        return {
        	getDriverData: getDriverData,
            getAllVehiclesData: getAllVehiclesData,
            getAllDefectsData: getAllDefectsData,
            getAllJobsData: getAllJobsData,
            getJobByDefectJobID: getJobByDefectJobID

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

        function getAllJobsData() {
            // Declaring the type
            var Job = Parse.Object.extend("Joblist");
            var jobQuery = new Parse.Query(Job);
            var defer = $q.defer();


            jobQuery.include("mechanic"); 
            jobQuery.include("defectJob"); 

           
            var _joblist = [];          

            var _buildJobList = function(results) {
                _joblist = [];                

                for (var i in results) {
                    var job = {}; // new job list job
                    job.joblistId = results[i].id;
                    job.rank = results[i].get("rank"); 
                    job.status = results[i].get("status"); 

                    if(results[i].get("mechanic")) {
                        var mechanic = results[i].get("mechanic");
                        job.mechanicID = mechanic.id;
                        job.mechanic = mechanic.get("firstName") + " " + mechanic.get("surname");   
                    }

                    if(results[i].get("defectJob")) {
                        var defectJob = results[i].get("defectJob");
                        job._defectJob = defectJob;
                    }
                    
                    // LOAD THE JOB LIST WITH VEHICLES AND THEIR DEFECTS
                    _joblist.push(job);
                }
                //console.log("GetAllJobsData: " +  JSON.stringify(_joblist));
            };
            
            jobQuery.find ({
                success: function(results) {
                    _buildJobList(results);
                    defer.resolve(_joblist);
                }, error: function(object, error){
                    // The collection not retrieved successfully.
                    console.log("Parse Error: "+ error.message);
                    defer.reject(error);    
                }
            }); 
            return defer.promise;
        }

        function getJobByDefectJobID(defectJobId) {
            /* Find the job on the JobList associated with the defect job */
            var Job = Parse.Object.extend("Joblist");
            
            var jobQuery = new Parse.Query(Job);

            jobQuery.equalTo('defectJob', {
                __type: "Pointer",
                className: "DefectJobs",
                objectId: defectJobId
            }); // select specific defect job

            jobQuery.include("Mechanic"); // may not require mechanic

            var defer = $q.defer();  

            jobQuery.first({
             success: function(results) {
                 defer.resolve(results);
             },
             error: function(error) {
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
            var _defectlist = [];   

            var _buildDefectList = function(results) {
                _defectlist = [];

                for (var i in results) {
                    var job = {}; // new job list job
                    job.defectJobID = results[i].id;
                    job.date = results[i].get("date"); 
                    
                    if(results[i].get("vehicle")) {
                        var vehicle = results[i].get("vehicle");
                        job.vehicleID = vehicle.id;
                        job.fleetNo = "#"+vehicle.get("fleetNo");               
                        job.reg = vehicle.get("reg");
                        job.make = vehicle.get("make");
                        job.model = vehicle.get("model");
                        job.serviceDue = vehicle.get("nextService");                
                    }

                    if(results[i].get("driver")) {
                        var driver = results[i].get("driver");
                        job.driverID = driver.id;
                        job.driver = driver.get("firstName") + " " + driver.get("surname");
                    }            
                    
                    //job.status = // TODO: on job list #1

                    job.tasks = [];
                    var allDefects = results[i].get("defects");


                    for (var j in allDefects) {

                        if (allDefects[j]) {
                            var task = {};
                            task.taskID = allDefects[j].id;
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
                    _defectlist.push(job);
                } // end for loop 
                //console.log("_buildDefectList completed!"); 
                _defectlist = _defectlist.slice(5,10);    // ONLY WANT THESE FIVE RECORDS FOR TESTING "TROTTLE" 
                //console.log("dataservice defectlist: " +  JSON.stringify(_defectlist[0]));    
            };     

            defectJobsQuery.find({
                success: function(results) {
                    _buildDefectList(results);
                    defer.resolve(_defectlist);
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