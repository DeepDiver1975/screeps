var util = require('util')

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
	        creep.memory.building = true;
	        creep.say('🚧 build');
	    }

	    if(creep.memory.building) {
			const closestContructionSite = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
            if(closestContructionSite) {
                if(creep.build(closestContructionSite) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(closestContructionSite, {visualizePathStyle: {stroke: '#ffffff'}});
                }
			}
	    }
	    else {
			var sources = creep.room.find(FIND_SOURCES);
            const index = util.getCreepsSource(creep)
            if(creep.harvest(sources[index]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[index], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
	    }
	}
};

module.exports = roleBuilder;