const MEMORY_KEY = '_mine'
const assembleAction = require('./action-assemble')

function getActionOrNull (creep) {
  const newTargetOrNull = function () {
    const sources = creep.room.find(FIND_SOURCES)
    if (sources.length === 0) {
      return null
    } else {
      return creep.pos.findClosestByPath(sources)
    }
  }
  const getAction = function (target) {
    if (creep.pos.inRangeTo(target.pos, 1)) {
      return () => creep.harvest(target)
    } else {
      return () => creep.moveTo(target)
    }
  }
  return assembleAction(creep.name, MEMORY_KEY, newTargetOrNull, getAction)
}

module.exports = getActionOrNull
