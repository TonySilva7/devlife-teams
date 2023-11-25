import { ComponentProps } from 'react'
import * as S from './styles'
import { Text } from 'react-native'

type GroupsProps = ComponentProps<typeof S.Container>

export function Groups({ ...rest }: GroupsProps) {
  return (
    <S.Container {...rest}>
      <Text>Hello Groups</Text>
    </S.Container>
  )
}
