import AsyncStorage from '@react-native-async-storage/async-storage'
import { PLAYERS_COLLECTION } from '@storage/storage-keys'
import { AppError } from '@utils/exceptions'
import { IPlayerStorageDTO } from './storage-DTO'
import { playerGetByGroup } from './get-by-group'

export async function playerAddByGroup(
  newPlayer: IPlayerStorageDTO,
  group: string,
): Promise<void> {
  try {
    const players = await playerGetByGroup(group)

    const playerAlreadyExists = players.filter(
      (player) => player.name === newPlayer.name,
    )

    if (playerAlreadyExists.length > 0) {
      throw new AppError({ message: 'Este jogador já existe nesse time!' })
    }

    const newPlayers = [...players, newPlayer]
    const storage = JSON.stringify(newPlayers)

    await AsyncStorage.setItem(`${PLAYERS_COLLECTION}-${group}`, storage)
  } catch (error) {
    console.log(error)
    throw error
  }
}
