function defend (spawnName) {
  const room = Game.spawns[spawnName].room
  const hostiles = room.find(FIND_HOSTILE_CREEPS)
  if (hostiles.length === 0) {
    return false
  }
  var username = hostiles[0].owner.username
  Game.notify(`User ${username} spotted in room ${room.name}`)

  const towers = room.find(FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_TOWER } })
  towers.forEach(tower => tower.attack(hostiles[0]))
  return true
}

function repair (spawnName) {
  const room = Game.spawns[spawnName].room
  const towers = room.find(FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_TOWER } })
  for (var name in towers) {
    const tower = towers[name]
    // only repair if own capacity is over 50%
    const energyLevel = tower.energy / tower.energyCapacity
    if (energyLevel < 0.5) {
      continue
    }
    var percentage = 0.01
    var target = tower.pos.findClosestByRange(FIND_STRUCTURES, {
      filter: (s) => (s.structureType === STRUCTURE_WALL || s.structureType === STRUCTURE_ROAD || s.structureType === STRUCTURE_RAMPART) &&
            s.hits / s.hitsMax < percentage
    })
    if (target) {
      tower.repair(target)
    }
  }
}

module.exports.run = function (spawnName) {
  if (defend(spawnName)) {
    return
  }
  // TODO: heal creep
  repair(spawnName)
}
