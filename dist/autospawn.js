 function spawn( role, parts, name, mem) {
    if (!mem) {
        mem = {}
    }
    mem.role = role
    const ret = Game.spawns['Spawn1'].spawnCreep(parts, name, {memory: mem});
    if (ret === 0) {
        console.log('Spawning new ' + role + ': ' + name);
        return true
    } else {
        console.log('Return on spawning ' + role +' / ' + name + ': ' + ret)
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
    if (pop >= 8) {
        return
    }
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var transfers = _.filter(Game.creeps, (creep) => creep.memory.role == 'transfer');
    console.log('Population: ' + harvesters.length + ' H - ' + builders.length + ' B - ' + upgraders.length + ' U - ' + transfers.length + ' T');

    const defaultParts = [WORK,CARRY,MOVE]
    const courierParts = [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE]
    if (spawn('transfer', courierParts, 'courier-0')) {
        return        
    }
    if (spawn('transfer', courierParts, 'courier-1')) {
        return        
    }
    if (spawn('harvester', [WORK,WORK,WORK,WORK,WORK,CARRY,MOVE], 'miner-0', {source_index:0})) {
        return
    }
    if (spawn('harvester', [WORK,WORK,WORK,WORK,WORK,CARRY,MOVE], 'miner-1', {source_index:1})) {
        return
    }
    if (spawn('builder', defaultParts, 'builder-1')) {
        return
    }
    if (spawn('upgrader', [WORK,WORK,WORK,WORK,CARRY,MOVE], 'upgrader-1')) {
        return
    }
    if (spawn('upgrader', [WORK,WORK,WORK,WORK,CARRY,MOVE], 'upgrader-2')) {
        return
    }
    if (spawn('upgrader', [WORK,WORK,WORK,WORK,CARRY,MOVE], 'upgrader-3')) {
        return
    }
}
