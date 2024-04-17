import BodyGenerator from "../BodyGenerator"
import ICreepRole from "./ICreepRole"

export default class Hauler implements ICreepRole {
  private memory: ICustomCreepMemory
  constructor(
    private creep: Creep
  ) {
    this.memory = creep.memory as ICustomCreepMemory
  }

  run() {
    const resources: Resource<RESOURCE_ENERGY>[] = this.creep.room.find(FIND_DROPPED_RESOURCES);

    //go take 
    //find storage path 
    //bring back to storage
    //repeat
  }

  findPathToResource() {
    return
  }

}

export function spawnHauler(
  spawner: StructureSpawn,
  name: string,
  room: Room
) {
  console.log("spawning Hauler")
  const roomMemory = room.memory as ICustomRoomMemory
  for (const sourceId in roomMemory.sources) {
    const availability = roomMemory.sources[sourceId];
    if (!availability) continue

    if (availability.haulerSpot > 0) {
      spawner.spawnCreep(BodyGenerator.hauler(), name, {
        memory: {
          role: "hauler",
          sourceId: sourceId,
          roomId: room.name
        }
      })
      availability.haulerSpot--;
      break;
    }
  }
  console.log("No more Hauler Spot")
}

