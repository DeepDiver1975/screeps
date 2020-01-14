var util = require('util')

var roleHarvester = {

  /** @param {Creep} creep **/
  run: function (creep) {
    if (creep.memory.deliver && creep.store[RESOURCE_ENERGY] === 0) {
      creep.memory.deliver = false
      creep.say('🚆 fillup')
    }
    if (!creep.memory.deliver && creep.store.getFreeCapacity() === 0) {
      creep.memory.deliver = true
      creep.say('🚆 deliver')
    }

    if (!creep.memory.deliver) {
      // search for tombstones as well
      const nextTombstone = creep.pos.findClosestByPath(FIND_TOMBSTONES, {
        filter: (tombstone) => {
          return _.sum(tombstone.store) > 0
        }
      })
      if (nextTombstone) {
        if (creep.withdraw(nextTombstone, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          creep.moveTo(nextTombstone, { visualizePathStyle: { stroke: '#000000' } })
        }
      } else {
        var closestStorage = creep.pos.findClosestByPath(FIND_STRUCTURES, {
          filter: (structure) => {
            return structure.structureType === STRUCTURE_CONTAINER && _.sum(structure.store) > creep.store.getCapacity()
          }
        })
        if (closestStorage) {
          // console.log('Getting energy from storage: ' + JSON.stringify(closestStorage))
          if (creep.withdraw(closestStorage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(closestStorage, { visualizePathStyle: { stroke: '#000000' } })
          }
        }
      }
    } else {
      if (!creep.memory.transferTarget) {
        // refill towers if we are under attack
        if (util.underAttack(creep.room)) {
          closestStorage = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) => {
              return structure.structureType === STRUCTURE_TOWER &&
                                (structure.energy < structure.energyCapacity || _.sum(structure.store) < structure.store.getCapacity())
            }
          })
        } else {
          closestStorage = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) => {
              return (
                structure.structureType === STRUCTURE_EXTENSION ||
                                structure.structureType === STRUCTURE_SPAWN) &&
                                (structure.energy < structure.energyCapacity || _.sum(structure.store) < structure.store.getCapacity())
            }
          })
          if (!closestStorage) {
            closestStorage = creep.pos.findClosestByPath(FIND_STRUCTURES, {
              filter: (structure) => {
                return structure.structureType === STRUCTURE_TOWER &&
                                    (structure.energy < structure.energyCapacity || _.sum(structure.store) < structure.store.getCapacity())
              }
            })
          }
          if (!closestStorage) {
            closestStorage = creep.pos.findClosestByPath(FIND_STRUCTURES, {
              filter: (structure) => {
                return structure.structureType === STRUCTURE_STORAGE &&
                                    (structure.energy < structure.energyCapacity || _.sum(structure.store) < structure.store.getCapacity())
              }
            })
          }
        }
        if (closestStorage) {
          creep.memory.transferTarget = closestStorage.id
        }
      }
      if (creep.memory.transferTarget) {
        const storage = Game.getObjectById(creep.memory.transferTarget)
        if (creep.transfer(storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          creep.moveTo(storage, { visualizePathStyle: { stroke: '#ffffff' } })
        } else {
          creep.memory.transferTarget = null
        }
      }
    }
  }
}

module.exports = roleHarvester
