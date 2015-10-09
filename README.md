# AngularJS_Parse 
# Iterate through all Drivers
	angular.forEach(driverList, function(value) {
		value.fullname = (value.firstName + ' ' + value.surname);
	});
# TESTING:  GET ALL DRIVERS
driverModel.getAllDriversData().then(function() {
	$scope.drivers = driverModel.getAllDrivers();
	console.log("Drivers: " +  JSON.stringify($scope.drivers));
});

#TESTING: dataService
defectsModel.getDefectById("tDnjAnBeHf").then(function () {
	//
});

#TESTING: GET ALL VEHICLES
vehicleModel.getAllVehiclesData().then(function() {
	$scope.vehicles = vehicleModel.getAllVehicles();
	console.log("Vehicles: " +  JSON.stringify($scope.vehicles));
});