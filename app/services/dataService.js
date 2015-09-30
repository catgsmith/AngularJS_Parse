(function() {

    angular.module('myApp')
        .factory('dataService', dataService);


    function dataService() {
        // Expose properties as API
        return {
            getVehicles: getVehicles
        };

        function getVehicles() {

			var vehicles = [];
			var vehicle = {};
			vehicle.nextService = new Date(2015,10,1);
			vehicle.reg = "11GH 1111";
			vehicles.push(vehicle);  

			return vehicles;
        }
    }

}());