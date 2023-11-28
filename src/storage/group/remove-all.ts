import AsyncStorage from '@react-native-async-storage/async-storage'
import { GROUP_COLLECTION } from '@storage/storage-keys'

export async function removeAllGroups(): Promise<void> {
  try {
    await AsyncStorage.removeItem(GROUP_COLLECTION)
  } catch (error) {
    console.log(error)
    throw new Error('Error on remove all groups')
  }
}
