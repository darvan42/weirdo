import starter from './role/starter'
import upgrader from './role/upgrader'
import miner from './role/miner'

export function getFunctionForRole (role: string) {
  switch (role) {
    case 'starter':
      return starter
    case 'upgrader':
      return upgrader
    case 'miner':
      return miner
    default:
      return null
  }
}
