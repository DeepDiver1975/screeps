var util = require('util')

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.store.getFreeCapacity() === 0) {
            // search for tombstones as well
            const nextTombstone = creep.pos.findClosestByRange(FIND_TOMBSTONES)
            if (nextTombstone) {
                console.log('Tombstone to get energy from: ' + JSON.stringify(nextTombstone))
                if(creep.withdraw(nextTombstone, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(nextTombstone, {visualizePathStyle: {stroke: '#000000'}});
                }
            } else {
                var closestStorage = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER ||
                            structure.structureType == STRUCTURE_STORAGE)
                    }
                });
                if (closestStorage) {
                    console.log('Getting energy from storage: ' + JSON.stringify(closestStorage))
                    if(creep.withdraw(closestStorage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(closestStorage, {visualizePathStyle: {stroke: '#000000'}});
                    }
                }
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