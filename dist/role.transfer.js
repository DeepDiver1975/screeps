var util = require('util')

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.store[RESOURCE_ENERGY] === 0) {
            // search for tombstones as well
            const nextTombstone = creep.pos.findClosestByRange(FIND_TOMBSTONES, {
                filter: (tombstone) => {
                    return _.sum(tombstone.store) > 0
                }
            })
            if (nextTombstone) {
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
            if (!creep.memory.transferTarget) {
                const closestStorage = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_TOWER ||
                            structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_SPAWN) && 
                            (structure.energy < structure.energyCapacity || _.sum(structure.store) < structure.store.getCapacity());
                    }
                });
                if (closestStorage) {
                    creep.memory.transferTarget = closestStorage.id
                    creep.say('🚆 courier')
                    console.log('Moving with energy to ' + creep.memory.transferTarge))
                }
            }
            if(creep.memory.transferTarget) {
                const storage = Game.getObjectById(creep.memory.transferTarget)
                if(creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storage, {visualizePathStyle: {stroke: '#ffffff'}});
                } else {
                    creep.memory.transferTarget = null
                }
            }
        }
	}
};

module.exports = roleHarvester;