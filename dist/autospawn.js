/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('autospawn');
 * mod.thing == 'a thing'; // true
 */

 function spawn(harvesters, role, limit, parts) {
    if(harvesters.length < limit) {
        var newName = role + '-' + Game.time;
        const ret = Game.spawns['Spawn1'].spawnCreep(parts, newName, {memory: {role: role}});
        if (ret === 0) {
            console.log('Spawning new ' + role + ': ' + newName);
        }
        return true
    }
    return false
 }

module.exports.popControl = function() {
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    const pop = _.keys(Game.creeps).length
    if (pop > 22) {
        return
    }
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    var transfers = _.filter(Game.creeps, (creep) => creep.memory.role == 'transfer');
    console.log('Population: ' + harvesters.length + ' H - ' + builders.length + ' B - ' + upgraders.length + ' U - ' + repairers.length + ' R - ' + transfers.length + ' T');

//    const defaultParts = [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE]
//const defaultParts = [WORK,CARRY,WORK,CARRY,MOVE]
    const defaultParts = [WORK,CARRY,WORK]
    if (spawn(harvesters, 'harvester', 2, defaultParts)) {
        return
    }
    if (spawn(builders, 'builder', 2, defaultParts)) {
        return
    }
    if (spawn(upgraders, 'upgrader', 2, defaultParts)) {
        return
    }
    if (spawn(repairers, 'repairer', 2, defaultParts)) {
        return
    }
    const courierParts = [CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE]
    if (spawn(transfers, 'transfer', 2, courierParts)) {
        return        
    }
}
