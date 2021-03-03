'use strict'

require('./extends-all')
module.exports.loop = function () {
  for (const name in Game.spawns) {
    Game.spawns[name].tick()
  }
  for (const name in Game.creeps) {
    Game.creeps[name].tick()
  }
}
