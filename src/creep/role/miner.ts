import goHarvestSource from '../task/goHarvestSource'

export const ROLE = 'miner'
export default function (creep: Creep) {
  goHarvestSource(creep)
}
