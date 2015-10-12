(function() {

	
    angular.module('myApp').factory('entityService', entityService);


    function entityService() {
        // Expose properties as API
        return {
            buildEntity: buildEntity,
            buildActiveTaskVehicles: buildActiveTaskVehicles,
            buildDefectVehicle: buildDefectVehicle
        };

        function buildEntity(parse_object, entity_properties) {
            var entity_obj = {};
            if(parse_object) {               
                if (!entity_properties) {
                    entity_obj = JSON.parse(JSON.stringify(parse_object));            
                } else {
                    // build entity object dynamically by iterating through properties
                    angular.forEach(entity_properties, function(value) {
                        this[value] = parse_object.get(value); // Gets the value of an parse attribute
                    }, entity_obj);

                    entity_obj.objectId = parse_object.id;
                }
            }
            return entity_obj;
        }


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
            var _vehicle = buildEntity(parse_vehicle, ["fleetNo", "reg", "make", "model", "nextService"]);
            _vehicle.fleetNoFilter = "#"+parse_vehicle.get("fleetNo");
            _vehicle.tasks = [];
            
            var _allActiveTasks = parse_vehicle.get("activeTasks");
            for (var j = _allActiveTasks.length - 1; j >= 0; j--) {
                var _task = buildEntity(_allActiveTasks[j], ["desc", "urgent", "category", 
                    "title", "actionTaken", "icon", "image", "imageData"]);
                _task.driverId = _allActiveTasks[j].get("driver").id; // included in query
                _vehicle.tasks.push(_task);
            }
            //console.log("vehicle tasks: " +  JSON.stringify(_vehicle.tasks));            
            return _vehicle;
        }

    }	
})();