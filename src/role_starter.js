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

module.exports = starterGetNextAction

const combineTasks = require('./task-combine')
const taskMine = require('./task_mine')
const taskFill = require('./task_fill')

function starterGetNextAction (creep) {
  if (creep.store.getFreeCapacity() > 0) {
    return combineTasks([taskMine], creep)
  } else {
    const fillSpawn = creep => taskFill(STRUCTURE_SPAWN, creep)
    return combineTasks([fillSpawn], creep)
  }
}
