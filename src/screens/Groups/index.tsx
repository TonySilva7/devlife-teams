import { Button } from '@components/Button'
import { GroupCard } from '@components/GroupCard'
import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { ListEmpty } from '@components/ListEmpty'
import { useNavigation } from '@react-navigation/native'
import { ComponentProps, useState } from 'react'
import { FlatList } from 'react-native'
import * as S from './styles'

type GroupsProps = ComponentProps<typeof S.Container>

export function Groups({ ...rest }: GroupsProps) {
  const [groups, setGroups] = useState<string[]>([])
  const { navigate } = useNavigation()

  function handleNewGroup() {
    // setGroups((oldState) => [...oldState, 'Turma 1'])
    navigate('new')
  }

  return (
    <S.Container {...rest}>
      <Header />
      <Highlight title="Turma" subtitle="Jogue com a sua turma" />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <GroupCard title={item} />}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={() => (
          <ListEmpty message="Você ainda não possui turmas..." />
        )}
        showsVerticalScrollIndicator={false}
      />

      <Button title="Criar nova turma" onPress={handleNewGroup} />
    </S.Container>
  )
}
