import { areStarterNeeded, spawnStarter } from '../creep/role/starter'
import { getNumberMinerNeeded, spawnMiner } from '../creep/role/miner'
import { getNumberUpgraderNeeded, spawnUpgrader } from '../creep/role/upgrader'
import { getNumberCarryNeeded, ROLENAME as CARRY, spawnCarry } from '../creep/role/carry'
import { getNumberBuilderNeeded, spawnBuilder } from '../creep/role/builder'
import { spawnDefender } from '../creep/role/defender'
import { getRoleMembersInRoom } from '../creep/role/utils'

export default function tick (spawn: StructureSpawn) {
  if (spawn.spawning != null) return
  if (spawn.room.energyAvailable < 250) return
  if (areStarterNeeded(spawn.room)) {
    spawnStarter(spawn)
    return
  }
  // Spawn defender if there are intruders
  if (spawn.room.find(FIND_HOSTILE_CREEPS).length > 0) {
    spawnDefender(spawn)
  }

  if (getRoleMembersInRoom(spawn.room, CARRY).length == 0 && spawn.room.find(FIND_DROPPED_RESOURCES).length > 0) {
    spawnCarry(spawn)
  }

  const room = spawn.room
  const functionNeededPairs = [
    {
      spawnFunction: spawnCarry,
      numberNeeded: getNumberCarryNeeded(room)
    },
    {
      spawnFunction: spawnUpgrader,
      numberNeeded: getNumberUpgraderNeeded(room)
    },
    {
      spawnFunction: spawnMiner,
      numberNeeded: getNumberMinerNeeded(room)
    },
    {
      spawnFunction: spawnBuilder,
      numberNeeded: getNumberBuilderNeeded(room)
    }
  ]
  const mostNeeded = functionNeededPairs.reduce((prev, curr) => {
    return (prev.numberNeeded >= curr.numberNeeded) ? prev : curr
  })
  if (mostNeeded.numberNeeded > 0) {
    mostNeeded.spawnFunction(spawn)
  }
}
