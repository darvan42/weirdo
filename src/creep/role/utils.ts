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
