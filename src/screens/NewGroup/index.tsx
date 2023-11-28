import { Container, Content, Icon } from './styles'

import { Header } from '@components/Header'
import { Button } from '@components/Button'
import { Highlight } from '@components/Highlight'
import { Input } from '@components/Input'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { groupCreate } from '@storage/group/create'
import { AppError } from '@utils/exceptions'
import { Alert } from 'react-native'

export function NewGroup() {
  const [group, setGroup] = useState<string>('')
  const { navigate } = useNavigation()

  async function handleNew() {
    if (!group.trim()) {
      return Alert.alert('Novo Grupo', 'Informe o nome do grupo')
    }
    try {
      await groupCreate(group)
      navigate('players', { group })
    } catch (error) {
      if (error instanceof AppError) {
        return Alert.alert('Novo Grupo', error.message)
      } else {
        return Alert.alert(
          'Novo Grupo',
          'Não foi possível criar o grupo, tente novamente mais tarde.',
        )
      }
      console.log(error)
    }
  }
  return (
    <Container>
      <Header isShowBackButton />
      <Content>
        <Icon />
        <Highlight
          title="Nova turma"
          subtitle="crie a turma para adicionar as pessoas"
        />
        <Input
          placeholder="Nome da turma"
          onChangeText={setGroup}
          value={group}
        />
        <Button title="Criar" style={{ marginTop: 20 }} onPress={handleNew} />
      </Content>
    </Container>
  )
}
