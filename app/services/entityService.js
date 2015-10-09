(function() {

	
    angular.module('myApp').factory('entityService', entityService);


    function entityService() {
        // Expose properties as API
        return {
            buildActiveTaskVehicles: buildActiveTaskVehicles,
            buildDefectVehicle: buildDefectVehicle
        };


        function buildActiveTaskVehicles(payload) {
           var _allVehicles = [];

            for (var i = payload.length - 1; i >= 0; i--) {
                // create a collection of vehicles with active tasks
                var vehicle = buildDefectVehicle(payload[i]);
               
                _allVehicles.push(vehicle);
            }
            return _allVehicles;
        }

        function buildDefectVehicle (parse_vehicle) {
            var _vehicle = {};
                  
            _vehicle.vehicleId = parse_vehicle.id;
            _vehicle.fleetNo = "#"+parse_vehicle.get("fleetNo");               
            _vehicle.reg = parse_vehicle.get("reg");
            _vehicle.make = parse_vehicle.get("make");
            _vehicle.model = parse_vehicle.get("model");
            _vehicle.serviceDue = parse_vehicle.get("nextService");
            _vehicle.tasks = [];
            //console.log("vehicle: " + _vehicle.vehicleId);
            
            
            var _allActiveTasks = parse_vehicle.get("activeTasks");
            for (var j = _allActiveTasks.length - 1; j >= 0; j--) {
                var _defect = _allActiveTasks[j];
                var _task = {};
                _task.taskID = _defect.id;                       
                _task.desc = _defect.get("desc");
                _task.urgent = _defect.get("urgent");
                _task.category = _defect.get("category");
                _task.title = _defect.get("title");
                _task.actionTaken = _defect.get("actionTaken");
                _task.icon = _defect.get("icon");
                _task.image = _defect.get("image");
                _task.imageData = _defect.get("imageData");
                _task.driverId = _defect.get("driver").id;

                _vehicle.tasks.push(_task);
            }
            //console.log("vehicle tasks: " +  JSON.stringify(_vehicle.tasks));            
            return _vehicle;
        }

    }	
})();