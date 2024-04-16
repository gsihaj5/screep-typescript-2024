import BodyGenerator from "./BodyGenerator"
import Harvester from "./Roles/Harvester"

export default class Spawner {

  constructor(
    private structure: StructureSpawn
  ) {
  }

  spawn() {
    console.log(`Spawner ${this.structure.name}`)
    const energyAvailable = this.structure.room.energyAvailable
    console.log(`Energy Available ${energyAvailable}`)

    if (energyAvailable > 150) {
      this.structure.spawnCreep(BodyGenerator.harvester(), "harvester", { memory: { role: "harvester" } })
    }
  }
}
