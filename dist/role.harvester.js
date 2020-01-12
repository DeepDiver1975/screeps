var util = require('util')

var roleHarvester = {

    transferTo: function(creep, type) {
        var closestStorage = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType === type) && 
                    (structure.energy < structure.energyCapacity || _.sum(structure.store) < structure.store.getCapacity());
            }
        });
        if(closestStorage) {
            if(creep.transfer(closestStorage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(closestStorage, {visualizePathStyle: {stroke: '#ffffff'}});
            }
            return true
        }
        return false
    },

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.store.getFreeCapacity() > 0) {
            const sources = creep.room.find(FIND_SOURCES);
            const index = creep.memory.source_index
            if(creep.harvest(sources[index]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[index], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            if (this.transferTo(creep, STRUCTURE_CONTAINER)) {
                return
            }
            if (this.transferTo(creep, STRUCTURE_EXTENSION)) {
                return
            }
            if (this.transferTo(creep, STRUCTURE_SPAWN)) {
                return
            }
            if (this.transferTo(creep, STRUCTURE_TOWER)) {
                return
            }
            if (this.transferTo(creep, STRUCTURE_STORAGE)) {
                return
            }
        }
	}
};

module.exports = roleHarvester;