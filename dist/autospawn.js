/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('autospawn');
 * mod.thing == 'a thing'; // true
 */

 function spawn(harvesters, role) {
    if(harvesters.length < 6) {
        var newName = role + '-' + Game.time;
        console.log('Spawning new ' + role + ': ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName,
            {memory: {role: role}});
    }
 }

module.exports.popControl = function() {
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var controllers = _.filter(Game.creeps, (creep) => creep.memory.role == 'controller');
    console.log('Population: ' + harvesters.length + ' H - ' + builders.length + ' B - ' + controllers.length + ' C');

    spawn(harvesters, 'harvester')
    spawn(builders, 'builder')
    spawn(controllers, 'controller')
}
