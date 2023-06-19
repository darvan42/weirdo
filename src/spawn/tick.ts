import { areStarterNeeded, spawnStarter } from '../creep/role/starter'
import { getRoleMembersInRoom } from '../creep/role/utils'
import { ROLENAME as MINER, spawnMiner } from '../creep/role/miner'
import { ROLENAME as CARRY, spawnCarry } from '../creep/role/carry'
import { ROLENAME as UPGRADER } from '../creep/role/upgrader'
import { ROLENAME as BUILDER } from '../creep/role/builder'
import { ROLENAME as STARTER } from '../creep/role/starter'

export default function tick (spawn: StructureSpawn) {
  if (spawn.spawning != null) return
  if (spawn.room.energyAvailable < 250) return

  // Head count
  const miners = getRoleMembersInRoom(spawn.room, MINER)
  const carries = getRoleMembersInRoom(spawn.room, CARRY)
  const upgraders = getRoleMembersInRoom(spawn.room, UPGRADER)
  const builders = getRoleMembersInRoom(spawn.room, BUILDER)
  const starters = getRoleMembersInRoom(spawn.room, STARTER)

  if(spawn.room.find(FIND_MY_CREEPS).length <= 0) {
    spawnStarter(spawn)
  }

  if (miners.length <= 0) {
    spawnMiner(spawn, spawn.room.energyAvailable)
    return
  }

  if (carries.length <= 0) {
    spawnCarry(spawn, spawn.room.energyAvailable)
  }
}
