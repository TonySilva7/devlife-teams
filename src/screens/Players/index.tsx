import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'

import { Container, Form, HeaderList, NumberOfPlayers } from './styles'
import { ComponentProps, useState } from 'react'
import { ButtonIcon } from '@components/ButtonIcon'
import { Input } from '@components/Input'
import { Filter } from '@components/Filter'
import { FlatList } from 'react-native'
import { PlayerCard } from '@components/PlayerCard'
import { ListEmpty } from '@components/ListEmpty'
import { Button } from '@components/Button'

type PlayersProps = ComponentProps<typeof Container>

export function Players({ ...rest }: PlayersProps) {
  const [team, setTeam] = useState('Time A')
  const [players, setPlayers] = useState([])

  return (
    <Container {...rest}>
      <Header isShowBackButton />

      <Highlight
        title="Nome da turma"
        subtitle="adicione a galera e separe os times"
      />

      <Form>
        <Input placeholder="Nome da pessoa" autoCorrect={false} />

        <ButtonIcon icon="add" />
      </Form>

      <HeaderList>
        <FlatList
          data={['Time A', 'Time B']}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />

        <NumberOfPlayers>{players.length}</NumberOfPlayers>
      </HeaderList>

      <FlatList
        data={players}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <PlayerCard name={item} onRemove={() => null} />
        )}
        ListEmptyComponent={() => (
          <ListEmpty message="Não há pessoas nesse time" />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          { paddingBottom: 100 },
          players.length === 0 && { flex: 1 },
        ]}
      />

      <Button title="Remover Turma" type="SECONDARY" />
    </Container>
  )
}
