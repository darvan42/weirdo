const MEM_KEY = '_fill'

const assembleAction = require('./action-assemble')

/**
 * @param structureType {StructureConstant}
 * @param creep {Creep}
 */
module.exports = function (structureType, creep) {
  const customMemoryKey = MEM_KEY.concat(structureType)
  /** @param structure {Structure} */
  const filterFun = function (structure) {
    return structure.structureType === structureType && structure?.store.getFreeCapacity(RESOURCE_ENERGY) > 0
  }

  const newTargetOrNull = function () {
    const structures = creep.room.find(FIND_STRUCTURES, { filter: filterFun })
    if (structures.length > 0) {
      return creep.pos.findClosestByPath(structures)
    } else {
      return null
    }
  }

  const getAction = function (target) {
    if (creep.pos.inRangeTo(target.pos, 1)) {
      return () => creep.transfer(target, RESOURCE_ENERGY)
    } else {
      return () => creep.moveTo(target)
    }
  }

  return assembleAction(creep.name, customMemoryKey, newTargetOrNull, getAction)
}
