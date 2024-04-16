import ICreepRole from "./ICreepRole"

export default class Harvester implements ICreepRole {
  constructor(
    private creep: Creep
  ) { }

  run() {
    console.log("Harvester running")

  }

  harvest() {

  }
}

