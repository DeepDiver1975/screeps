var util = require('util')

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.store.getFreeCapacity() > 0) {
            // TODO: search for tombstones as well
            var closestStorage = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER ||
                        structure.structureType == STRUCTURE_STORAGE)
                }
            });

            if(creep.withdraw(closestStorage) == ERR_NOT_IN_RANGE) {
                creep.moveTo(closestStorage, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            var closestStorage = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_SPAWN ||
                            structure.structureType == STRUCTURE_TOWER) && 
                            (structure.energy < structure.energyCapacity || _.sum(structure.store) < structure.store.getCapacity());
                    }
            });
            if(closestStorage) {
                if(creep.transfer(closestStorage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(closestStorage, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
	}
};

module.exports = roleHarvester;