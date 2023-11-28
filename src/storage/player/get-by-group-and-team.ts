import { playerGetByGroup } from './get-by-group'
import { IPlayerStorageDTO } from './storage-DTO'

export async function playerGetByGroupAndTeam(
  group: string,
  team: string,
): Promise<IPlayerStorageDTO[]> {
  try {
    const storage = await playerGetByGroup(group)
    const players: IPlayerStorageDTO[] = storage.filter(
      (player) => player.team === team,
    )

    return players
  } catch (error) {
    console.log(error)
    throw error
  }
}
