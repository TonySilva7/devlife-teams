import logoImg from '@assets/logo.png'
import React, { ComponentProps } from 'react'
import { BackButton, BackIcon, Container, Logo } from './styles'

type HeaderProps = ComponentProps<typeof Container> & {
  isShowBackButton?: boolean
}

export function Header({ isShowBackButton = false, ...rest }: HeaderProps) {
  return (
    <Container {...rest}>
      {isShowBackButton && (
        <BackButton>
          <BackIcon />
        </BackButton>
      )}
      <Logo source={logoImg} />
    </Container>
  )
}
