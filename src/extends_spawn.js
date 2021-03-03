'use strict'

const constants = require('./constants')
StructureSpawn.prototype.spawnNamedCreep = function (body, opts) {
  const name = `John${Game.time}`
  if (opts) {
    this.spawnCreep(body, name, opts)
  } else {
    this.spawnCreep(body, name)
  }
}

StructureSpawn.prototype.tick = function () {
  if (!this.spawning) {
    const creeps = this.room.find(FIND_MY_CREEPS)
    if (creeps.length === 0) {
      this.spawnNamedCreep([WORK, CARRY, MOVE],
        { memory: { [constants.memory.ROLE]: constants.roles.STARTER } })
    }
  }
}
