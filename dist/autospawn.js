 function spawn(harvesters, role, limit, parts, name, mem) {
    if(harvesters.length < limit) {
        if (!name) {
            name = role + '-' + Game.time;
        }
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
    if (pop > 8) {
        return
    }
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var transfers = _.filter(Game.creeps, (creep) => creep.memory.role == 'transfer');
    console.log('Population: ' + harvesters.length + ' H - ' + builders.length + ' B - ' + upgraders.length + ' U - ' + transfers.length + ' T');

    const defaultParts = [WORK,CARRY,MOVE]
    const courierParts = [CARRY,CARRY,CARRY,CARRY,MOVE]
    if (spawn(transfers, 'transfer', 2, courierParts)) {
        return        
    }
    if (spawn(harvesters, 'harvester', 2, [WORK,WORK,WORK,CARRY,MOVE], 'miner-0', {source_index:0})) {
        return
    }
    if (spawn(harvesters, 'harvester', 2, [WORK,WORK,WORK,CARRY,MOVE], 'miner-1', {source_index:1})) {
        return
    }
    if (spawn(builders, 'builder', 1, defaultParts)) {
        return
    }
    if (spawn(upgraders, 'upgrader', 3, [WORK,WORK,WORK,WORK,CARRY,MOVE])) {
        return
    }
}
