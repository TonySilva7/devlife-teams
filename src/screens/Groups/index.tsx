import { Header } from '@components/Header'
import { ComponentProps } from 'react'
import * as S from './styles'
import { HighLight } from '@components/Highlight'
import { GroupCard } from '@components/GroupCard'

type GroupsProps = ComponentProps<typeof S.Container>

export function Groups({ ...rest }: GroupsProps) {
  return (
    <S.Container {...rest}>
      <Header />
      <HighLight title="Turma" subtitle="Jogue com a sua turma" />
      <GroupCard title="Turma 1" />
    </S.Container>
  )
}
