import goGetEnergy from '../task/goGetEnergy'

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
      goGetEnergy(creep)
    } else {
      creep.memory.upgrading = true
    }
  }
}
