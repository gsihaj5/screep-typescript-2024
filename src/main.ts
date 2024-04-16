import manageCreep from "./CreepManager";
import manageRoom from "./RoomManager";
import Spawner from "./Spawner";

export function loop() {
  const spawner = new Spawner(Game.spawns.Spawn1)
  spawner.spawn()

  manageRoom()
  manageCreep()
}



