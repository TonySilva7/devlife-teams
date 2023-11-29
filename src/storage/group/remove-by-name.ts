import AsyncStorage from '@react-native-async-storage/async-storage'

import { GROUP_COLLECTION, PLAYERS_COLLECTION } from '@storage/storage-keys'

import { groupsGetAll } from './get-all'

export async function groupRemoveByName(groupDeleted: string) {
  try {
    const storedGroups = await groupsGetAll()

    const groups = storedGroups.filter((group) => group !== groupDeleted)

    await AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify(groups))
    await AsyncStorage.removeItem(`${PLAYERS_COLLECTION}-${groupDeleted}`)
  } catch (error) {
    throw new Error('Algo deu errado ao remover o grupo')
  }
}
