/*
 * Copyright 2021 Darvan42
 *
 *  Licensed under the EUPL, Version 1.2 or – as soon they
 * will be approved by the European Commission - subsequent
 * versions of the EUPL (the "Licence");
 *  You may not use this work except in compliance with the
 * Licence.
 *  You may obtain a copy of the Licence at:
 *
 * https://joinup.ec.europa.eu/collection/eupl/eupl-text-eupl-12
 * or the LICENSE folder in this project
 *
 *  Unless required by applicable law or agreed to in
 * writing, software distributed under the Licence is
 * distributed on an "AS IS" basis,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied.
 *  See the Licence for the specific language governing
 * permissions and limitations under the Licence.
 */

'use strict'

const MEM_KEY = '_fill'

const assembleAction = require('./action-assemble')

/**
 * @param structureType {StructureConstant}
 * @param creep {Creep}
 */
module.exports = function (structureType, creep) {
  const customMemoryKey = MEM_KEY.concat(structureType)
  /** @param structure {Structure} */
  const isValidTarget = function (structure) {
    return structure.structureType === structureType && structure?.store.getFreeCapacity(RESOURCE_ENERGY) > 0
  }

  const newTargetOrNull = function () {
    const structures = creep.room.find(FIND_STRUCTURES, { filter: isValidTarget })
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

  return assembleAction(creep.name, customMemoryKey, newTargetOrNull, getAction, isValidTarget)
}
