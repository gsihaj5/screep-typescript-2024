import BodyGenerator from "../BodyGenerator"
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

export function spawnHarvester(
  spawner: StructureSpawn,
  name: string,
  roomMemory: ICustomRoomMemory
) {
  for (const sourceId in roomMemory.sources) {
    const availability = roomMemory.sources[sourceId];
    if (!availability) continue

    if (availability.availableSpot > 0) {
      spawner.spawnCreep(BodyGenerator.harvester(), name, {
        memory: {
          role: "harvester",
          sourceId: sourceId
        }
      })
      availability.availableSpot--;
      break;
    }
  }
  console.log("no more available spot in this room")
}

