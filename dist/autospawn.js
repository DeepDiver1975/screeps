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
    }
 }

module.exports.popControl = function() {
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    const pop = _.keys(Game.creeps).length
    if (pop > 16) {
        return
    }
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    var transfers = _.filter(Game.creeps, (creep) => creep.memory.role == 'transfer');
    console.log('Population: ' + harvesters.length + ' H - ' + builders.length + ' B - ' + upgraders.length + ' U - ' + repairers.length + ' R - ' + transfers.length + ' T');

    spawn(harvesters, 'harvester', 6, [WORK,WORK,WORK,CARRY,MOVE,WORK,CARRY,MOVE,MOVE])
    spawn(builders, 'builder', 3, [WORK,WORK,WORK,CARRY,MOVE,WORK,CARRY,MOVE,MOVE])
    spawn(upgraders, 'upgrader', 4, [WORK,WORK,WORK,CARRY,MOVE,WORK,CARRY,MOVE,MOVE])
    spawn(repairers, 'repairer', 2, [WORK,WORK,WORK,CARRY,MOVE,WORK,CARRY,MOVE,MOVE])
    spawn(transfers, 'transfers', 1, [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE])
}
