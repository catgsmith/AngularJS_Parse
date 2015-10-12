(function() {

    angular.module('myApp').factory('driverModel', driverModel);

    function driverModel($http, $q, dataService, entityService) {
            var allDrivers = [];

            var driverCache = [];

            var driver = {};

            return {
                getDriverById: function(id) {
                    var defer = $q.defer();
                    var promise = null;

                    //driver = getDriverInCache(id);
                    if (getDriverInCache(id)) {
                        promise = Parse.Promise.as(driver);
                    } else {
                        dataService.getDriverData(id).then(function(driverData) {
                            var aDriver = entityService.buildEntity(driverData, ["firstName", "surname"]);
                            aDriver.name = aDriver.firstName + " " + aDriver.surname; 
                            addDriverToCache(aDriver);

                            defer.resolve(aDriver);
                        }, function(error) {
                            console.log("Parse error: " + error.message);
                            defer.reject(error);
                        });
                        promise = defer.promise;
                        }
                        return promise;
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
                }
            };

        function getDriverInCache(id) {
            var aDriver = null; 
            if(driverCache.length > 0)  {                                  
                indexes = $.map(driverCache, function(obj, index) {
                    // FleetNo has # subscript
                    if (obj.objectId == id) {
                        return index;
                    }
                });
                
                if (indexes.length > 0) {
                    var first = indexes[0];            
                    aDriver = driverCache[first];                
                }
            }
            return aDriver;
        }
        function addDriverToCache(aDriver) {
            // make sure array is unique
            if (driverCache.length === 0) { // driver as semaphore
                driverCache.push(aDriver);
                driver = aDriver;
            } else {
                var uniqueDriver = getDriverInCache(aDriver.objectId);
                if(uniqueDriver) {
                    uniqueDriver = aDriver; // store latest version 
                } else {
                    driverCache.push(aDriver);
                    driver = aDriver;                    
                }
            }
            console.log("Log driver Cache: " +  JSON.stringify(driverCache));
        }
    }  
})();