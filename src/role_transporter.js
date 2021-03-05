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

const pickupTask = require('./task_pickup')
const distributeTask = require('./task_distribute')
module.exports = function (creep) {
  if (creep.getFreeCapacity(RESOURCE_ENERGY) > 0) {
    return pickupTask(RESOURCE_ENERGY, creep)
  } else {
    return distributeTask(creep)
  }
}
