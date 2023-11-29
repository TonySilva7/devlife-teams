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
import { useNavigation, useRoute } from '@react-navigation/native'
import { AppError } from '@utils/exceptions'
import { playerAddByGroup } from '@storage/player/add-by-group'
import { playerGetByGroupAndTeam } from '@storage/player/get-by-group-and-team'
import { IPlayerStorageDTO } from '@storage/player/storage-DTO'
import { playerRemoveByGroup } from '@storage/player/remove-by-group'
import { groupRemoveByName } from '@storage/group/remove-by-name'
import { Loading } from '@components/Loading'

type RouteParams = {
  group?: string
}

type PlayersProps = ComponentProps<typeof Container>

export function Players({ ...rest }: PlayersProps) {
  const [newPlayerName, setNewPlayerName] = useState('')
  const [team, setTeam] = useState('Time A')
  const [players, setPlayers] = useState<IPlayerStorageDTO[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const navigation = useNavigation()

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
        setIsLoading(true)

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
      } finally {
        setIsLoading(false)
      }
    },
    [group],
  )

  const handleRemovePlayer = async (playerName: string) => {
    try {
      await playerRemoveByGroup(playerName, group)
      fetchPlayersByTeam(team)
    } catch (error) {
      if (error instanceof AppError) {
        return Alert.alert('Deletar Jogador', error.message)
      } else {
        return Alert.alert(
          'Deletar Jogador',
          'Não foi possível deletar o jogador, tente novamente mais tarde.',
        )
      }
    }
  }

  async function groupRemove() {
    try {
      await groupRemoveByName(group)
      navigation.navigate('groups')
    } catch (error) {
      console.log(error)
      Alert.alert('Remover Grupo', 'Não foi possível remover o grupo')
    }
  }

  async function handleGroupRemove() {
    Alert.alert('Remover', 'Deseja remover a turma?', [
      { text: 'Não', style: 'cancel' },
      { text: 'Sim', onPress: () => groupRemove() },
    ])
  }

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
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
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

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={players}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <PlayerCard
              name={item.name}
              onRemove={() => handleRemovePlayer(item.name)}
            />
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
      )}

      <Button
        title="Remover Turma"
        type="SECONDARY"
        onPress={handleGroupRemove}
      />
    </Container>
  )
}
