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
	        creep.say('🚧 repair');
	    }

	    if(creep.memory.building) {
			var percentage = 0.01;
			var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
				filter: (s) => (s.structureType === STRUCTURE_WALL || s.structureType === STRUCTURE_ROAD) &&
				s.hits / s.hitsMax < percentage
			});
			if (!target == 0) {
				if (creep.repair(target) == ERR_NOT_IN_RANGE) {
					creep.moveTo(target);
				}
			}
	    }
	    else {
			var sources = creep.room.find(FIND_SOURCES);
            const index = util.getCreepsSource(creep, sources)
            if(creep.harvest(sources[index]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[index], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
	    }
	}
};

module.exports = roleBuilder;