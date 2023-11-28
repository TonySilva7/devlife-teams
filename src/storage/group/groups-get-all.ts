import AsyncStorage from '@react-native-async-storage/async-storage'
import { GROUP_COLLECTION } from '@storage/storageKeys'

export async function groupsGetAll() {
  try {
    const storage = await AsyncStorage.getItem(GROUP_COLLECTION)
    const groups = storage ? JSON.parse(storage) : []

    return groups
  } catch (error) {
    console.log(error)
    throw new Error('Error on get all groups')
  }
}
