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

const constants = require('./constants')
const assembleAction = require('./action-assemble')
module.exports = function (creepRole, creep) {
  const MEM_KEY = '_fillCreep'
  const isValidTarget = target =>
    target.memory[constants.memory.ROLE] === creepRole &&
    target.store.getFreeCapacity(RESOURCE_ENERGY) > 0
  const newTargetOrNull = function () {
    const targets = creep.room.find(FIND_MY_CREEPS, { filter: isValidTarget })
    if (targets.length > 0) {
      return creep.pos.findClosestByPath(targets)
    }
    return null
  }
  const getAction = function (target) {
    if (creep.pos.inRangeTo(target.pos, 1)) {
      return () => creep.transfer(target, RESOURCE_ENERGY)
    } else {
      return () => creep.moveTo(target)
    }
  }
  return assembleAction(creep.name, MEM_KEY, newTargetOrNull, getAction, isValidTarget)
}
