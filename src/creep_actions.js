module.exports = {
  pickup: getPickupActionFor,
  harvest: getHarvestActionFor
}

const memH = require('./memory_helper')
const memKey = 'pickup'

function getPickupActionFor (creep, resourceType) {
  // Prüft ob ein Ziel gespeichert ist
  let target = memH.loadTarget(creep, memKey)
  const action = getPickupActionForTarget(creep, target)
  if (action) {
    return action
  }
  const droppedEnergy = creep.room.find(FIND_DROPPED_RESOURCES,
    { filter: { resourceType: resourceType } })
  if (droppedEnergy.length > 0) {
    target = creep.pos.findClosestByPath(droppedEnergy)
    memH.saveTarget(creep, memKey, target)
    return getPickupActionForTarget(creep, target)
  }
}

function getPickupActionForTarget (creep, target) {
  if (target) {
    if (creep.pos.inRangeTo(target.pos, 1)) {
      memH.deleteTarget(creep, memKey)
      return () => creep.pickup(target)
    } else {
      return () => creep.moveTo(target)
    }
  }
}

const HARVEST = 'harvest'

function getHarvestActionFor (creep) {
  let target = memH.loadTarget(creep, HARVEST)
  const action = getHarvestActionForTarget(creep, target)
  if (action) {
    return action
  }
  const sources = creep.room.find(FIND_SOURCES)
  if (sources.length > 0) {
    target = creep.pos.findClosestByPath(sources)
    memH.saveTarget(creep, HARVEST, target)
    return getHarvestActionForTarget(creep, target)
  }
}

function getHarvestActionForTarget (creep, target) {
  if (target) {
    if (creep.pos.inRangeTo(target.pos, 1)) {
      return () => creep.harvest(target)
    } else {
      return () => creep.moveTo(target)
    }
  }
}
