'use strict'

/**
 *
 * @param creep {Creep}
 */
module.exports = function (creep) {
  const controller = creep.room.controller
  if (controller) {
    if (creep.pos.inRangeTo(controller, 3)) {
      return () => creep.upgradeController(controller)
    } else {
      return () => creep.moveTo(controller)
    }
  } else {
    return null
  }
}
