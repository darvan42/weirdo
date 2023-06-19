/**
 * Creates the rolename from an unique creepname
 * through stripping the creation time at the end
 * which is unique for each creep.
 * @param name
 */
export function getRoleFromName (name: string): string {
  name = name.replace(/\d/g, '')
  return name.toLowerCase()
}

export function generateName (role: string) {
  return role + Game.time.toString()
}

export function getRoleMembersInRoom (room: Room, role: string): Creep[] {
  return room.find(FIND_MY_CREEPS, { filter: creep => getRoleFromName(creep.name) === role })
}

/**
 * Calculates a creep body with the ratio WORK CARRY 2xMOVE
 * @param energy
 * @param max
 */
export function calcWCMM (energy: number, max: number = 12): BodyPartConstant[] {
  const numberPossibleSeries = Math.floor(energy / 250)
  const numSeries = numberPossibleSeries >= max ? max : numberPossibleSeries
  const work = new Array(numSeries).fill(WORK)
  const carry = new Array(numSeries).fill(CARRY)
  const move = new Array(numSeries * 2).fill(MOVE)
  return work.concat(carry).concat(move)
}
