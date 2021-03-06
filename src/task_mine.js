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
