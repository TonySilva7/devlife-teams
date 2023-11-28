import AsyncStorage from '@react-native-async-storage/async-storage'
import { GROUP_COLLECTION } from '@storage/storage-keys'
import { AppError } from '@utils/exceptions'
import { groupsGetAll } from './get-all'

export async function groupCreate(newGroup: string): Promise<void> {
  try {
    const groups = await groupsGetAll()

    const groupAlreadyExists = groups.includes(newGroup)

    if (groupAlreadyExists) {
      throw new AppError({ message: 'Este grupo já existe!' })
    }

    const newGroups = [...groups, newGroup]
    const storage = JSON.stringify(newGroups)

    await AsyncStorage.setItem(GROUP_COLLECTION, storage)
  } catch (error) {
    console.log(error)
    throw error
  }
}
