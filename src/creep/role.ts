import starter from './role/starter'

export function getRoleFromName (name: string): string {
  name = name.replace(/\d/g, '')
  return name.toLowerCase()
}

export function getFunctionForRole (role: string) {
  switch (role) {
    case 'starter':
      return starter
    default:
      return null
  }
}

export function generateName (role: string) {
  return role + Game.time.toString()
}
