'use strict'

require('./extensions')
module.exports.loop = function () {
  console.log('Hello World!')
  // eslint-disable-next-line no-undef
  Game.spawns.Spawn1.hello()
}
