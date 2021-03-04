'use strict'

module.exports = starterGetNextAction

const combineTasks = require('./task-combine')
const taskMine = require('./task_mine')
const taskFill = require('./task_fill')

function starterGetNextAction (creep) {
  if (creep.store.getFreeCapacity() > 0) {
    return combineTasks([taskMine], creep)
  } else {
    const fillSpawn = creep => taskFill(STRUCTURE_SPAWN, creep)
    return combineTasks([fillSpawn], creep)
  }
}
