import goTransferEnergy from './goTransferEnergy'

export default function (creep: Creep) {
  const spawns = creep.room.find(FIND_MY_SPAWNS)
  const lowestEnergySpawn = spawns.reduce((prev, current) => {
    return (prev.store.getFreeCapacity(RESOURCE_ENERGY) > current.store.getFreeCapacity(RESOURCE_ENERGY)) ? prev : current
  })
  if (lowestEnergySpawn.store.getFreeCapacity(RESOURCE_ENERGY) === 0) {
    creep.say('All spawns full!')
  } else {
    goTransferEnergy(creep, lowestEnergySpawn)
  }
}
