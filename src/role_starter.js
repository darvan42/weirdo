module.exports = starterGetNextAction

const actions = require('./creep_actions')

function starterGetNextAction (creep) {
  if (creep.store.getFreeCapacity() > 0) {
    let action = actions.pickup(creep, RESOURCE_ENERGY)
    if (action) {
      return action
    }
    action = actions.harvest(creep)
    if (action) {
      return action
    }
  }
}
