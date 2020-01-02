var util = {
    getCreepsSource: function(creep, sources) {
        if (_.isUndefined(creep.memory.source_index)) {
            creep.memory.source_index = Math.floor(Math.random() * sources.length)
            creep.say('🔄 harvesting source ' + creep.memory.source_index);
        }
        return creep.memory.source_index
    },
    loadEnergyToCreep: function(creep) {
        const storedEnergy = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_SPAWN ||
                    structure.structureType == STRUCTURE_EXTENSION)
            }
        }).reduce((sum, struct) => sum + struct.store[RESOURCE_ENERGY], 0)
        if (storedEnergy < 400) {
            return
        }
        var closestStorage = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_SPAWN ||
                    structure.structureType == STRUCTURE_EXTENSION ||
                    structure.structureType == STRUCTURE_CONTAINER ||
                    structure.structureType == STRUCTURE_STORAGE) && _.sum(structure.store) > 0
            }
        });
        if(closestStorage) {
            if(creep.withdraw(closestStorage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(closestStorage, {visualizePathStyle: {stroke: '#000000'}});
            }
        }
    }
};

module.exports = util;