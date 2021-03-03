'use strict'

module.exports = starterGetNextAction

const getActionFrom = require('./task-combine')
const actionMine = require('./task_mine')
const taskFill = require('./task_fill')

function starterGetNextAction (creep) {
  if (creep.store.getFreeCapacity() > 0) {
    return getActionFrom([actionMine], creep)
  } else {
    const curryFill = creep1 => taskFill(STRUCTURE_SPAWN, creep1)
    return getActionFrom([curryFill], creep)
  }
}
