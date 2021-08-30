export default function tick (spawn: StructureSpawn) {
  if (spawn.spawning != null) return
  if (spawn.room.energyAvailable < 250) return
  if (spawn.room.find(FIND_MY_CREEPS).length === 0) {
    return spawn.spawnCreep([WORK, CARRY, MOVE, MOVE], `starter${Game.time}`)
  }
  if (spawn.room.controller?.level === 1) {
    switch (spawn.room.find(FIND_MY_CREEPS).length) {
      case 1:
        return spawn.spawnCreep([WORK, CARRY, MOVE, MOVE], `upgrader${Game.time}`)
      case 2:
      case 3:
        return spawn.spawnCreep([WORK, WORK, MOVE], `miner${Game.time}`)
      case 4:
        return spawn.spawnCreep([WORK, CARRY, MOVE, MOVE], `upgrader${Game.time}`)
    }
  }
}
