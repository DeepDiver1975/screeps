var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleTransfer = require('role.transfer');
var autospawn = require('autospawn');
var roadBuilder = require('roadBuilder')
const tower = require('tower')

module.exports.loop = function () {

    autospawn.popControl();
    //roadBuilder.run('Spawn1');
    tower.run('Spawn1')

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'transfer') {
            roleTransfer.run(creep);
        }
    }

    // debug section below
    const structs = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_CONTAINER)
        }
    });
    for(var name in structs) {
        const s = structs[name]
        console.log(name + ' (' + s.structureType + '):' + s.hits + '/' + s.hitsMax + ' = ' + s.hits / s.hitsMax + ' - ' + (s.hits / s.hitsMax < 0.01))
    }
}