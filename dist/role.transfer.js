var util = require('util')

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        // TODO: add proper state in creep memory - like in builder
	    if(creep.store[RESOURCE_ENERGY] === 0) {
            // search for tombstones as well
            const nextTombstone = creep.pos.findClosestByPath(FIND_TOMBSTONES, {
                filter: (tombstone) => {
                    return _.sum(tombstone.store) > 0
                }
            })
            if (nextTombstone) {
                if(creep.withdraw(nextTombstone, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(nextTombstone, {visualizePathStyle: {stroke: '#000000'}});
                }
            } else {
                var closestStorage = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER ||
                            structure.structureType == STRUCTURE_STORAGE) && _.sum(structure.store) > creep.store.getCapacity()
                    }
                });
                if (closestStorage) {
                    // console.log('Getting energy from storage: ' + JSON.stringify(closestStorage))
                    if(creep.withdraw(closestStorage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(closestStorage, {visualizePathStyle: {stroke: '#000000'}});
                    }
                }
            }
        }
        else {
            if (!creep.memory.transferTarget) {
                const closestStorage = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (
                            structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_TOWER ||
                            structure.structureType == STRUCTURE_SPAWN) && 
                            (structure.energy < structure.energyCapacity || _.sum(structure.store) < 0);
                    }
                });
                if (closestStorage) {
                    creep.memory.transferTarget = closestStorage.id
                    creep.say('🚆 courier')
                    console.log('Moving with energy to ' + creep.memory.transferTarget)
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