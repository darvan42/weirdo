import goHarvestSource from './goHarvestSource'

export default function (creep: Creep) {
  // Checks if there is dropped energy
  const droppedEnergy = creep.room.find(FIND_DROPPED_RESOURCES, { filter: RESOURCE_ENERGY })
  if (droppedEnergy.length > 0) {
    const target = creep.pos.findClosestByPath(droppedEnergy) as Resource
    if (creep.pickup(target) === ERR_NOT_IN_RANGE) {
      creep.moveTo(target)
    }
  } else {
    goHarvestSource(creep)
  }
}
