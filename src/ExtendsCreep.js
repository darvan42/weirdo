const starter = require('./role_starter')
const constants = require('./constants')

Creep.prototype.tick = function () {
  const role = this.memory[constants.memory.ROLE]
  let action
  switch (role) {
    case constants.roles.STARTER:
      action = starter(this)
      break
    default:
      this.say('I\'m bored')
  }
  if (action) {
    action()
  }
}
