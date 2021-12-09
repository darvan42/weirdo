import goHarvestSource from '../task/goHarvestSource'

export const ROLE = 'miner'
export default function (creep: Creep) {
  const sourceID = creep.memory.mine_target
  if (sourceID != null) {
    goHarvestSource(creep, Game.getObjectById(sourceID))
  } else {
    creep.say('NO MINING TARGET!')
    goHarvestSource(creep)
  }
}
