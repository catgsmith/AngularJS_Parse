(function() {

    angular.module('myApp').factory('driverModel', driverModel);

    function driverModel($http, $q, dataService) {   

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
                getDriver: function() {
                    return driver;
                }, 
                getAllDrivers: function () {
/*                  angular.forEach(driverList, function(value) {
                        value.fullname = (value.firstName + ' ' + value.surname);
                    });*/
                },
            };
    }  
})();