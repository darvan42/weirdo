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

const assembleAction = require('./action-assemble')

/**
 *
 * @param resourceType {ResourceConstant}
 * @param creep {Creep}
 */
module.exports = function (resourceType, creep) {
  const MEM_KEY = '_pickup'
  /** @param target {Resource} */
  const isValidTarget = function (target) {
    return target?.resourceType === resourceType && target?.amount > 0
  }
  const getNewTargetOrNull = function () {
    const resources = creep.room.find(FIND_DROPPED_RESOURCES, { filter: isValidTarget })
    if (resources.length > 0) {
      return creep.pos.findClosestByPath(resources)
    } else {
      return null
    }
  }
  const getAction = function (target) {
    if (creep.pos.inRangeTo(target.pos, 1)) {
      return () => creep.pickup(target)
    } else {
      return () => creep.moveTo(target)
    }
  }
  assembleAction(creep.name, MEM_KEY, getNewTargetOrNull, getAction, isValidTarget)
}
