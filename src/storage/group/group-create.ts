import AsyncStorage from '@react-native-async-storage/async-storage'
import { GROUP_COLLECTION } from '@storage/storageKeys'
import { groupsGetAll } from './groups-get-all'

export async function groupCreate(newGroup: string) {
  try {
    const groups = await groupsGetAll()
    const newGroups = [...groups, newGroup]
    const storage = JSON.stringify(newGroups)

    await AsyncStorage.setItem(GROUP_COLLECTION, storage)
  } catch (error) {
    console.log(error)
    throw new Error('Error on create group')
  }
}
