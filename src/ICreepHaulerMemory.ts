
interface ICreepHaulerMemory extends ICustomCreepMemory {
  sourceId?: string
  roomId?: string
  changeTarget?: boolean

  droppedResourceId?: string
  isPickuping?: boolean
  storeId?:string

}
