import goHarvestSource from '../task/goHarvestSource'
import { generateName, getRoleMembersInRoom } from './utils'
import { getMiningPlaces } from '../../room/mining'

export const ROLENAME = 'miner'

export function eachTick (creep: Creep) {
  const sourceID = creep.memory.mineTarget
  if (sourceID != null) {
    goHarvestSource(creep, Game.getObjectById(sourceID))
  } else {
    creep.say('NO MINING TARGET!')
    goHarvestSource(creep)
  }
}

export function areMinerNeeded (room: Room) {
  const sources = room.find(FIND_SOURCES)
  return sources.some(source => getWorkpartsPerSource(source) < 5)
}

export function spawnMiner (spawn: StructureSpawn) {
  const maxEnergy = spawn.room.energyCapacityAvailable
  const workParts = Math.floor(maxEnergy / 150) >= 5 ? 5 : Math.floor(maxEnergy / 150)
  const work = new Array(workParts).fill(WORK)
  const move = new Array(workParts).fill(MOVE)
  const mineTarget = getNewMiningTarget(spawn.room)
  spawn.spawnCreep(work.concat(move), generateName(ROLENAME), { memory: { mineTarget } })
}

function getNewMiningTarget (room: Room): Id<Source> {
  const sources = room.find(FIND_SOURCES)
  const sourceIDWorkPair = {
    sourceID: sources[0].id,
    workparts: getWorkpartsPerSource(sources[0])
  }
  sources.forEach(source => {
    // TODO write more efficient loop
    const workparts = getWorkpartsPerSource(source)
    if (workparts < sourceIDWorkPair.workparts) {
      sourceIDWorkPair.sourceID = source.id
      sourceIDWorkPair.workparts = workparts
    }
  })
  return sourceIDWorkPair.sourceID
}

function getWorkpartsPerSource (source: Source) {
  const creeps = source.room.find(FIND_MY_CREEPS)
  let workparts = 0
  creeps.forEach(creep => {
    if (creep.memory.mineTarget === source.id) workparts += creep.getActiveBodyparts(WORK)
  })
  return workparts
}

export function getNumberMinerNeeded (room: Room) {
  const miners = getRoleMembersInRoom(room, ROLENAME)
  return getMiningPlaces(room) - miners.length
}
