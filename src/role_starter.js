module.exports = starterGetNextAction

const getActionFrom = require('./task-combine')
const actionMine = require('./task_mine')

function starterGetNextAction (creep) {
  if (creep.store.getFreeCapacity() > 0) {
    return getActionFrom([actionMine], creep)
  }
}
