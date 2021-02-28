'use strict'

require('./extensions')
module.exports.loop = function () {
  for (const name in Game.spawns) {
    Game.spawns[name].tick()
  }
}
