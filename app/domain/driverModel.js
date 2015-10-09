(function() {

    angular.module('myApp').factory('driverModel', driverModel);

    function driverModel($http, $q, dataService) {   
            var allDrivers = [];

            var driverCache = [];

            var driver = null;
            var firstName = null;
            var surname = null; 
            var fullname = null;

            return {
                getDriverById: function(id) {
                    var defer = $q.defer();
                    var promise = null;

                    //driver = getDriverInCache(id);
                    if (getDriverInCache(id)) {
                        promise = Parse.Promise.as(driver);
                    } else {
                        dataService.getDriverData(id).then(function(aDriver) {
                            driver = aDriver;
                            driverCache.push(driver);
                            firstName = driver.get("firstName");
                            surname = driver.get("surname");

                            defer.resolve(driver);
                        }, function(error) {
                            console.log("Parse error: " + error.message);
                            defer.reject(error);
                        });
                        promise = defer.promise;
                        }
                        return promise;
                },
                getDriverName: function() {
                    fullname = firstName + " " + surname;
                    return fullname;
                },
                getAllDriversData: function() {
                    var defer = $q.defer();

                    dataService.getAllDriversData().then(function(response) {
                        allDrivers = JSON.parse(JSON.stringify(response));
                        driverCache = allDrivers; // Warning: Copy array by reference here
                        defer.resolve(allDrivers);
                    }, function(error) {
                        console.log("Parse error: " + error.message);
                        defer.reject(error);
                    });

                    return defer.promise;
                },
                getDriverOfVehicleByDate: function() {
                    // TODO
                },
                getAllDrivers: function() {
                    return allDrivers;
                },
                getDriver: function() {
                    return driver;
                }, 
            };

        function getDriverInCache(id) {                                   
            indexes = $.map(driverCache, function(obj, index) {
                // FleetNo has # subscript
                if (obj.id == id) {
                    return index;
                }
            });
            var driver = null;
            if (indexes.length > 0) {
                var first = indexes[0];            
                driver = driverCache[first];                
            }
            console.log("~getDriverInCache: " +  JSON.stringify(driver) );
            return driver;
        }
    }  
})();