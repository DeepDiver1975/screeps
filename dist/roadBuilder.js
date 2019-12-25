

module.exports.run = function(spawnName) {
    // build roads to sources
    var sources = Game.spawns[spawnName].room.find(FIND_SOURCES);
    for (var j = 0; j < sources.length; j++)
    {
        var chemin = Game.spawns[spawnName].pos.findPathTo(sources[j].pos);
        for (var i = 0; i < chemin.length; i++) 
        {
            Game.spawns[spawnName].room.createConstructionSite(chemin[i].x,chemin[i].y, STRUCTURE_ROAD);
        }
    }

    // build roads to the controller
    var chemin = Game.spawns[spawnName].pos.findPathTo(Game.spawns[spawnName].room.controller.pos);
    for (var i = 0; i < chemin.length; i++) 
    {
        Game.spawns[spawnName].room.createConstructionSite(chemin[i].x,chemin[i].y, STRUCTURE_ROAD);
    }
}