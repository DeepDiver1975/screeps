
function buildRoad(spawnName, chemin) {
    for (var i = 0; i < chemin.length; i++) 
    {
        Game.spawns[spawnName].room.createConstructionSite(chemin[i].x,chemin[i].y, STRUCTURE_ROAD);
    }
}

module.exports.run = function(spawnName) {
    // only have 10 road sites max
    const sites = Game.spawns[spawnName].room.find(FIND_MY_CONSTRUCTION_SITES);
    if (sites.length > 10) {
        console.log(sites.length + ' sites under construction ....')
        return
    }
    var sources = Game.spawns[spawnName].room.find(FIND_SOURCES);
    for (var j = 0; j < sources.length; j++)
    {
        // spawn <-> sources
        var chemin = Game.spawns[spawnName].pos.findPathTo(sources[j].pos);
        buildRoad(spawnName, chemin)
        // controller <-> sources
        var chemin = Game.spawns[spawnName].room.controller.pos.findPathTo(sources[j].pos);
        buildRoad(spawnName, chemin)
    }
}