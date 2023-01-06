import goGetEnergy from '../task/goGetEnergy'
import goBuildStructure from '../task/goBuildStructure'

export const ROLENAME = 'builder'

export function eachTick (creep: Creep) {
  if (creep.memory.building && creep.store.getUsedCapacity(RESOURCE_ENERGY) > 0) {
    goBuildStructure(creep)
  } else {
    goGetEnergy(creep)
  }
}
