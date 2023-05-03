import goGetEnergy from '../task/goGetEnergy'
import { generateName, getRoleMembersInRoom } from './utils'

export const ROLENAME = 'upgrader'

export function eachTick (creep: Creep) {
  if (creep.memory.upgrading === true) {
    if (creep.store.getUsedCapacity(RESOURCE_ENERGY) > 0) {
      const controller = creep.room.controller as StructureController
      if (creep.upgradeController(controller) === ERR_NOT_IN_RANGE) {
        creep.moveTo(controller)
      }
    } else {
      creep.memory.upgrading = false
    }
  } else {
    if (creep.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
      goGetEnergy(creep)
    } else {
      creep.memory.upgrading = true
    }
  }
}

export function areUpgraderNeeded (room: Room): boolean {
  return getRoleMembersInRoom(room, ROLENAME).length < 3
}

export function spawnUpgrader (spawn: StructureSpawn) {
  const maxEnergy = spawn.room.energyCapacityAvailable
  const numParts = Math.floor(maxEnergy / 250)
  const work = new Array(numParts).fill(WORK)
  const carry = new Array(numParts).fill(CARRY)
  const move = new Array(numParts * 2).fill(MOVE)
  const body = work.concat(carry).concat(move)
  spawn.spawnCreep(body, generateName(ROLENAME))
}

export function getNumberUpgraderNeeded (room: Room): number {
  const upgraders = getRoleMembersInRoom(room, ROLENAME)
  return 3 - upgraders.length
}
