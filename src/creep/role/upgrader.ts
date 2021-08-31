export const ROLE = 'upgrader'

export default function (creep: Creep) {
  if (creep.memory.upgrading === true) {
    if (creep.store.getUsedCapacity(RESOURCE_ENERGY) > 0) {
      const controller = creep.room.controller as StructureController
      if (creep.upgradeController(controller) === ERR_NOT_IN_RANGE) {
        creep.moveTo(controller)
      }
    } else {
      creep.memory.upgrading = false
    }
  } else {
    if (creep.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
      const target = creep.pos.findClosestByPath(FIND_SOURCES) as Source
      if (creep.harvest(target) === ERR_NOT_IN_RANGE) {
        creep.moveTo(target)
      }
    } else {
      creep.memory.upgrading = true
    }
  }
}
