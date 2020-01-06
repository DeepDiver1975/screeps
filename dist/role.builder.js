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
			} else {
				// nothing to build: repair then
				var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
					filter: (s) => (s.structureType === STRUCTURE_ROAD || s.structureType === STRUCTURE_CONTAINER || s.structureType === STRUCTURE_RAMPART) &&
					s.hits / s.hitsMax < 0.5
				});
				if (!target) {
					target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
						filter: (s) => (s.structureType === STRUCTURE_WALL) &&
						s.hits / s.hitsMax < 0.1
					});
				}
				if (target) {
					if (creep.repair(target) == ERR_NOT_IN_RANGE) {
						creep.moveTo(target);
					}
				}
			}
	    }
	    else {
			util.loadEnergyToCreep(creep)
	    }
	}
};

module.exports = roleBuilder;