import goTransferEnergy from './goTransferEnergy'
import { getRoleMembersInRoom } from '../role/utils'

export default function (creep: Creep) {
  const spawns = creep.room.find(FIND_MY_SPAWNS)
  const lowestEnergySpawn = getLowestEnergyThing(spawns)
  if (lowestEnergySpawn.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
    goTransferEnergy(creep, lowestEnergySpawn)
  } else {
    // TODO Rollennamen Konstanten besser managen
    const upgraders = getRoleMembersInRoom(creep.room, 'upgrader')
    const lowestUpgrader = getLowestEnergyThing(upgraders)
    goTransferEnergy(creep, lowestUpgrader)
  }
}

function getLowestEnergyThing (things: Array<AnyCreep | AnyStoreStructure>) {
  return things.reduce((prev, curr) => {
    return (prev.store.getFreeCapacity(RESOURCE_ENERGY) > curr.store.getFreeCapacity(RESOURCE_ENERGY)) ? prev : curr
  })
}
