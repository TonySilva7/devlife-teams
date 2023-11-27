import logoImg from '@assets/logo.png'
import React, { ComponentProps } from 'react'
import { BackButton, BackIcon, Container, Logo } from './styles'
import { useNavigation } from '@react-navigation/native'

type HeaderProps = ComponentProps<typeof Container> & {
  isShowBackButton?: boolean
}

export function Header({ isShowBackButton = false, ...rest }: HeaderProps) {
  const { navigate } = useNavigation()
  function handleGoBack() {
    navigate('groups')
  }

  return (
    <Container {...rest}>
      {isShowBackButton && (
        <BackButton onPress={handleGoBack}>
          <BackIcon />
        </BackButton>
      )}
      <Logo source={logoImg} />
    </Container>
  )
}
