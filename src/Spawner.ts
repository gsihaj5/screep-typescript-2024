import BodyGenerator from "./BodyGenerator"
import Harvester, { spawnHarvester } from "./Roles/Harvester"

export default class Spawner {

  constructor(
    private structure: StructureSpawn
  ) {
  }

  spawn() {
    console.log(`Spawner ${this.structure.name}`)
    const room = this.structure.room
    const roomMemory = room.memory as ICustomRoomMemory

    const energyAvailable = room.energyAvailable
    console.log(`Energy Available ${energyAvailable}`)

    if (energyAvailable > 150) {
      spawnHarvester(this.structure, "harvester_" + room.name + Game.time, roomMemory)

    }
  }
}
