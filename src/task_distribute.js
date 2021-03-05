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

const combineTasks = require('./task-combine')
const fillStructure = require('./task_fill_structure')
const fillCreep = require('./task_fill_creep')
const constants = require('./constants')

module.exports = function (creep) {
  const fillSpawn = (creep) => fillStructure(STRUCTURE_SPAWN, creep)
  const fillExtension = (creep) => fillStructure(STRUCTURE_EXTENSION, creep)
  const fillTower = (creep) => fillStructure(STRUCTURE_TOWER, creep)
  const fillBuilder = (creep) => fillCreep(constants.roles.BUILDER, creep)
  const fillUpgrader = creep => fillCreep(constants.roles.UPDGRADER, creep)

  return combineTasks(
    [fillSpawn, fillExtension, fillTower, fillBuilder, fillSpawn, fillUpgrader],
    creep)
}
