import { ComponentProps } from 'react'
import { Container, Message } from './styles'

type ListEmptyProps = ComponentProps<typeof Container> & {
  message: string
}

export function ListEmpty({ message, ...rest }: ListEmptyProps) {
  return (
    <Container {...rest}>
      <Message>{message}</Message>
    </Container>
  )
}
