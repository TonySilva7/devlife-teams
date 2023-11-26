import { ComponentProps } from 'react'
import { Container, Subtitle, Title } from './styles'

type HighLightProps = ComponentProps<typeof Container> & {
  title: string
  subtitle: string
}

export function HighLight({ title, subtitle, ...rest }: HighLightProps) {
  return (
    <Container {...rest}>
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
    </Container>
  )
}
