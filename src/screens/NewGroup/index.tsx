import { Container, Content, Icon } from './styles'

import { Header } from '@components/Header'
import { Button } from '@components/Button'
import { Highlight } from '@components/Highlight'
import { Input } from '@components/Input'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { groupCreate } from '@storage/group/group-create'

export function NewGroup() {
  const [group, setGroup] = useState<string>('')
  const { navigate } = useNavigation()

  async function handleNew() {
    try {
      await groupCreate(group)
      navigate('players', { group })
    } catch (error) {
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
