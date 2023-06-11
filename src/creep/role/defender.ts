import { generateName } from './utils'

export const ROLENAME = 'defender'

export function eachTick (defender: Creep) {
  const intruders = defender.room.find(FIND_HOSTILE_CREEPS)
  const target = defender.pos.findClosestByPath(intruders)
  if (target != null) {
    if (defender.attack(target) == ERR_NOT_IN_RANGE) defender.moveTo(target)
  }
}

export function spawnDefender (spawn: StructureSpawn, energy: number) {
  const numParts = Math.floor(energy / 200)
  const tough = new Array(numParts * 2).fill(TOUGH)
  const move = new Array(numParts * 2).fill(MOVE)
  const attack = new Array(numParts).fill(ATTACK)
  const body = tough.concat(move).concat(attack)

  spawn.spawnCreep(body, generateName(ROLENAME))
}
