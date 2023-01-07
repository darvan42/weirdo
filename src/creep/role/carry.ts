import { generateName, getRoleMembersInRoom } from './utils'
import goGetEnergy from '../task/goGetEnergy'
import goDistributeEnergy from '../task/goDistributeEnergy'
import { deserializeRoomPosition, serializeRoomPosition } from '../../room/utils'

export const ROLENAME = 'carry'

export function eachTick (carry: Creep) {
  if (carry.store.getUsedCapacity(RESOURCE_ENERGY) > 0) {
    goDistributeEnergy(carry)
  } else {
    goGetEnergy(carry, getHome(carry))
  }
}

function getHome (carry: Creep): RoomPosition {
  const cache = carry.memory.home
  if (cache != null) {
    return deserializeRoomPosition(cache)
  } else {
    const home = calcHome(carry)
    carry.memory.home = serializeRoomPosition(home)
    return home
  }
}

function calcHome (carry: Creep): RoomPosition {
  const sources = carry.room.find(FIND_SOURCES)
  const sourceHashMap = sources.reduce((acc: { [index: string]: number }, curr) => {
    acc[serializeRoomPosition(curr.pos)] = 0
    return acc
  }, {})
  const carries = getRoleMembersInRoom(carry.room, ROLENAME)
  carries.forEach(carry => {
    const cache = carry.memory.home
    if (cache != null) {
      sourceHashMap[cache]++
    }
  })
  const winner = Object.entries(sourceHashMap).sort((a, b) => a[1] - b[1])[0]
  return deserializeRoomPosition(winner[0])
}

export function areCarryNeeded (room: Room) {
  const carries = getRoleMembersInRoom(room, ROLENAME)
  return carries.length < 2
}

export function spawnCarry (spawn: StructureSpawn) {
  const numParts = Math.floor(spawn.room.energyCapacityAvailable / 100)
  const carry = new Array(numParts).fill(CARRY)
  const move = new Array(numParts).fill(MOVE)
  const body = carry.concat(move)
  spawn.spawnCreep(body, generateName(ROLENAME))
}

export function getNumberCarryNeeded (room: Room): number {
  const carries = getRoleMembersInRoom(room, ROLENAME)
  return 4 - carries.length
}
