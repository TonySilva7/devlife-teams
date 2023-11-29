import { ComponentProps, ForwardRefRenderFunction, forwardRef } from 'react'
import { useTheme } from 'styled-components/native'
import { Container } from './styles'
import { TextInput } from 'react-native'

type InputProps = ComponentProps<typeof Container>

const CustomInput: ForwardRefRenderFunction<TextInput, InputProps> = (
  { ...rest },
  ref,
) => {
  const { COLORS } = useTheme()

  return (
    <Container ref={ref} placeholderTextColor={COLORS.GRAY_300} {...rest} />
  )
}

export const Input = forwardRef<TextInput, InputProps>(CustomInput)
