'use strict'

const assembleAction = require('./action-assemble')

/**
 *
 * @param resourceType {ResourceConstant}
 * @param creep {Creep}
 */
module.exports = function (resourceType, creep) {
  const MEM_KEY = '_pickup'
  /** @param target {Resource} */
  const isValidTarget = function (target) {
    return target?.resourceType === resourceType && target?.amount > 0
  }
  const getNewTargetOrNull = function () {
    const resources = creep.room.find(FIND_DROPPED_RESOURCES, { filter: isValidTarget })
    if (resources.length > 0) {
      return creep.pos.findClosestByPath(resources)
    } else {
      return null
    }
  }
  const getAction = function (target) {
    if (creep.pos.inRangeTo(target.pos, 1)) {
      return () => creep.pickup(target)
    } else {
      return () => creep.moveTo(target)
    }
  }
  assembleAction(creep.name, MEM_KEY, getNewTargetOrNull, getAction, isValidTarget)
}
