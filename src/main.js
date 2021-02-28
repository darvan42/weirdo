'use strict'

require('./extensions')
module.exports.loop = function () {
  console.log('Hello World!')
  Game.spawns.Spawn1.hello()
}
