import { ComponentProps } from 'react'
import { Container, LoadIndicator } from './styles'

type LoadingProps = ComponentProps<typeof Container>

export function Loading({ ...rest }: LoadingProps) {
  return (
    <Container {...rest}>
      <LoadIndicator />
    </Container>
  )
}
