'use strict'

const starter = require('./role_starter')
const upgrader = require('./role_upgrader')
const constants = require('./constants')

Creep.prototype.tick = function () {
  const role = this.memory[constants.memory.ROLE]
  let action
  switch (role) {
    case constants.roles.STARTER:
      action = starter(this)
      break
    case constants.roles.UPDGRADER:
      action = upgrader(this)
      break
    default:
      this.say('I\'m bored')
  }
  if (action) {
    action()
  }
}
