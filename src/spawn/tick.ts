import { areStarterNeeded, spawnStarter } from '../creep/role/starter'
import { getNumberMinerNeeded, spawnMiner } from '../creep/role/miner'
import { getNumberUpgraderNeeded, spawnUpgrader } from '../creep/role/upgrader'
import { getNumberCarryNeeded, spawnCarry } from '../creep/role/carry'
import { getNumberBuilderNeeded, spawnBuilder } from '../creep/role/builder'

export default function tick (spawn: StructureSpawn) {
  if (spawn.spawning != null) return
  if (spawn.room.energyAvailable < 250) return
  if (areStarterNeeded(spawn.room)) {
    spawnStarter(spawn)
    return
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
