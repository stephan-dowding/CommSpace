import Spaces from "../src/spaces"

describe("spaces", ()=>{
  let spaces
  beforeEach(() => {
    spaces = new Spaces()
  })

  test("it returns undefined for uncreated space", ()=>{
    expect(spaces.get("nonExistentSpace")).toBeUndefined()
  })

  test("it autocreates a space when state sent to an uncreated space", ()=>{
    spaces.sendState("nonExistentSpace", {key: 4})
    expect(spaces.get("nonExistentSpace")).toEqual({key: 4})
  })

  describe("with testSpace", ()=>{
    beforeEach(() => {
      spaces.create("testSpace")
    })

    test("it creates a blank space", ()=>{
      expect(spaces.get("testSpace")).toEqual({})
    })

    test("it allows a space to get state", ()=>{
      spaces.sendState("testSpace", {key: 4})
      expect(spaces.get("testSpace")).toEqual({key: 4})
    })

    test("it prevents external modification", ()=>{
      let state = {key: 4}
      spaces.sendState("testSpace", state)
      state.key = 5
      expect(spaces.get("testSpace")).toEqual({key: 4})
    })

    test("it combines state sent", ()=>{
      spaces.sendState("testSpace", {key1: 4})
      spaces.sendState("testSpace", {key2: 2})
      expect(spaces.get("testSpace")).toEqual({key1: 4, key2: 2})
    })
  })
})
