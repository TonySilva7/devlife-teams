import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'

import { Container, Form, HeaderList, NumberOfPlayers } from './styles'
import { ComponentProps, useCallback, useEffect, useRef, useState } from 'react'
import { ButtonIcon } from '@components/ButtonIcon'
import { Input } from '@components/Input'
import { Filter } from '@components/Filter'
import { Alert, FlatList, TextInput } from 'react-native'
import { PlayerCard } from '@components/PlayerCard'
import { ListEmpty } from '@components/ListEmpty'
import { Button } from '@components/Button'
import { useRoute } from '@react-navigation/native'
import { AppError } from '@utils/exceptions'
import { playerAddByGroup } from '@storage/player/add-by-group'
import { playerGetByGroupAndTeam } from '@storage/player/get-by-group-and-team'
import { IPlayerStorageDTO } from '@storage/player/storage-DTO'

type RouteParams = {
  group?: string
}

type PlayersProps = ComponentProps<typeof Container>

export function Players({ ...rest }: PlayersProps) {
  const [newPlayerName, setNewPlayerName] = useState('')
  const [team, setTeam] = useState('Time A')
  const [players, setPlayers] = useState<IPlayerStorageDTO[]>([])

  const { params } = useRoute()
  const group = (params as RouteParams)?.group ?? ''

  const newPlayerNameInputRef = useRef<TextInput>(null)

  async function handleAddPlayer() {
    if (!newPlayerName.trim()) {
      return Alert.alert('Novo Jogador', 'Informe o nome do jogador')
    }

    const newPlayer = {
      name: newPlayerName,
      team,
    }

    try {
      await playerAddByGroup(newPlayer, group)

      newPlayerNameInputRef.current?.blur()

      fetchPlayersByTeam(team)
      setNewPlayerName('')
    } catch (error) {
      if (error instanceof AppError) {
        return Alert.alert('Novo Jogador', error.message)
      } else {
        return Alert.alert(
          'Novo Jogador',
          'Não foi possível criar o jogador, tente novamente mais tarde.',
        )
      }
    }
  }

  const fetchPlayersByTeam = useCallback(
    async (team: string) => {
      try {
        const playersByTeam = await playerGetByGroupAndTeam(group, team)
        setPlayers(playersByTeam)
      } catch (error) {
        if (error instanceof AppError) {
          return Alert.alert('Novo Jogador', error.message)
        } else {
          return Alert.alert(
            'Novo Jogador',
            'Não foi possível criar o jogador, tente novamente mais tarde.',
          )
        }
      }
    },
    [group],
  )

  useEffect(() => {
    fetchPlayersByTeam(team)
  }, [fetchPlayersByTeam, team])

  return (
    <Container {...rest}>
      <Header isShowBackButton />

      <Highlight title={group} subtitle="adicione a galera e separe os times" />

      <Form>
        <Input
          ref={newPlayerNameInputRef}
          placeholder="Nome da pessoa"
          autoCorrect={false}
          onChangeText={setNewPlayerName}
          value={newPlayerName}
        />

        <ButtonIcon icon="add" onPress={handleAddPlayer} />
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
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <PlayerCard name={item.name} onRemove={() => null} />
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
