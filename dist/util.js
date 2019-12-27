var util = {

    getCreepsSource: function(creep) {
        var sources = creep.room.find(FIND_SOURCES);
        if (_.isUndefined(creep.memory.source_index)) {
            creep.memory.source_index = Math.floor(Math.random() * sources.length)
            creep.say('🔄 harvesting source ' + creep.memory.source_index);
        }
        return creep.memory.source_index
	}
};

module.exports = util;