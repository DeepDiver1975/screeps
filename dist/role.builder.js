var util = require('util')

var roleBuilder = {
	repairStructures: function(percent, types) {
		var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
			filter: (s) => types.includes(s.structureType) &&
			s.hits / s.hitsMax < percent
		});
		if (target) {
			if (creep.repair(target) == ERR_NOT_IN_RANGE) {
				creep.moveTo(target);
			}
			return true
		}
		return false
	},

	constructStructures: function() {
		const closestContructionSite = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
		if(closestContructionSite) {
			if(creep.build(closestContructionSite) == ERR_NOT_IN_RANGE) {
				creep.moveTo(closestContructionSite, {visualizePathStyle: {stroke: '#ffffff'}});
			}
			return true
		}
		return false
	},

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
			// emergency repair - this stops building operations
			if (this.repairStructures(0.1, [STRUCTURE_CONTAINER, STRUCTURE_RAMPART])) {
				return
			}
			// build new structures
			if (this.constructStructures()) {
				return
			}
			// nothing to build: repair then
			if (this.repairStructures(0.5, [STRUCTURE_CONTAINER, STRUCTURE_RAMPART, STRUCTURE_ROAD])) {
				return
			}
			if (this.repairStructures(0.1,[STRUCTURE_WALL])) {
				return
			}
	    }
	    else {
			util.loadEnergyToCreep(creep)
	    }
	}
};

module.exports = roleBuilder;