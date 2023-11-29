import { Button } from '@components/Button'
import { GroupCard } from '@components/GroupCard'
import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { ListEmpty } from '@components/ListEmpty'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { groupsGetAll } from '@storage/group/get-all'
import { ComponentProps, useCallback, useState } from 'react'
import { Alert, FlatList } from 'react-native'
import * as S from './styles'
import { Loading } from '@components/Loading'

type GroupsProps = ComponentProps<typeof S.Container>

export function Groups({ ...rest }: GroupsProps) {
  const [groups, setGroups] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const { navigate } = useNavigation()

  function handleNewGroup() {
    // setGroups((oldState) => [...oldState, 'Turma 1'])
    navigate('new')
  }

  async function fetchGroups() {
    try {
      setIsLoading(true)

      const groups = await groupsGetAll()
      setGroups(groups)
    } catch (error) {
      Alert.alert('Turmas', 'Não foi possível carregar as turmas')

      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleOpenGroup = (groupName: string) => {
    navigate('players', { group: groupName })
  }

  useFocusEffect(
    useCallback(() => {
      fetchGroups()
    }, []),
  )

  return (
    <S.Container {...rest}>
      <Header />
      <Highlight title="Turma" subtitle="Jogue com a sua turma" />

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={groups}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <GroupCard title={item} onPress={() => handleOpenGroup(item)} />
          )}
          contentContainerStyle={groups.length === 0 && { flex: 1 }}
          ListEmptyComponent={() => (
            <ListEmpty message="Que tal cadastrar a primeira turma?" />
          )}
        />
      )}

      <Button title="Criar nova turma" onPress={handleNewGroup} />
    </S.Container>
  )
}
