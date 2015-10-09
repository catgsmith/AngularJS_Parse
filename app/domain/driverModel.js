(function() {

    angular.module('myApp').factory('driverModel', driverModel);

    function driverModel($http, $q, dataService) {   
            var allDrivers = [];

            var driver = null;
            var firstName = null;
            var surname = null; 
            var fullname = null;

            return {
                getDriverById: function(id) {
                   var defer = $q.defer();


                   dataService.getDriverData(id).then(function (aDriver) {
                        driver = aDriver;
                        firstName =  driver.get("firstName");
                        surname =  driver.get("surname");
                        
                        defer.resolve(driver);
                    }, function(error) {
                        console.log("Parse error: " + error.message); 
                        defer.reject(error);      
                    });          
                   return defer.promise;
                },
                getDriverName: function() {
                    fullname = firstName + " " + surname;
                    return fullname;
                },
                getAllDriversData: function() {
                    var defer = $q.defer();

                    dataService.getAllDriversData().then(function(response) {
                        allDrivers = JSON.parse(JSON.stringify(response));
                        defer.resolve(allDrivers);
                    }, function(error) {
                        console.log("Parse error: " + error.message);
                        defer.reject(error);
                    });

                    return defer.promise;
                },
                getAllDrivers: function() {
                    return allDrivers;
                },
                getDriver: function() {
                    return driver;
                }, 
            };
    }  
})();