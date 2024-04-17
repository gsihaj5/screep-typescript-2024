import BodyGenerator from "../BodyGenerator"
import ICreepRole from "./ICreepRole"

export default class Hauler implements ICreepRole {
  private memory: ICreepHaulerMemory
  private targetResource?: Resource<RESOURCE_ENERGY>
  private targetStore?: AnyOwnedStructure
  constructor(
    private creep: Creep
  ) {
    this.memory = creep.memory as ICreepHaulerMemory
    if (!this.memory.droppedResourceId) return
    this.targetResource = Game.getObjectById(this.memory.droppedResourceId) as Resource<RESOURCE_ENERGY>

    if (!this.memory.storeId) return
    this.targetStore = Game.getObjectById(this.memory.storeId) as AnyOwnedStructure
  }

  run() {
    if (this.memory.isPickuping == undefined) this.memory.isPickuping = true
    if (this.memory.changeTarget == undefined) this.memory.changeTarget = true;


    if (this.memory.changeTarget) this.changeTarget()

    if (this.creep.carry.getFreeCapacity() == 0 && this.memory.isPickuping) {
      this.memory.isPickuping = false
      this.findStorage()
    }
    if (this.creep.carry.getUsedCapacity() == 0 && !this.memory.isPickuping) {
      this.memory.isPickuping = true
      this.memory.changeTarget = true
    }

    if (this.memory.isPickuping) {
      if (!this.targetResource) return
      if (this.creep.pickup(this.targetResource) == ERR_NOT_IN_RANGE && this.memory.serializedPath)
        this.creep.moveByPath(this.memory.serializedPath)
    } else {
      if (!this.targetStore) return
      if (this.creep.transfer(this.targetStore, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE && this.memory.serializedPath) {
        this.creep.moveByPath(this.memory.serializedPath)
        console.log(this.memory.serializedPath)
      }
    }

  }

  changeTarget() {
    const resources: Resource<RESOURCE_ENERGY>[] = this.creep.room.find(FIND_DROPPED_RESOURCES);
    const targetResource = resources[0]

    this.memory.droppedResourceId = targetResource.id
    const path = this.creep.pos.findPathTo(targetResource)
    this.memory.serializedPath = Room.serializePath(path)
    this.memory.changeTarget = false
  }

  findStorage() {
    const stores: AnyOwnedStructure[] = this.creep.room.find(FIND_MY_STRUCTURES, {
      filter: (type) => (
        type.structureType == STRUCTURE_SPAWN ||
        type.structureType == STRUCTURE_EXTENSION
      )
    });
    const targetStore = stores[0]
    this.memory.storeId = targetStore.id
    const path = this.creep.pos.findPathTo(targetStore)
    this.memory.serializedPath = Room.serializePath(path)
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

