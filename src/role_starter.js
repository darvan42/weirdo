module.exports = starterGetNextAction

const getActionFrom = require('./action-compose')
const actionMine = require('./action_mine')

function starterGetNextAction (creep) {
  if (creep.store.getFreeCapacity() > 0) {
    return getActionFrom([actionMine], creep)
  }
}
