function defend (spawnName) {
    const room = Game.spawns[spawnName].room
    const hostiles = room.find(FIND_HOSTILE_CREEPS);
    if (hostiles.length === 0) {
        return false
    }
    var username = hostiles[0].owner.username;
    Game.notify(`User ${username} spotted in room ${room.name}`);

    const towers = room.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
    towers.forEach(tower => tower.attack(hostiles[0]));
    return true
}

function repair () {
    // TODO: only repair if own capacity is over 50%
    var percentage = 0.01;
    var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (s) => (s.structureType === STRUCTURE_WALL || s.structureType === STRUCTURE_ROAD) &&
        s.hits / s.hitsMax < percentage
    });
    if (target) {
        tower.repair(target)
    }
}

module.exports.run = function(spawnName) {
    if (defend(spawnName)) {
        return
    }
    // TODO: heal creep
    repair(spawnName)
}
