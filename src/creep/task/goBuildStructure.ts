export default function (creep: Creep, building?: ConstructionSite | null) {
  if (building != null) {
    goBuild(creep, building)
    return
  }

  building = creep.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES)
  if (building == null) {
    creep.say('Nothing to build!')
    return
  }

  goBuild(creep, building)
}

function goBuild (creep: Creep, site: ConstructionSite) {
  if (creep.build(site) == ERR_NOT_IN_RANGE) {
    creep.moveTo(site)
  }
}
