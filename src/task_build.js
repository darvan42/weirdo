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
module.exports = function (creep) {
  const MEM_KEY = '_build'
  const newTargetOrNull = function () {
    const targets = creep.room.find(FIND_CONSTRUCTION_SITES)
    if (targets.length > 0) {
      return creep.pos.findClosestByPath(targets)
    }
    return null
  }
  const getAction = target => {
    if (creep.pos.inRangeTo(target, 3)) {
      return () => creep.build(target)
    }
    return () => creep.moveTo(target)
  }
  return assembleAction(creep.name, MEM_KEY, newTargetOrNull, getAction)
}
