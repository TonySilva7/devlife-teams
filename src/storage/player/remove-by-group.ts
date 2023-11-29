import AsyncStorage from '@react-native-async-storage/async-storage'
import { PLAYERS_COLLECTION } from '@storage/storage-keys'
import { playerGetByGroup } from './get-by-group'

export async function playerRemoveByGroup(
  playerName: string,
  group: string,
): Promise<void> {
  try {
    const storage = await playerGetByGroup(group)
    const filtered = storage.filter((item) => item.name !== playerName)

    const newPlayers = JSON.stringify(filtered)

    await AsyncStorage.setItem(`${PLAYERS_COLLECTION}-${group}`, newPlayers)
  } catch (error) {
    console.log(error)
    throw new Error('Error on remove all groups')
  }
}
