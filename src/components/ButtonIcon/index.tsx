import { ComponentProps } from 'react'
import { Container, Icon, ButtonIconTypeStyleProps } from './styles'
import { MaterialIcons } from '@expo/vector-icons'

type ButtonIconProps = ComponentProps<typeof Container> & {
  icon: keyof typeof MaterialIcons.glyphMap
  type?: ButtonIconTypeStyleProps
}

export function ButtonIcon({
  icon,
  type = 'PRIMARY',
  ...rest
}: ButtonIconProps) {
  return (
    <Container {...rest}>
      <Icon name={icon} type={type} />
    </Container>
  )
}
