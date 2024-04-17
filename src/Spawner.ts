import BodyGenerator from "./BodyGenerator"
import Harvester, { spawnHarvester } from "./Roles/Harvester"
import { spawnHauler } from "./Roles/Hauler"

export default class Spawner {
  private spawnMemory: ICustomSpawnMemory

  constructor(
    private structure: StructureSpawn
  ) {
    this.spawnMemory = this.structure.memory as ICustomSpawnMemory
  }

  spawn() {

    if (!this.spawnMemory.roleTurn) this.spawnMemory.roleTurn = "harvester"

    console.log(`Spawner ${this.structure.name}`)
    const room = this.structure.room

    const energyAvailable = room.energyAvailable
    console.log(`Energy Available ${energyAvailable}`)

    if (energyAvailable >= 300) this.spawnByTurn(room)
  }

  spawnByTurn(room: Room) {
    const turn = this.spawnMemory.roleTurn

    switch (turn) {
      case "harvester":
        spawnHarvester(this.structure, "harvester_" + room.name + Game.time, room)
        this.spawnMemory.roleTurn = "hauler"
        break;
      case "hauler":
        spawnHauler(this.structure, "hauler_" + room.name + Game.time, room)
        this.spawnMemory.roleTurn = "harvester"
        break;
    }
  }
}
