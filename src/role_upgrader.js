'use strict'

const combineTasks = require('./task-combine')
const taskPickup = require('./task_pickup')
const taskMine = require('./task_mine')
const taskUpgrade = require('./task_upgrade')
/**
 * @param creep {Creep}
 */
module.exports = function (creep) {
  const controller = creep.room.controller
  const pickupEnergy = (creep) => taskPickup(RESOURCE_ENERGY, creep)
  if (controller) {
    if (creep.store.getUsedCapacity(RESOURCE_ENERGY) === 0) {
      return combineTasks([pickupEnergy, taskMine], creep)
    }
    if (creep.store.getFreeCapacity(RESOURCE_ENERGY) === 0) {
      return taskUpgrade(creep)
    }
    if (creep.pos.inRangeTo(controller.pos, 3)) {
      return () => creep.upgradeController(controller)
    } else {
      return combineTasks([pickupEnergy, taskMine], creep)
    }
  } else {
    creep.say('No controller!')
    return null
  }
}
