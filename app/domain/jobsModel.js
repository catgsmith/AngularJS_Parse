(function() {

    angular.module('myApp').factory('jobsModel', jobsModel);

    function jobsModel($http, $q, dataService) {   

            var jobs = []; 
            var job = {};
            var defectJob = {};

            return {
                getAllJobs: function() {
                    var defer = $q.defer();

                    dataService.getAllJobsData().then(function (response) {
                        jobs = JSON.parse(JSON.stringify(response));
                        defer.resolve(jobs);
                    }, function(error) {
                        console.log("Parse error: " + error.message); 
                        defer.reject(error);      
                    });          
                   return defer.promise;
                },
                getJobs: function() {
                   return jobs;
                }, 
                getJobByDefectJobID: function(defectJobID) {
                    var defer = $q.defer();
                    dataService.getJobByDefectJobID(defectJobID).then(function (response) {
                        
                        job = response;
                        defer.resolve(job);
                    }, function(error) {
                        console.log("Parse error: " + error.message); 
                        defer.reject(error); 
                    });
                   return defer.promise;
                },
                saveJob: function() {
                    //return jobID;
                }
            };
    }  		
})();