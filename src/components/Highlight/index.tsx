import { ComponentProps } from 'react'
import { Container, Title, Subtitle } from './styles'

type HighlightProps = ComponentProps<typeof Container> & {
  title: string
  subtitle: string
}

export function Highlight({ title, subtitle, ...rest }: HighlightProps) {
  return (
    <Container {...rest}>
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
    </Container>
  )
}
