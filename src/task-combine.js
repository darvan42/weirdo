module.exports = function composeAction (actionGetterList, creep) {
  for (const actionGetter of actionGetterList) {
    const action = actionGetter(creep)
    if (action) {
      return action
    }
  }
}
