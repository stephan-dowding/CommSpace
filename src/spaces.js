import Immutable from "Immutable"

export default class Spaces {
  constructor(){
    this.allSpaces = {}
  }

  create(spaceName){
    this.allSpaces[spaceName] = Immutable.fromJS({})
  }

  get(spaceName){
    return this.allSpaces[spaceName] ? this.allSpaces[spaceName].toJS() : undefined
  }

  sendState(spaceName, state){
    if (!this.allSpaces[spaceName]) this.create(spaceName)
    this.allSpaces[spaceName] = this.allSpaces[spaceName].mergeDeep(state)
  }
}
