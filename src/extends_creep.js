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

const starter = require('./role_starter')
const upgrader = require('./role_upgrader')
const constants = require('./constants')
const transporter = require('./role_transporter')
const miner = require('./task_mine')

Creep.prototype.tick = function () {
  const role = this.memory[constants.memory.ROLE]
  let action
  switch (role) {
    case constants.roles.STARTER:
      action = starter(this)
      break
    case constants.roles.UPDGRADER:
      action = upgrader(this)
      break
    case constants.roles.TRANSPORTER:
      action = transporter(this)
      break
    case constants.roles.MINER:
      action = miner(this)
      break
    default:
      this.say('I\'m bored')
  }
  if (action) {
    action()
  }
}
