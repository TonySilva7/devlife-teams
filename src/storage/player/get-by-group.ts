import AsyncStorage from '@react-native-async-storage/async-storage'

import { IPlayerStorageDTO } from './storage-DTO'
import { PLAYERS_COLLECTION } from '@storage/storage-keys'

export async function playerGetByGroup(
  group: string,
): Promise<IPlayerStorageDTO[]> {
  try {
    const storage = await AsyncStorage.getItem(`${PLAYERS_COLLECTION}-${group}`)
    const players: IPlayerStorageDTO[] = storage ? JSON.parse(storage) : []

    return players
  } catch (error) {
    console.log(error)
    throw error
  }
}
