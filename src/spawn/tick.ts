import { areStarterNeeded, spawnStarter } from '../creep/role/starter'
import { areMinerNeeded, spawnMiner } from '../creep/role/miner'

export default function tick (spawn: StructureSpawn) {
  if (spawn.spawning != null) return
  if (spawn.room.energyAvailable < 250) return
  if (areStarterNeeded(spawn.room)) {
    spawnStarter(spawn)
  } else if (areMinerNeeded(spawn.room)) {
    spawnMiner(spawn)
  }
}
