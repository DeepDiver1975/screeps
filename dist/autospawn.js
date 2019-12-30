/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('autospawn');
 * mod.thing == 'a thing'; // true
 */

 function spawn(harvesters, role, limit) {
    if(harvesters.length < limit) {
        var newName = role + '-' + Game.time;
        const ret = Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE,WORK,CARRY,MOVE], newName, {memory: {role: role}});
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
    if (pop > 15) {
        return
    }
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    console.log('Population: ' + harvesters.length + ' H - ' + builders.length + ' B - ' + upgraders.length + ' U - ' + repairers.length + ' R');

    spawn(harvesters, 'harvester', 5)
    spawn(builders, 'builder', 4)
    spawn(upgraders, 'upgrader', 4)
    spawn(repairers, 'repairer', 2)
}
